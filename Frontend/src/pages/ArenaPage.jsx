import React, { useState, useEffect, useContext, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import arenaService from '../services/arena.service';
import Button from '../components/ui/Button';
import ArenaTimer from '../components/ui/ArenaTimer';
import { Processor, CodeFile, Skull, Activity, ShieldAlert, Zap } from '../components/icons/CustomIcons';
import { telemetryService } from '../services/TelemetryService';
import CyberBackground from '../components/arena/CyberBackground';

const ArenaPage = () => {
    const navigate = useNavigate();
    const { user, addNotification } = useContext(AppContext);

    const [session, setSession] = useState(null);
    const [loading, setLoading] = useState(true);
    const [code, setCode] = useState('');
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [isStarting, setIsStarting] = useState(null);
    const [output, setOutput] = useState([]);
    const [deathData, setDeathData] = useState(null);
    const [showSelection, setShowSelection] = useState(true);
    const [lockouts, setLockouts] = useState({});
    const [timeLimit, setTimeLimit] = useState(300);
    const [showTransition, setShowTransition] = useState(false);
    const [now, setNow] = useState(new Date());

    const terminalRef = useRef(null);
    const backdropRef = useRef(null);
    const lineNumbersRef = useRef(null);
    const sessionRef = useRef(null);
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
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    const triggerArenaTimeout = useCallback(async () => {
        if (deathData || isSubmitting || !session) return;

        setIsSubmitting(true);
        setOutput(prev => [...prev, { type: 'error', text: 'TIMEOUT DETECTED. TRANSMITTING FAILURE...' }]);

        try {
            const response = await arenaService.failSession(session.sessionId, 'timeout');
            setDeathData(response.data);
            setSession(null); // Clear session to prevent abandonment cleanup

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
        }
    }, [deathData, isSubmitting, session, addNotification]);

    useEffect(() => {
        loadLockouts();
        telemetryService.startSession();

        const ticker = setInterval(() => {
            setNow(new Date());
            // Real-time countdown for active session
            if (session && !deathData) {
                setTimeLimit(prev => {
                    if (prev <= 0) {
                        triggerArenaTimeout();
                        return 0;
                    }
                    return prev - 1;
                });
            }
        }, 1000);

        // Cleanup: Forfeit active session if navigating away
        return () => {
            clearInterval(ticker);
            if (sessionRef.current) {
                arenaService.failSession(sessionRef.current, 'abandoned').catch(console.error);
            }
        };
    }, [session, deathData, triggerArenaTimeout]); // Added session/deathData to dependencies so triggerArenaTimeout can be called correctly

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

    const highlightCode = (code) => {
        if (!code) return '';
        let escaped = code.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;");
        const keywords = ['function', 'const', 'let', 'var', 'return', 'if', 'else', 'for', 'while', 'import', 'export', 'await', 'async', 'try', 'catch', 'new', 'class', 'extends', 'super', 'switch', 'case', 'break', 'default', 'true', 'false', 'null'];
        const regex = new RegExp(`(\\/\\/.*$|\\/\\*[\\s\\S]*?\\*\\/)|(".*?"|'.*?'|\`.*?\`)|\\b(${keywords.join('|')})\\b|(\\b\\d+\\b)`, 'gm');
        return escaped.replace(regex, (match, p1, p2, p3, p4) => {
            if (p1) return `<span style="color: rgba(255,255,255,0.3); font-style: italic;">${p1}</span>`;
            if (p2) return `<span style="color: #4ade80;">${p2}</span>`;
            if (p3) return `<span style="color: #A855F7; font-weight: bold;">${p3}</span>`;
            if (p4) return `<span style="color: #60a5fa;">${p4}</span>`;
            return match;
        });
    };

    const handleScroll = (e) => {
        if (backdropRef.current) {
            backdropRef.current.scrollTop = e.target.scrollTop;
            backdropRef.current.scrollLeft = e.target.scrollLeft;
        }
        if (lineNumbersRef.current) {
            lineNumbersRef.current.scrollTop = e.target.scrollTop;
        }
    };

    const handleKeyDown = (e) => {
        const { key, target, metaKey, ctrlKey } = e;
        const { selectionStart, selectionEnd, value } = target;

        if (key === '/' && (metaKey || ctrlKey)) {
            e.preventDefault();
            const before = value.substring(0, selectionStart);
            const after = value.substring(selectionStart);
            const lineStart = before.lastIndexOf('\n') + 1;
            const lineEndRaw = after.indexOf('\n');
            const lineEnd = lineEndRaw === -1 ? value.length : selectionStart + lineEndRaw;
            const line = value.substring(lineStart, lineEnd);
            let newLine, offset;
            if (line.trim().startsWith('//')) {
                newLine = line.replace(/(\s*)\/\/\s?/, '$1');
                offset = newLine.length - line.length;
            } else {
                newLine = '// ' + line;
                offset = 3;
            }
            const newValue = value.substring(0, lineStart) + newLine + value.substring(lineEnd);
            setCode(newValue);
            setTimeout(() => { target.setSelectionRange(selectionStart + offset, selectionEnd + offset); }, 0);
            return;
        }

        if (key === 'Tab') {
            e.preventDefault();
            const newValue = value.substring(0, selectionStart) + '  ' + value.substring(selectionEnd);
            setCode(newValue);
            setTimeout(() => { target.setSelectionRange(selectionStart + 2, selectionStart + 2); }, 0);
        }

        if (key === 'Enter') {
            e.preventDefault();
            const linesBefore = value.substring(0, selectionStart).split('\n');
            const currentLine = linesBefore[linesBefore.length - 1];
            const indent = currentLine.match(/^\s*/)?.[0] || '';
            let extraIndent = '';
            if (currentLine.trim().endsWith('{') || currentLine.trim().endsWith('(') || currentLine.trim().endsWith('[')) {
                extraIndent = '  ';
            }
            const insertion = '\n' + indent + extraIndent;
            const newValue = value.substring(0, selectionStart) + insertion + value.substring(selectionEnd);
            setCode(newValue);
            setTimeout(() => { target.setSelectionRange(selectionStart + insertion.length, selectionStart + insertion.length); }, 0);
        }

        const pairs = { '(': ')', '[': ']', '{': '}', '"': '"', "'": "'", '`': '`' };
        if (pairs[key]) {
            const charAfter = value.charAt(selectionStart);
            if (!charAfter || /\s|\)|\}|\]|;/.test(charAfter)) {
                e.preventDefault();
                const newValue = value.substring(0, selectionStart) + key + pairs[key] + value.substring(selectionEnd);
                setCode(newValue);
                setTimeout(() => { target.setSelectionRange(selectionStart + 1, selectionStart + 1); }, 0);
            }
        }
    };

    const loadLockouts = async () => {
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
    };

    const loadActiveSession = async () => {
        // Keeping this for reference, but we force selection first now
    };

    const handleStartArena = async (language) => {
        try {
            setIsStarting(language);
            const response = await arenaService.startSession(language);
            setSession(response.data);
            setTimeLimit(response.data.timeLimit);
            setCode(response.data.lesson?.exercise?.starterCode || '');
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
        if (isSubmitting || deathData) return;

        setIsSubmitting(true);
        setOutput(prev => [...prev, { type: 'info', text: 'VERIFYING LOGIC...' }]);

        try {
            const response = await arenaService.submitCode(session.sessionId, code);
            const data = response.data;

            if (data.passed) {
                if (data.completed) {
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
                    setCode(data.nextLesson?.exercise?.starterCode || '');
                    setOutput([{ type: 'success', text: `>> NODE ${data.level}.${data.part} BREACHED. ${message}` }]);

                    // Trigger Transition Flash
                    setShowTransition(true);
                    setTimeout(() => setShowTransition(false), 1500);

                    addNotification({ type: 'success', message: `NODE ${data.level} BREACHED.` });
                }
            } else {
                // FAILURE - DEATH
                setDeathData(data);
                setSession(null);
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
                            deathOutput.push({ type: 'error', text: `[Test ${i + 1}] FAILED: ${test.stderr || 'Incorrect output'}` });
                        }
                    });
                }

                setOutput(prev => [...prev, ...deathOutput]);
            }
        } catch (err) {
            addNotification({
                type: 'error',
                message: err.response?.data?.error?.message || err.response?.data?.message || 'Transmission failure'
            });
        } finally {
            setIsSubmitting(false);
        }
    };

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
                        One mistake results in death, point loss, and a temporary system burnout.
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
                                        if (isLocked) {
                                            addNotification({
                                                type: 'error',
                                                message: `SYSTEM BURNOUT: ${lang.toUpperCase()} protocol unavailable for ${timeStr} minutes.`
                                            });
                                            return;
                                        }
                                        handleStartArena(lang);
                                    }}
                                    className={`group p-6 border transition-all text-left relative overflow-hidden ${isLocked
                                        ? 'border-red-900/30 bg-red-900/5 cursor-not-allowed grayscale'
                                        : isThisStarting
                                            ? 'border-red-600 bg-red-600/10'
                                            : 'border-white/10 bg-white/[0.02] hover:bg-red-600/10 hover:border-red-600/50'
                                        }`}
                                >
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
                                        {isLocked ? `Locked: ${timeStr}` : 'Select Protocol'}
                                    </div>
                                </button>
                            );
                        })}
                    </div>
                </motion.div>
            </div>
        );
    }

    const getThreatLevelClass = () => {
        if (!session || deathData) return '';
        const ratio = timeLimit / (session.timeLimit || 300); // This assumes we have original limit
        // Since session.timeLimit is updated, let's use static thresholds for now
        // Or if we don't have the original, let's use fixed seconds
        if (timeLimit < 30) return 'threat-pulse-danger';
        if (timeLimit < 60) return 'threat-pulse-warning';
        return 'threat-pulse-safe';
    };

    return (
        <div className={`h-screen bg-[#050505] flex flex-col pt-16 overflow-hidden relative ${shake ? 'glitch-shake' : ''}`}>
            <CyberBackground />

            {/* Arena Header: Redesigned as HUD */}
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
                            className="w-14 bg-black/60 border-r border-red-600/20 py-6 text-right pr-4 font-mono text-[13px] text-white/10 select-none overflow-hidden"
                        >
                            {code.split('\n').map((_, i) => (
                                <div key={i} style={{ height: '22.75px', lineHeight: '22.75px' }}>
                                    {(i + 1).toString().padStart(2, '0')}
                                </div>
                            ))}
                        </div>

                        <div className="relative flex-1 overflow-hidden">
                            {/* Backdrop for highlighting */}
                            <div
                                ref={backdropRef}
                                className="editor-layer editor-backdrop font-mono italic opacity-90"
                                dangerouslySetInnerHTML={{ __html: highlightCode(code) + '\n ' }}
                            />

                            {/* Hidden Textarea for Input */}
                            <textarea
                                value={code}
                                onChange={(e) => setCode(e.target.value)}
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
                                <p className={`cyber-terminal-text ${line.type === 'error' ? 'text-red-500 font-bold' :
                                    line.type === 'success' ? 'text-green-400' : 'text-white/40'
                                    }`}>
                                    {line.text}
                                </p>
                            </div>
                        ))}
                    </div>
                </div>
            </div>

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
                                    <span className="text-red-400">60 Minutes</span>
                                </div>
                            </div>
                        </div>

                        <button
                            onClick={() => navigate('/dashboard')}
                            className="group relative px-16 py-4 bg-white hover:bg-red-600 transition-colors duration-500"
                        >
                            <span className="relative z-10 text-black group-hover:text-white font-black tracking-[0.3em] uppercase">Eject to Dashboard</span>
                        </button>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Level Transition Flash */}
            <AnimatePresence>
                {showTransition && (
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="fixed inset-0 z-[150] bg-white/10 flex items-center justify-center pointer-events-none backdrop-blur-sm"
                    >
                        <motion.div
                            initial={{ scale: 0.8, opacity: 0 }}
                            animate={{ scale: 1, opacity: 1 }}
                            exit={{ scale: 1.2, opacity: 0 }}
                            className="text-white text-6xl font-black italic tracking-tighter"
                        >
                            NODE <span className="text-red-600">BREACHED</span>
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>
        </div>
    );
};

export default ArenaPage;
