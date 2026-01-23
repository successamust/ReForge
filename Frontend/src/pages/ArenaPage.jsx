import React, { useState, useEffect, useContext, useRef, useCallback, useLayoutEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import arenaService from '../services/arena.service';
import Button from '../components/ui/Button';
import ArenaTimer from '../components/ui/ArenaTimer';
import { Processor, CodeFile, Skull, Activity, ShieldAlert, Zap, Heart } from '../components/icons/CustomIcons';
import { telemetryService } from '../services/TelemetryService';
import CyberBackground from '../components/arena/CyberBackground';
import useUndoRedo from '../hooks/useUndoRedo';

const ArenaPage = () => {
    const navigate = useNavigate();
    const { user, addNotification } = useContext(AppContext);

    const [session, setSession] = useState(null);
    const [loading, setLoading] = useState(true);
    const [editorState, setEditorState, undo, redo] = useUndoRedo({ value: '', selection: 0 });
    const code = editorState.value;
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isStarting, setIsStarting] = useState(null);
    const [output, setOutput] = useState([]);
    const [deathData, setDeathData] = useState(null);
    const [showSelection, setShowSelection] = useState(true);
    const [lockouts, setLockouts] = useState({});
    const [timeLimit, setTimeLimit] = useState(300);
    const [showTransition, setShowTransition] = useState(false);
    const [now, setNow] = useState(new Date());
    const [redirectTimer, setRedirectTimer] = useState(null);

    const terminalRef = useRef(null);
    const backdropRef = useRef(null);
    const lineNumbersRef = useRef(null);
    const sessionRef = useRef(null);
    const sessionActiveRef = useRef(false);
    const textareaRef = useRef(null);

    useLayoutEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.setSelectionRange(editorState.selection, editorState.selection);
        }
    }, [editorState]);

    const [shake, setShake] = useState(false);

    const levels = [1, 2, 3, 4, 5];

    const COMBAT_MESSAGES = [
        "LOGIC SYNC OPTIMAL.",
        "TARGET ARCHITECTURE BREACHED.",
        "ALGORITHMIC DOMINANCE SECURED.",
        "SYNTAX EFFICIENCY AT 99%.",
        "VOID ADAPTATION SUCCESSFUL."
    ];

    const formatRemaining = (until) => {
        if (!until) return null;
        const diff = until - now;
        if (diff <= 0) return null;

        const mins = Math.floor(diff / 60000);
        const secs = Math.floor((diff % 60000) / 1000);
        return `${mins}:${secs.toString().padStart(2, '0')} `;
    };

    const triggerArenaTimeout = useCallback(async () => {
        if (deathData || isSubmitting || !session || !sessionActiveRef.current) return;

        sessionActiveRef.current = false; // Mark dead immediately
        setIsSubmitting(true);
        setOutput(prev => [...prev, { type: 'error', text: 'TIMEOUT DETECTED. TRANSMITTING FAILURE...' }]);

        try {
            const response = await arenaService.failSession(session.sessionId, 'timeout');
            const lang = session.language; // Capture before nullifying
            setDeathData(response.data);
            setSession(null);

            // Sync lockouts immediately for visual feedback
            if (lang && response.data.lockoutUntil) {
                setLockouts(prev => ({
                    ...prev,
                    [lang]: {
                        lockoutUntil: new Date(response.data.lockoutUntil)
                    }
                }));
            }

            const timeoutOutput = [
                { type: 'error', text: '!! CRITICAL FAILURE !!' },
                { type: 'error', text: '✗ SYSTEM TIMEOUT: NEURAL LINK COLLAPSED.' },
                { type: 'error', text: response.data.result?.error || 'Validation expired.' }
            ];
            setOutput(prev => [...prev, ...timeoutOutput]);
        } catch (err) {
            addNotification({
                type: 'error',
                message: err.response?.data?.error?.message || err.response?.data?.message || 'Failed to process timeout'
            });
        } finally {
            setIsSubmitting(false);
            // Start automatic redirect after 5 seconds
            setRedirectTimer(5);
        }
    }, [deathData, isSubmitting, session, addNotification]);

    const loadLockouts = useCallback(async () => {
        try {
            const response = await arenaService.getLockouts();
            // Store as date objects for easier comparison
            const data = response.data || {};
            Object.keys(data).forEach(lang => {
                if (data[lang].lockoutUntil) {
                    data[lang].lockoutUntil = new Date(data[lang].lockoutUntil);
                }
            });
            setLockouts(data);
        } catch (err) {
            console.error('Failed to load lockouts', err);
        } finally {
            setLoading(false);
        }
    }, []);

    const handleReturnToSelection = useCallback(() => {
        setDeathData(null);
        setShowSelection(true);
        setSession(null);
        setRedirectTimer(null);
        loadLockouts(); // Refresh lockouts to show new cooldown
    }, [loadLockouts]);

    // Separate effect for the session cleanup (only on unmount)
    useEffect(() => {
        return () => {
            if (sessionActiveRef.current && sessionRef.current) {
                const sid = sessionRef.current;
                sessionActiveRef.current = false;
                arenaService.failSession(sid, 'abandoned').catch(console.error);
            }
        };
    }, []);

    useEffect(() => {
        loadLockouts();

        const ticker = setInterval(() => {
            setNow(new Date());
            // Real-time countdown for active session
            if (sessionActiveRef.current && session && !deathData) {
                setTimeLimit(prev => {
                    if (prev <= 0) {
                        triggerArenaTimeout();
                        return 0;
                    }
                    return prev - 1;
                });
            }
            if (!sessionActiveRef.current && redirectTimer !== null && redirectTimer > 0) {
                setRedirectTimer(prev => {
                    if (prev <= 1) {
                        handleReturnToSelection();
                        return null;
                    }
                    return prev - 1;
                });
            }
        }, 1000);

        return () => {
            clearInterval(ticker);
        };
    }, [triggerArenaTimeout, handleReturnToSelection]);

    useEffect(() => {
        if (session?.sessionId) {
            telemetryService.startSession();
        } else {
            telemetryService.stopSession();
        }
    }, [session?.sessionId]);

    // Also check session on mount in case they are re-entering, but force selection first
    // Unless we want to allow resumption? The user said "restart back to begining anytime i leave"
    // So if they leave, the session is dead.

    useEffect(() => {
        sessionRef.current = session?.sessionId;
    }, [session]);

    useEffect(() => {
        if (terminalRef.current) {
            terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
        }
    }, [output]);


    const handleScroll = (e) => {
        const { scrollTop, scrollLeft } = e.target;
        if (backdropRef.current) {
            backdropRef.current.scrollTop = scrollTop;
            backdropRef.current.scrollLeft = scrollLeft;
        }
        if (lineNumbersRef.current) {
            lineNumbersRef.current.scrollTop = scrollTop;
        }
    };

    const handleKeyDown = (e) => {
        const { key, target, metaKey, ctrlKey } = e;
        if ((metaKey || ctrlKey) && !e.shiftKey && key === 'z') {
            e.preventDefault();
            undo();
            return;
        }

        if ((metaKey || ctrlKey) && e.shiftKey && key === 'z') {
            e.preventDefault();
            redo();
            return;
        }

        const { selectionStart, selectionEnd, value } = target;

        if (key === '/' && (metaKey || ctrlKey)) {
            e.preventDefault();
            const lang = session?.language || 'javascript';
            const prefix = lang === 'python' ? '#' : '//';

            // Get all lines that are at least partially selected
            const startPos = Math.min(selectionStart, selectionEnd);
            const endPos = Math.max(selectionStart, selectionEnd);

            const before = value.substring(0, startPos);
            const after = value.substring(endPos);

            const selectionBefore = before.lastIndexOf('\n') + 1;
            let selectionAfter = value.indexOf('\n', endPos);
            if (selectionAfter === -1) selectionAfter = value.length;

            const selectedText = value.substring(selectionBefore, selectionAfter);
            const lines = selectedText.split('\n');
            const escapedPrefix = prefix.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
            const prefixRegex = new RegExp(`^(\\s*)${escapedPrefix}\\s?`);

            // Determine if we should comment or uncomment
            // If any line is NOT a comment, we comment all lines
            const allComments = lines.every(line => !line.trim() || line.trim().startsWith(prefix));
            const shouldUncomment = allComments;

            const transformedLines = lines.map(line => {
                if (!line.trim()) return line; // Skip empty lines but keep them
                if (shouldUncomment) {
                    return line.replace(prefixRegex, '$1');
                } else {
                    return prefix + ' ' + line;
                }
            });

            const newText = transformedLines.join('\n');
            const newValue = value.substring(0, selectionBefore) + newText + after;

            const diff = newText.length - selectedText.length;
            setEditorState({ value: newValue, selection: endPos + diff });
            return;
        }

        if (key === 'Tab') {
            e.preventDefault();
            const newValue = value.substring(0, selectionStart) + '  ' + value.substring(selectionEnd);
            setEditorState({ value: newValue, selection: selectionStart + 2 });
        }

        if (key === 'Enter') {
            e.preventDefault();
            const linesBefore = value.substring(0, selectionStart).split('\n');
            const currentLine = linesBefore[linesBefore.length - 1];
            const indent = currentLine.match(/^\s*/)?.[0] || '';
            const charBefore = value.charAt(selectionStart - 1);
            const charAfter = value.charAt(selectionStart);

            // Smart Enter between brackets: {|} -> Enter -> {\n  |\n}
            if ((charBefore === '{' && charAfter === '}') ||
                (charBefore === '[' && charAfter === ']') ||
                (charBefore === '(' && charAfter === ')')) {
                const extraIndent = '  ';
                const insertion = '\n' + indent + extraIndent + '\n' + indent;
                const newValue = value.substring(0, selectionStart) + insertion + value.substring(selectionEnd);
                const cursorPosition = selectionStart + 1 + indent.length + extraIndent.length;
                setEditorState({ value: newValue, selection: cursorPosition });
                return;
            }

            // Normal Enter with auto-indent
            let extraIndent = '';
            // If the previous line actually ends with an opener (ignoring whitespace), increase indent
            // We use trimRight() to ignore trailing spaces
            const trimmedLine = currentLine.trimEnd();
            if (trimmedLine.endsWith('{') || trimmedLine.endsWith('(') || trimmedLine.endsWith('[')) {
                extraIndent = '  ';
            }

            const insertion = '\n' + indent + extraIndent;
            const newValue = value.substring(0, selectionStart) + insertion + value.substring(selectionEnd);
            setEditorState({ value: newValue, selection: selectionStart + insertion.length });
        }

        if (key === '}') {
            const linesBefore = value.substring(0, selectionStart).split('\n');
            const currentLineBeforeCursor = linesBefore[linesBefore.length - 1];

            // Only smart dedent if we are currently just indentation (whitespace)
            if (/^\s*$/.test(currentLineBeforeCursor)) {
                // Find matching opener to steal its indentation
                let stack = 0;
                let openerIndent = null;

                // backwards scan lines
                for (let i = linesBefore.length - 2; i >= 0; i--) {
                    const line = linesBefore[i];
                    // Naive brace counting - good enough for simple indentation syncing
                    const openCount = (line.match(/\{/g) || []).length;
                    const closeCount = (line.match(/\}/g) || []).length;

                    stack += (closeCount - openCount);

                    if (stack < 0) {
                        // Found our logical opener
                        openerIndent = line.match(/^\s*/)?.[0] || '';
                        break;
                    }
                }

                if (openerIndent !== null) {
                    e.preventDefault();
                    // Replace current line's indentation with opener's indentation + the brace
                    // We need to find where the current line started
                    const lineStartIndex = value.lastIndexOf('\n', selectionStart - 1) + 1;
                    const newValue = value.substring(0, lineStartIndex) + openerIndent + '}' + value.substring(selectionEnd);
                    const newCursorPos = lineStartIndex + openerIndent.length + 1;
                    setEditorState({ value: newValue, selection: newCursorPos });
                }
            }
        }

        const pairs = { '(': ')', '[': ']', '{': '}', '"': '"', "'": "'", '`': '`' };
        if (pairs[key]) {
            if (selectionStart !== selectionEnd) {
                e.preventDefault();
                const selectedText = value.substring(selectionStart, selectionEnd);
                const newValue = value.substring(0, selectionStart) + key + selectedText + pairs[key] + value.substring(selectionEnd);
                setEditorState({ value: newValue, selection: selectionEnd + 1 });
                // Restore selection range to cover the wrapped text
                setTimeout(() => {
                    target.setSelectionRange(selectionStart + 1, selectionEnd + 1);
                }, 0);
            } else {
                const charAfter = value.charAt(selectionStart);
                if (!charAfter || /\s|\)|\}|\]|;/.test(charAfter)) {
                    e.preventDefault();
                    const newValue = value.substring(0, selectionStart) + key + pairs[key] + value.substring(selectionEnd);
                    setEditorState({ value: newValue, selection: selectionStart + 1 });
                }
            }
        }
    };


    const handleStartArena = async (language) => {
        try {
            setIsStarting(language);
            const response = await arenaService.startSession(language);
            setSession(response.data);
            sessionActiveRef.current = true; // Mark as active
            setTimeLimit(response.data.timeLimit);
            setEditorState({ value: response.data.lesson?.exercise?.starterCode || '', selection: 0 });
            setShowSelection(false);
            setDeathData(null);
            setShowTransition(true);
            setTimeout(() => setShowTransition(false), 2000);
            setOutput([{ type: 'info', text: 'PROTOCOL INITIATED. NEURAL LINK ESTABLISHED.' }]);
        } catch (err) {
            addNotification({
                type: 'error',
                message: err.response?.data?.error?.message || err.response?.data?.message || 'Failed to start Arena'
            });
            // Refresh lockouts as a failure here usually means they just got timed out or checked eligibility
            loadLockouts();
        } finally {
            setIsStarting(null);
        }
    };

    const handleSubmit = async () => {
        if (isSubmitting || deathData || sessionActiveRef.current === false) return;

        setIsSubmitting(true);
        setOutput(prev => [...prev, { type: 'info', text: 'VERIFYING LOGIC...' }]);

        let data = null;
        try {
            const response = await arenaService.submitCode(session.sessionId, code);
            data = response.data;

            if (data.passed) {
                if (data.completed) {
                    sessionActiveRef.current = false; // Mark as inactive/complete
                    addNotification({ type: 'success', message: 'ARENA CLEAR. IMMORTAL STATUS ACHIEVED.' });
                    navigate('/dashboard');
                } else {
                    const message = COMBAT_MESSAGES[Math.floor(Math.random() * COMBAT_MESSAGES.length)];
                    setSession(prev => ({
                        ...prev,
                        level: data.nextLevel,
                        part: data.nextPart,
                        lesson: data.nextLesson
                    }));
                    setTimeLimit(data.nextTimeLimit);
                    setEditorState({ value: data.nextLesson?.exercise?.starterCode || '', selection: 0 });
                    setOutput(prev => [...prev, { type: 'success', text: `>> NODE ${data.level}.${data.part} BREACHED.${message} ` }]);

                    // Trigger Transition Flash
                    setShowTransition(true);
                    setTimeout(() => setShowTransition(false), 1500);

                    addNotification({ type: 'success', message: `NODE ${data.level} BREACHED.` });
                }
            }
            else {
                // FAILURE
                const lang = session.language;

                if (!data.death) {
                    // LOST A LIFE BUT SURVIVED
                    setSession(prev => ({
                        ...prev,
                        livesRemaining: data.livesRemaining
                    }));
                    setShake(true);
                    setTimeout(() => setShake(false), 500);

                    const lifeOutput = [
                        { type: 'error', text: '!! LOGIC FAILURE DETECTED !!' },
                        { type: 'error', text: `WARNING: NEURAL INTEGRITY COMPROMISED.LIVES REMAINING: ${data.livesRemaining} ` }
                    ];

                    if (data.result?.details) {
                        data.result.details.forEach((test, i) => {
                            if (!test.passed) {
                                lifeOutput.push({ type: 'error', text: `[Test ${i + 1}]FAILED: ${test.stderr || 'Incorrect output'} ` });
                            }
                        });
                    }

                    setOutput(prev => [...prev, ...lifeOutput]);
                    addNotification({ type: 'warning', message: 'LIFE LOST. RECALIBRATE IMMINENT.' });
                } else {
                    // DEATH
                    sessionActiveRef.current = false; // Mark dead
                    setDeathData(data);
                    setSession(null); // Clear session to show death screen overlay
                    setShake(true);
                    setTimeout(() => setShake(false), 500);

                    const deathOutput = [
                        { type: 'error', text: '!! CRITICAL FAILURE !!' },
                        { type: 'error', text: '✗ NEURAL LINK COLLAPSED.' },
                        { type: 'error', text: data.result?.error || 'Logic violation detected. Forcible disconnection imminent.' }
                    ];

                    if (data.result?.details) {
                        data.result.details.forEach((test, i) => {
                            if (!test.passed) {
                                deathOutput.push({ type: 'error', text: `[Test ${i + 1}]FAILED: ${test.stderr || 'Incorrect output'} ` });
                            }
                        });
                    }

                    setOutput(prev => [...prev, ...deathOutput]);

                    // Sync lockouts immediately for visual feedback
                    if (lang && data.lockoutUntil) {
                        setLockouts(prev => ({
                            ...prev,
                            [lang]: {
                                lockoutUntil: new Date(data.lockoutUntil)
                            }
                        }));
                    }
                }
            }
        } catch (err) {
            addNotification({
                type: 'error',
                message: err.response?.data?.error?.message || err.response?.data?.message || 'Transmission failure'
            });
        } finally {
            setIsSubmitting(false);
            if (data && !data.passed && data.death) {
                setRedirectTimer(8); // Longer timer if they died from wrong code (to read terminal)
            }
        }
    };

    const LivesDisplay = ({ lives }) => (
        <div className="flex gap-1">
            {[...Array(3)].map((_, i) => (
                <Heart
                    key={i}
                    size={16}
                    className={`${i < lives ? 'text-red-500' : 'text-gray-800'} `}
                    fill={i < lives ? "currentColor" : "none"}
                />
            ))}
        </div>
    );

    if (loading) {
        return (
            <div className="h-screen bg-black flex items-center justify-center">
                <div className="w-12 h-12 border-2 border-red-600 border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    if (showSelection) {
        return (
            <div className="min-h-screen bg-black pt-32 px-6 flex flex-col items-center">
                <motion.div
                    initial={{ opacity: 0, scale: 0.9 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="max-w-2xl text-center"
                >
                    <h1 className="text-6xl font-black text-red-600 mb-6 tracking-tighter">THE ARENA</h1>
                    <p className="text-white/60 mb-12 text-lg">
                        Sudden Death Mode. Complete 10 algorithmic challenges across 5 difficulty levels.
                        Three mistakes results in death, point loss, and a temporary system burnout.
                    </p>

                    <div className="grid grid-cols-2 md:grid-cols-3 gap-4">
                        {['javascript', 'python', 'go', 'java', 'csharp'].map(lang => {
                            const lockout = lockouts[lang];
                            const timeStr = formatRemaining(lockout?.lockoutUntil);
                            const isLocked = !!timeStr;
                            const isThisStarting = isStarting === lang;

                            return (
                                <button
                                    key={lang}
                                    disabled={!!isStarting}
                                    onClick={() => {
                                        const progress = user?.progress?.find(p => p.language === lang);
                                        const lastPassed = progress?.lastPassedDay || 0;

                                        if (lastPassed < 1) {
                                            addNotification({
                                                type: 'error',
                                                message: `SYSTEM LOCK: ${lang.toUpperCase()} mastery Lvl 1 required to enter the Arena.`
                                            });
                                            return;
                                        }

                                        if (isLocked) {
                                            addNotification({
                                                type: 'error',
                                                message: `SYSTEM BURNOUT: ${lang.toUpperCase()} protocol unavailable for ${timeStr} minutes.`
                                            });
                                            return;
                                        }
                                        handleStartArena(lang);
                                    }}
                                    className={`group p-6 border transition-all text-left relative overflow-hidden backdrop-blur-sm ${isLocked
                                        ? 'border-red-900/30 bg-red-950/20 cursor-not-allowed'
                                        : isThisStarting
                                            ? 'border-red-600 bg-red-600/10'
                                            : (user?.progress?.find(p => p.language === lang)?.lastPassedDay || 0) < 1
                                                ? 'border-white/5 bg-white/[0.01] opacity-40 grayscale'
                                                : 'border-white/10 bg-white/[0.02] hover:bg-red-600/10 hover:border-red-600/50'
                                        }`}
                                >
                                    {isLocked && (
                                        <div className="absolute inset-0 bg-red-950/40 backdrop-blur-[2px] z-10" />
                                    )}
                                    {isThisStarting && (
                                        <div className="absolute inset-0 bg-red-600/20 backdrop-blur-sm flex items-center justify-center z-20">
                                            <div className="w-6 h-6 border-2 border-white border-t-transparent rounded-full animate-spin" />
                                        </div>
                                    )}
                                    {isLocked && (
                                        <div className="absolute top-2 right-2">
                                            <Skull size={14} className="text-red-900" />
                                        </div>
                                    )}
                                    <div className={`font-black uppercase tracking-widest text-xs mb-2 ${isLocked ? 'text-red-900' : 'text-white group-hover:text-red-500'
                                        }`}>
                                        {lang}
                                    </div>
                                    <div className="text-white/40 text-[10px] uppercase">
                                        {isLocked ? `Locked: ${timeStr}` : (user?.progress?.find(p => p.language === lang)?.lastPassedDay || 0) < 1 ? 'Mastery Required' : 'Select Protocol'}
                                    </div>
                                </button>
                            );
                        })}
                    </div>
                </motion.div>
            </div>
        );
    }

    const getThreatIntensity = () => {
        if (!session || deathData || !session.timeLimit || typeof timeLimit !== 'number') return 0;
        const total = session.timeLimit || 300;
        const remaining = timeLimit;
        // Intensity increases as time decreases, 0 to 1
        const intensity = Math.max(0, 1 - (remaining / total));
        return isNaN(intensity) ? 0 : intensity;
    };

    const getThreatLevelClass = () => {
        if (!session || deathData) return '';
        const intensity = getThreatIntensity();
        if (intensity > 0.9) return 'threat-pulse-danger';
        if (intensity > 0.8) return 'threat-pulse-warning';
        return 'threat-pulse-safe';
    };

    return (
        <div className={`h-screen bg-[#050505] flex flex-col pt-16 overflow-hidden relative ${shake ? 'glitch-shake' : ''}`}>
            <CyberBackground intensity={getThreatIntensity()} />

            {/* Arena Header: Redesigned as HUD */}
            {session && (
                <>
                    <div className="relative z-10 bg-black/60 border-b border-red-600/30 px-6 py-4 flex items-center justify-between backdrop-blur-md">
                        <div className="flex items-center gap-10">
                            <div>
                                <div className="text-[10px] font-black text-red-600 uppercase tracking-[0.3em] mb-1 flex items-center gap-2">
                                    <Zap size={10} className="animate-pulse" /> Sudden Death Protocol
                                </div>
                                <h2 className="text-white font-black text-xl tracking-tighter italic">
                                    NODE {session.level}<span className="text-red-600">.</span>{session.part || 1}
                                </h2>
                            </div>

                            {/* Node Tracker HUD */}
                            <div className="hidden lg:flex items-center gap-3 px-6 py-3 bg-red-600/5 border border-red-600/20 rounded-sm">
                                {levels.map(l => (
                                    <div key={l} className="flex items-center">
                                        <div className={`w-3 h-3 rotate-45 border transition-all duration-500 ${session.level === l ? 'bg-red-600 border-red-400 shadow-[0_0_15px_rgba(220,38,38,0.8)] scale-125' :
                                            session.level > l ? 'bg-white/40 border-white/20' : 'bg-transparent border-white/10'
                                            }`} />
                                        {l < 5 && <div className={`w-6 h-[1px] ${session.level > l ? 'bg-white/20' : 'bg-white/5'}`} />}
                                    </div>
                                ))}
                                <div className="ml-4 text-[10px] font-bold text-white/40 uppercase tracking-widest">Mastery Path</div>
                            </div>
                        </div>

                        <div className="flex items-center gap-8">
                            <div className="flex flex-col items-end border-r border-white/10 pr-6 mr-2">
                                <div className="text-[9px] font-black text-white/30 uppercase tracking-widest mb-1">Neural Integrity</div>
                                <LivesDisplay lives={session.livesRemaining ?? 3} />
                            </div>

                            <div className="flex flex-col items-end mr-4">
                                <div className="text-[9px] font-black text-white/30 uppercase tracking-widest mb-1">Time to Terminal</div>
                                <ArenaTimer
                                    timeLeft={timeLimit}
                                    initialTime={session.timeLimit || 300}
                                />
                            </div>

                            <button
                                onClick={handleSubmit}
                                disabled={isSubmitting || !!deathData}
                                className={`px-10 py-3 bg-red-600 hover:bg-red-500 text-white font-black tracking-[0.2em] uppercase text-xs transition-all transform active:scale-95 disabled:opacity-50 disabled:grayscale ${isSubmitting ? 'animate-pulse' : ''}`}
                            >
                                {isSubmitting ? 'UPLOADING...' : 'EXECUTE'}
                            </button>
                        </div>
                    </div>

                    <div className="flex-1 flex min-h-0 relative z-10">
                        {/* Left Side: Objective HUD */}
                        <div className="w-1/3 border-r border-red-600/10 p-8 overflow-y-auto custom-scrollbar bg-black/20">
                            <div className="flex items-center gap-2 mb-8 opacity-40">
                                <ShieldAlert size={14} className="text-red-500" />
                                <div className="text-[10px] font-black text-white uppercase tracking-[0.3em]">Operational Intel</div>
                            </div>

                            <h3 className="text-lg font-bold text-white mb-4 leading-tight italic">
                                {session.lesson?.title}
                            </h3>

                            <p className="text-white/60 leading-relaxed font-light mb-10 text-sm border-l-2 border-red-600/30 pl-4 py-1">
                                {session.lesson?.exercise?.description}
                            </p>

                            <div className="space-y-4">
                                <div className="text-[10px] font-black text-white/20 uppercase tracking-[0.2em] mb-4">Input Validations</div>
                                {session.lesson?.tests?.filter(t => !t.isHidden).map((test, i) => (
                                    <div key={i} className="p-4 bg-red-600/[0.03] border border-red-600/10 group hover:bg-red-600/[0.06] transition-colors">
                                        <p className="text-white/40 text-xs font-mono group-hover:text-white/60">{test.description}</p>
                                    </div>
                                ))}
                            </div>
                        </div>

                        {/* Right Side: IDE HUD */}
                        <div className="flex-1 flex flex-col min-h-0">
                            <div className={`flex-1 relative overflow-hidden flex transition-all duration-500 ${getThreatLevelClass()}`}>
                                {/* Line Numbers */}
                                <div
                                    ref={lineNumbersRef}
                                    className="w-14 bg-black/60 border-r border-red-600/20 py-6 text-right pr-4 font-mono text-[14px] text-white/10 select-none overflow-hidden"
                                >
                                    {code.split('\n').map((_, i) => (
                                        <div key={i} style={{ height: '24px', lineHeight: '24px' }}>
                                            {(i + 1).toString().padStart(2, '0')}
                                        </div>
                                    ))}
                                </div>

                                <div className="relative flex-1 overflow-hidden">
                                    {/* Backdrop for highlighting */}
                                    <div
                                        ref={backdropRef}
                                        className="editor-layer editor-backdrop pointer-events-none select-none"
                                        aria-hidden="true"
                                    >
                                        <SyntaxHighlighter
                                            language={session?.language || 'javascript'}
                                            style={vscDarkPlus}
                                            customStyle={{
                                                margin: 0,
                                                padding: 0,
                                                background: 'transparent',
                                                fontSize: 'inherit',
                                                lineHeight: 'inherit',
                                                minHeight: '100%',
                                                minWidth: '100%',
                                                overflow: 'visible'
                                            }}
                                            codeTagProps={{
                                                style: {
                                                    fontFamily: 'inherit',
                                                    fontSize: 'inherit',
                                                    lineHeight: 'inherit',
                                                    display: 'block',
                                                    padding: 0
                                                }
                                            }}
                                            wrapLines={true}
                                            wrapLongLines={false}
                                            lineProps={{
                                                style: {
                                                    display: 'block',
                                                    height: '24px',
                                                    lineHeight: '24px'
                                                }
                                            }}
                                        >
                                            {code || ' '}
                                        </SyntaxHighlighter>
                                    </div>

                                    {/* Hidden Textarea for Input */}
                                    <textarea
                                        ref={textareaRef}
                                        value={code}
                                        onChange={(e) => setEditorState({ value: e.target.value, selection: e.target.selectionEnd })}
                                        onKeyDown={handleKeyDown}
                                        onScroll={handleScroll}
                                        wrap="off"
                                        onPaste={(e) => {
                                            e.preventDefault();
                                            addNotification({
                                                type: 'error',
                                                message: 'PASTE ACTION BLOCKED: MANUAL OVERRIDE REQUIRED.'
                                            });
                                            setShake(true);
                                            setTimeout(() => setShake(false), 300);
                                        }}
                                        className="editor-layer editor-textarea relative z-10"
                                        placeholder="// RECONSTRUCT LOGIC..."
                                        spellCheck={false}
                                        disabled={!!deathData}
                                    />
                                </div>
                            </div>

                            {/* Terminal Output HUD */}
                            <div
                                ref={terminalRef}
                                className="h-56 bg-[#0a0000] border-t border-red-600/30 p-6 font-mono text-xs overflow-y-auto relative"
                            >
                                <div className="absolute top-0 left-0 w-full h-full pointer-events-none scanline-text opacity-5" />
                                <div className="flex items-center gap-2 mb-4 opacity-30">
                                    <Activity size={12} className="text-red-500" />
                                    <span className="uppercase tracking-[0.2em] font-black text-[10px]">Neural Stream</span>
                                </div>

                                {output.map((line, i) => (
                                    <div key={i} className="mb-2 flex items-start gap-3">
                                        <span className="text-white/10 flex-shrink-0">[{new Date().toLocaleTimeString([], { hour12: false })}]</span>
                                        <p className={`cyber - terminal - text ${line.type === 'error' ? 'text-red-500 font-bold' :
                                            line.type === 'success' ? 'text-green-400' : 'text-white/40'
                                            } `}>
                                            {line.text}
                                        </p>
                                    </div>
                                ))}
                            </div>
                        </div>
                    </div>
                </>
            )}

            {/* Death / Failure Overlay: HUD Overhaul */}
            <AnimatePresence>
                {deathData && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        className="fixed inset-0 z-[100] bg-red-950/95 flex flex-col items-center justify-center p-6 text-center backdrop-blur-xl"
                    >
                        <div className="absolute inset-0 crt-overlay opacity-40 pointer-events-none" />

                        <motion.div
                            initial={{ scale: 0.5, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            className="mb-12 relative"
                        >
                            <Skull size={100} className="text-red-600 animate-pulse" />
                            <div className="absolute -inset-10 border border-red-600/20 rounded-full animate-ping" />
                        </motion.div>

                        <h1 className="text-8xl font-black text-white mb-6 tracking-tighter italic">
                            NEURAL <span className="text-red-600">COLLAPSE</span>
                        </h1>

                        <div className="max-w-md bg-black/40 border border-red-600/30 p-8 mb-12 relative overflow-hidden">
                            <div className="absolute top-0 left-0 w-full h-1 bg-red-600 animate-pulse" />
                            <p className="text-white font-black uppercase tracking-[0.2em] text-sm mb-4">Termination Report</p>
                            <div className="space-y-2 text-xs text-white/60 uppercase tracking-widest leading-relaxed">
                                <div className="flex justify-between">
                                    <span>Status:</span>
                                    <span className="text-red-500 font-bold italic">DECEASED</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Penalty:</span>
                                    <span className="text-red-400">-{Math.abs(deathData.pointDeduction || 100)} Points</span>
                                </div>
                                <div className="flex justify-between">
                                    <span>Burnout:</span>
                                    <span className="text-red-400">15 Minutes</span>
                                </div>
                            </div>
                        </div>

                        <div className="flex gap-4">
                            <button
                                onClick={handleReturnToSelection}
                                className="group relative px-8 py-4 bg-white hover:bg-red-600 transition-colors duration-500"
                            >
                                <span className="relative z-10 text-black group-hover:text-white font-black tracking-[0.2em] uppercase text-xs">Return to Systems {redirectTimer !== null && `(${redirectTimer})`}</span>
                            </button>
                            <button
                                onClick={() => navigate('/dashboard')}
                                className="group relative px-8 py-4 border border-white/20 hover:border-white transition-colors duration-500"
                            >
                                <span className="relative z-10 text-white font-black tracking-[0.2em] uppercase text-xs">Exit to Dashboard</span>
                            </button>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Neural Scan Transition */}
            <AnimatePresence>
                {showTransition && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[150] flex items-center justify-center pointer-events-none"
                    >
                        <div className="absolute inset-0 bg-red-600/20 backdrop-blur-md" />
                        <motion.div
                            initial={{ width: "0%", opacity: 0 }}
                            animate={{ width: "100%", opacity: 1 }}
                            transition={{ duration: 0.5, ease: "easeInOut" }}
                            className="absolute h-1 bg-white shadow-[0_0_20px_#fff] z-20"
                            style={{ top: "50%" }}
                        />
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0, letterSpacing: "2em" }}
                            animate={{ scale: 1, opacity: 1, letterSpacing: "0.5em" }}
                            exit={{ scale: 1.2, opacity: 0 }}
                            className="text-white text-4xl font-black italic tracking-tighter z-30 flex flex-col items-center"
                        >
                            <span className="text-red-500 text-sm mb-2 tracking-[1em] font-mono">NEURAL SCAN COMPLETE</span>
                            NODE <span className="text-red-600">BREACHED</span>
                            <div className="mt-4 flex gap-2">
                                {[...Array(3)].map((_, i) => (
                                    <motion.div
                                        key={i}
                                        animate={{ opacity: [0, 1, 0] }}
                                        transition={{ repeat: Infinity, duration: 0.5, delay: i * 0.1 }}
                                        className="w-2 h-2 bg-red-500 rotate-45"
                                    />
                                ))}
                            </div>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default ArenaPage;
