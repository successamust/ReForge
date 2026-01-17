import React, { useState, useEffect, useContext, useRef, useLayoutEffect } from 'react';
import { motion } from 'framer-motion';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';
import { useParams, useNavigate } from 'react-router-dom';
import Confetti from 'react-confetti';
import Button from '../components/ui/Button';
import { CodeFile, Processor, RunPlay, VerifiedCheck } from '../components/icons/CustomIcons';
import api from '../services/api';
import { lessonService } from '../services/lesson.service';
import { submissionService } from '../services/submission.service';
import { AppContext } from '../context/AppContext';
import SubmissionHistory from '../components/lessons/SubmissionHistory';
import ContentProgressTracker from '../components/lessons/ContentProgressTracker';
import CopyableCodeBlock from '../components/lessons/CopyableCodeBlock';
import LessonSection from '../components/lessons/LessonSection';
import AchievementToast from '../components/ui/AchievementToast';
import { AnimatePresence } from 'framer-motion';
import { telemetryService } from '../services/TelemetryService';
import PasteGuard from '../components/ui/PasteGuard';
import RelapseOverlay from '../components/ui/RelapseOverlay';
import DetoxModal from '../components/ui/DetoxModal';
import useUndoRedo from '../hooks/useUndoRedo';

const LessonDetailPage = () => {
    const { language, day } = useParams();
    const navigate = useNavigate();
    const { isAuthenticated, user, addNotification } = useContext(AppContext);
    const [isDetoxOpen, setIsDetoxOpen] = useState(false);

    const isRelapsed = user?.status === 'relapsed';
    const [lesson, setLesson] = useState(null);
    const [editorState, setEditorState, undo, redo, canUndo, canRedo, resetCode] = useUndoRedo({ value: '', selection: 0 });
    const code = editorState.value;
    const [output, setOutput] = useState([]);
    const [isRunning, setIsRunning] = useState(false);
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [submissionResult, setSubmissionResult] = useState(null);
    const [loading, setLoading] = useState(true);
    const [history, setHistory] = useState([]);
    const [historyLoading, setHistoryLoading] = useState(false);
    const [showHistory, setShowHistory] = useState(false);
    const [currentSection, setCurrentSection] = useState(0);
    const [showConfetti, setShowConfetti] = useState(false);
    const [activeAchievement, setActiveAchievement] = useState(null);
    const [lessonContent, setLessonContent] = useState([]);
    const [windowSize, setWindowSize] = useState({ width: window.innerWidth, height: window.innerHeight });
    const [isHeaderScrolled, setIsHeaderScrolled] = useState(false);
    const [isPasteGuardOpen, setIsPasteGuardOpen] = useState(false);

    const textareaRef = useRef(null);

    React.useLayoutEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.setSelectionRange(editorState.selection, editorState.selection);
        }
    }, [editorState]);

    useEffect(() => {
        const handleScroll = () => setIsHeaderScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        // Start telemetry session
        telemetryService.startSession();
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const isPassed = history.some(sub => sub.status === 'completed' && sub.resultDetails?.passed) ||
        (submissionResult?.status === 'completed' && submissionResult.resultDetails?.passed);

    useEffect(() => {
        const handleResize = () => {
            setWindowSize({ width: window.innerWidth, height: window.innerHeight });
        };
        window.addEventListener('resize', handleResize);
        return () => window.removeEventListener('resize', handleResize);
    }, []);

    const loadHistory = React.useCallback(async () => {
        try {
            setHistoryLoading(true);
            const response = await submissionService.getHistory(language, parseInt(day));
            setHistory(response.data?.submissions || response?.submissions || []);
        } catch (err) {
            console.error(err);
        } finally {
            setHistoryLoading(false);
        }
    }, [language, day]);

    useEffect(() => {
        if (showHistory) {
            loadHistory();
        }
    }, [showHistory, loadHistory]);

    const loadLesson = React.useCallback(async () => {
        try {
            setLoading(true);
            // Fetch progress first to ensure enrollment is recorded
            if (isAuthenticated) {
                await api.get(`/progress/${language}`);
            }

            const response = await lessonService.getLesson(language, parseInt(day));
            const lessonData = response?.data?.lesson || response?.lesson || response;
            setLesson(lessonData);
            resetCode({ value: lessonData?.exercise?.starterCode || '', selection: 0 });
        } catch (error) {
            console.error('Failed to load lesson:', error);
            addNotification({
                type: 'error',
                message: 'Failed to load lesson'
            });
            navigate('/lessons');
        } finally {
            setLoading(false);
        }
    }, [language, day, navigate, addNotification, resetCode, isAuthenticated]);

    useEffect(() => {
        loadLesson();
        loadHistory();
    }, [loadLesson, loadHistory]);

    const handleRun = async () => {
        if (!isAuthenticated) {
            addNotification({
                type: 'warning',
                message: 'Please login to run code'
            });
            return;
        }

        setIsRunning(true);
        setOutput([{ type: 'info', text: 'Preparing execution sandbox...' }]);

        try {
            const response = await submissionService.runCode(language, parseInt(day), code);
            const result = response?.data?.result || response?.result || response;

            const newOutput = [];
            if (result.passed) {
                newOutput.push({ type: 'success', text: '✓ Code executed successfully' });
                newOutput.push({ type: 'success', text: '✓ All tests passed!' });
            } else {
                newOutput.push({ type: 'error', text: '✗ Execution failed' });
                newOutput.push({ type: 'error', text: `Passed: ${result.summary?.passedCount || 0}/${result.summary?.total || 0} tests` });
            }

            if (result.details && result.details.length > 0) {
                result.details.forEach((test, i) => {
                    if (!test.passed) {
                        newOutput.push({
                            type: 'error',
                            text: `Test ${i + 1}: ${test.stderr || 'Incorrect output'}`
                        });
                        if (test.hint) {
                            newOutput.push({ type: 'info', text: `Hint: ${test.hint}` });
                        }
                    }
                });
            }

            setOutput(newOutput);
        } catch (error) {
            console.error('Run failed:', error);
            setOutput([{
                type: 'error',
                text: `Runtime Error: ${error.response?.data?.message || error.message || 'Worker connection failed'}`
            }]);
        } finally {
            setIsRunning(false);
        }
    };

    const pollSubmissionResult = (submissionId) => {
        const interval = setInterval(async () => {
            try {
                const response = await submissionService.getSubmission(submissionId);
                const submission = response?.data?.submission || response?.submission || response;

                if (submission.status !== 'pending') {
                    clearInterval(interval);
                    setSubmissionResult(submission);
                    setIsSubmitting(false);

                    const newOutput = [];
                    if (submission.status === 'completed' && submission.resultDetails?.passed) {
                        newOutput.push({ type: 'success', text: '✓ Submission PASSED' });
                        newOutput.push({ type: 'success', text: '✓ Reward assigned. Logic flow optimal.' });
                        setShowConfetti(true);
                        setTimeout(() => setShowConfetti(false), 5000);

                        addNotification({
                            type: 'success',
                            message: 'Rehabilitation Milestone Reached!'
                        });
                    } else if (submission.status === 'error') {
                        newOutput.push({ type: 'error', text: '⚠ SYSTEM ERROR' });
                        newOutput.push({ type: 'error', text: submission.resultDetails?.error || 'Worker malfunction' });
                        addNotification({
                            type: 'error',
                            message: 'Execution Environment Error'
                        });
                    } else {
                        newOutput.push({ type: 'error', text: '✗ Submission FAILED' });
                        newOutput.push({ type: 'error', text: 'Logic errors detected. Progress halted.' });
                        addNotification({
                            type: 'warning',
                            message: 'Tests failed. Fix your logic.'
                        });
                    }

                    if (submission.resultDetails?.details) {
                        submission.resultDetails.details.forEach((test, i) => {
                            if (!test.passed) {
                                newOutput.push({ type: 'error', text: `[Test ${i + 1}] FAILED` });
                                if (test.expected !== undefined && test.actual !== undefined) {
                                    newOutput.push({ type: 'error', text: `   Expected: ${JSON.stringify(test.expected)}` });
                                    newOutput.push({ type: 'error', text: `   Actual:   ${JSON.stringify(test.actual)}` });
                                }
                                if (test.stderr) {
                                    newOutput.push({ type: 'error', text: `   Error: ${test.stderr}` });
                                }
                            }
                        });
                    }

                    // Check for new achievements
                    if (submission.newAchievements?.length > 0) {
                        const latest = submission.newAchievements[0];
                        setActiveAchievement(latest);
                        // Auto-clear toast after 8 seconds if not dismissed
                        setTimeout(() => setActiveAchievement(null), 8000);
                    }

                    setOutput(newOutput);
                }
            } catch (error) {
                console.error('Polling error:', error);
                clearInterval(interval);
                setIsSubmitting(false);
            }
        }, 1500);
    };

    const handleSubmit = async () => {
        if (!isAuthenticated) {
            addNotification({
                type: 'warning',
                message: 'Please login to submit'
            });
            navigate('/login');
            return;
        }

        setIsSubmitting(true);
        setOutput([{ type: 'info', text: 'Transmitting logic for manual verification...' }]);

        try {
            const telemetryData = telemetryService.getCompressedData();
            const response = await submissionService.submitCode(language, parseInt(day), code, telemetryData);
            const submissionData = response?.data?.submission || response?.submission || response;

            pollSubmissionResult(submissionData.id || submissionData._id);

            addNotification({
                type: 'info',
                message: 'Submission queued. Synchronizing...'
            });
        } catch (error) {
            addNotification({
                type: 'error',
                message: error.response?.data?.error?.message || error.response?.data?.message || 'Submission failed'
            });
            setIsSubmitting(false);
        }
    };

    const backdropRef = useRef(null);
    const terminalRef = useRef(null);
    const lineNumbersRef = useRef(null);
    const lessonContentRef = useRef(null);

    useEffect(() => {
        if (terminalRef.current) {
            terminalRef.current.scrollTop = terminalRef.current.scrollHeight;
        }
    }, [output]);


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

        // Undo/Redo
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

        // Log telemetry
        telemetryService.logEvent('keydown', { key });

        // 0. Comment Toggle (Cmd+/ or Ctrl+/)
        if (key === '/' && (metaKey || ctrlKey)) {
            e.preventDefault();

            const prefix = language === 'python' ? '#' : '//';

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
            const allComments = lines.every(line => !line.trim() || line.trim().startsWith(prefix));
            const shouldUncomment = allComments;

            const transformedLines = lines.map(line => {
                if (!line.trim()) return line;
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

        // 1. Tab Indentation (2 spaces)
        if (key === 'Tab') {
            e.preventDefault();
            const tab = '  ';
            const newValue = value.substring(0, selectionStart) + tab + value.substring(selectionEnd);
            setEditorState({ value: newValue, selection: selectionStart + tab.length });
        }

        // 2. Smart Enter (Auto-Indent)
        // 2. Smart Enter (Auto-Indent + Auto-Close)
        if (key === 'Enter') {
            e.preventDefault();

            // Get current line's indentation
            const linesBefore = value.substring(0, selectionStart).split('\n');
            const currentLine = linesBefore[linesBefore.length - 1];
            const indentMatch = currentLine.match(/^\s*/);
            const indent = indentMatch ? indentMatch[0] : '';
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
                    const lineStartIndex = value.lastIndexOf('\n', selectionStart - 1) + 1;
                    const newValue = value.substring(0, lineStartIndex) + openerIndent + '}' + value.substring(selectionEnd);
                    const newCursorPos = lineStartIndex + openerIndent.length + 1;
                    setEditorState({ value: newValue, selection: newCursorPos });
                    return;
                }
            }
        }

        // 3. Auto-Closing Pairs
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
                // Only auto-close if cursor is at end of line or before a space/closing bracket
                const charAfter = value.charAt(selectionStart);
                const shouldClose = !charAfter || /\s|\)|\}|\]|;/.test(charAfter);

                if (shouldClose) {
                    e.preventDefault();
                    const closing = pairs[key];
                    const newValue = value.substring(0, selectionStart) + key + closing + value.substring(selectionEnd);
                    setEditorState({ value: newValue, selection: selectionStart + 1 });
                }
            }
        }
    };

    const ref = useRef(null);
    // Removed legacy scroll transforms for smoother split-pane experience

    const sections = [
        { title: 'Objectives', id: 0 },
        { title: 'Content', id: 1 },
        { title: 'Examples', id: 2 },
        { title: 'Exercise', id: 3 },
        { title: 'Code', id: 4 }
    ];

    return (
        <>
            {showConfetti && (
                <Confetti
                    width={windowSize.width}
                    height={windowSize.height}
                    recycle={false}
                    numberOfPieces={500}
                    gravity={0.3}
                />
            )}

            <div ref={ref} className={`relative lg:h-screen bg-black transition-all duration-500 lg:overflow-hidden flex flex-col ${isHeaderScrolled ? 'pt-16' : 'pt-24'}`}>
                {loading ? (
                    <div className="flex items-center justify-center h-full">
                        <div className="w-12 h-12 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    </div>
                ) : !lesson ? null : (
                    <>
                        <div className="flex-shrink-0 z-50">
                            <ContentProgressTracker
                                sections={sections}
                                currentSection={currentSection}
                                scrollContainerRef={lessonContentRef}
                            />
                        </div>

                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="mb-4 px-6 pt-4">
                            <Button
                                variant="ghost"
                                onClick={() => navigate(`/lessons/${language}`)}
                                className="mb-4">
                                ← Back to Lessons
                            </Button>
                            <div className="flex items-center gap-3 mb-4">
                                <div className="px-3 py-1 border border-white/10 text-xs font-bold uppercase tracking-widest text-white">
                                    Day {day}
                                </div>
                                <div className="px-3 py-1 border border-white/10 text-xs font-bold uppercase tracking-widest text-white/60">
                                    {language.toUpperCase()}
                                </div>
                            </div>
                            {lesson.estimatedMinutes && (
                                <div className="px-3 py-1 border border-white/10 text-xs font-bold uppercase tracking-widest text-purple-400">
                                    ⏱ {lesson.estimatedMinutes} min
                                </div>
                            )}
                            <h1 className="text-[clamp(1.5rem,5vw,2.5rem)] font-black leading-tight tracking-[-0.02em] text-white mb-2">
                                {lesson.title}
                            </h1>
                            <p className="text-white/60 font-light text-base max-w-3xl">
                                {lesson.objectives?.join(' • ')}
                            </p>
                        </motion.div>

                        <div className="flex-1 min-h-0 flex flex-col lg:flex-row lg:overflow-hidden">
                            <div className="flex-1 grid grid-cols-1 lg:grid-cols-2 lg:h-full">
                                <motion.div
                                    ref={lessonContentRef}
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="h-auto lg:h-full lg:overflow-y-auto px-6 pb-20 lg:border-r border-white/5 custom-scrollbar">
                                    <div className="max-w-3xl mx-auto py-8">

                                        <LessonSection
                                            id={0}
                                            title="Objectives"
                                            icon={VerifiedCheck}
                                            onInView={setCurrentSection}
                                            defaultExpanded={true}>
                                            <ul className="space-y-4">
                                                {lesson.objectives?.map((obj, i) => (
                                                    <li key={i} className="flex items-start gap-3">
                                                        <VerifiedCheck size={18} className="text-white mt-1 flex-shrink-0" />
                                                        <span className="text-white/80 font-light">{obj}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </LessonSection>

                                        {lesson.contentHtml && (
                                            <LessonSection
                                                id={1}
                                                title="Content"
                                                onInView={setCurrentSection}
                                                defaultExpanded={true}>
                                                <div className="lesson-prose max-w-none">
                                                    <div dangerouslySetInnerHTML={{ __html: lesson.contentHtml }} />
                                                </div>
                                            </LessonSection>
                                        )}

                                        {lesson.examples && lesson.examples.length > 0 && (
                                            <LessonSection
                                                id={2}
                                                title="Examples"
                                                icon={CodeFile}
                                                onInView={setCurrentSection}
                                                defaultExpanded={true}>
                                                <div className="space-y-6">
                                                    {lesson.examples.map((example, i) => (
                                                        <div key={i} className="space-y-3">
                                                            {example.title && (
                                                                <h3 className="text-sm font-bold uppercase tracking-widest text-white/60">
                                                                    {example.title}
                                                                </h3>
                                                            )}
                                                            <CopyableCodeBlock
                                                                code={example.code}
                                                                language={language}
                                                                title={example.title || `Example ${i + 1}`}
                                                            />
                                                            {example.explanation && (
                                                                <p className="text-white/60 font-light text-sm leading-relaxed mt-2">
                                                                    {example.explanation}
                                                                </p>
                                                            )}
                                                        </div>
                                                    ))}
                                                </div>
                                            </LessonSection>
                                        )}

                                        {lesson.exercise && (
                                            <LessonSection
                                                id={3}
                                                title="Exercise"
                                                icon={Processor}
                                                onInView={setCurrentSection}
                                                defaultExpanded={true}>
                                                <div className="bg-white/[0.02] p-6 border border-white/10 rounded space-y-4">
                                                    <p className="text-white/80 font-light leading-relaxed">
                                                        {lesson.exercise.description}
                                                    </p>
                                                    {lesson.exercise.hints && lesson.exercise.hints.length > 0 && (
                                                        <div className="pt-4 border-t border-white/5">
                                                            <p className="text-xs font-bold uppercase tracking-widest text-white/40 mb-2">
                                                                💡 Hints
                                                            </p>
                                                            <ul className="space-y-2">
                                                                {lesson.exercise.hints.map((hint, i) => (
                                                                    <li key={i} className="text-white/60 text-sm font-light flex items-start gap-2">
                                                                        <span className="text-purple-400">•</span>
                                                                        <span>{hint}</span>
                                                                    </li>
                                                                ))}
                                                            </ul>
                                                        </div>
                                                    )}
                                                </div>
                                            </LessonSection>
                                        )}

                                        {lesson.tests && lesson.tests.length > 0 && (
                                            <LessonSection
                                                title="Test Cases"
                                                onInView={setCurrentSection}
                                                defaultExpanded={false}>
                                                <div className="space-y-3">
                                                    {lesson.tests.filter(t => !t.isHidden).map((test, i) => (
                                                        <div key={test.id || i} className="bg-white/[0.02] p-4 border border-white/10 rounded">
                                                            <div className="flex items-start justify-between gap-4">
                                                                <div className="flex-1">
                                                                    <p className="text-white/80 font-light text-sm mb-1">
                                                                        {test.description}
                                                                    </p>
                                                                    {test.input !== undefined && (
                                                                        <p className="text-white/40 text-xs font-mono mt-2">
                                                                            Input: {JSON.stringify(test.input)}
                                                                        </p>
                                                                    )}
                                                                    {test.expectedOutput !== undefined && (
                                                                        <p className="text-white/40 text-xs font-mono mt-1">
                                                                            Expected: {JSON.stringify(test.expectedOutput)}
                                                                        </p>
                                                                    )}
                                                                </div>
                                                            </div>
                                                        </div>
                                                    ))}
                                                    {lesson.tests.filter(t => t.isHidden).length > 0 && (
                                                        <p className="text-white/40 text-xs italic text-center py-2">
                                                            + {lesson.tests.filter(t => t.isHidden).length} hidden test(s)
                                                        </p>
                                                    )}
                                                </div>
                                            </LessonSection>
                                        )}
                                    </div>
                                </motion.div>

                                <motion.div
                                    initial={{ opacity: 0 }}
                                    animate={{ opacity: 1 }}
                                    className="h-auto lg:h-full lg:overflow-y-auto px-6 pb-20 custom-scrollbar bg-black/20">
                                    <div className="max-w-4xl mx-auto py-8">
                                        <LessonSection
                                            id={4}
                                            title="Your Code"
                                            icon={CodeFile}
                                            onInView={setCurrentSection}
                                            defaultExpanded={true}>
                                            <div className="bg-black border border-white/10 overflow-hidden rounded">
                                                <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-white/[0.02]">
                                                    <div className="flex items-center gap-3">
                                                        <CodeFile size={16} className="text-white" />
                                                        <span className="text-xs font-bold uppercase tracking-widest text-white/60">
                                                            {language}.{getFileExtension(language)}
                                                        </span>
                                                        {isPassed && (
                                                            <motion.div
                                                                initial={{ opacity: 0, x: -10 }}
                                                                animate={{ opacity: 1, x: 0 }}
                                                                className="flex items-center gap-2 px-2 py-0.5 bg-green-500/10 border border-green-500/20 rounded text-[9px] font-bold uppercase tracking-widest text-green-500">
                                                                <VerifiedCheck size={10} />
                                                                Mastered
                                                            </motion.div>
                                                        )}
                                                    </div>
                                                    <div className="flex gap-2">
                                                        {parseInt(day) > 1 && (
                                                            <Button
                                                                size="sm"
                                                                onClick={() => navigate(`/lessons/${language}/${parseInt(day) - 1}`)}
                                                                variant="ghost"
                                                                className="text-xs uppercase border-white/10 hover:bg-white/5">
                                                                Previous
                                                            </Button>
                                                        )}
                                                        <Button
                                                            size="sm"
                                                            onClick={handleRun}
                                                            isLoading={isRunning}
                                                            icon={RunPlay}
                                                            variant="ghost"
                                                            className="text-xs uppercase">
                                                            Run
                                                        </Button>
                                                        <Button
                                                            size="sm"
                                                            onClick={handleSubmit}
                                                            isLoading={isSubmitting}
                                                            disabled={isPassed}
                                                            className="text-xs uppercase disabled:opacity-30 disabled:cursor-not-allowed">
                                                            Submit
                                                        </Button>
                                                        {isPassed && (
                                                            <Button
                                                                size="sm"
                                                                onClick={() => navigate(`/lessons/${language}/${parseInt(day) + 1}`)}
                                                                className="text-xs uppercase bg-green-600 hover:bg-green-500 border-none shadow-[0_0_15px_rgba(22,163,74,0.4)]">
                                                                Next Lesson
                                                            </Button>
                                                        )}
                                                    </div>
                                                </div>

                                                <div className="flex bg-black/50 h-[500px]">
                                                    <div
                                                        ref={lineNumbersRef}
                                                        className="w-12 bg-black/40 border-r border-white/5 py-6 text-right pr-3 font-mono text-[14px] text-white/10 select-none overflow-hidden"
                                                    >
                                                        {code.split('\n').map((_, i) => (
                                                            <div key={i} style={{ height: '24px', lineHeight: '24px' }}>
                                                                {i + 1}
                                                            </div>
                                                        ))}
                                                    </div>

                                                    <div className="relative flex-1 overflow-hidden">
                                                        <div
                                                            ref={backdropRef}
                                                            className="editor-layer editor-backdrop pointer-events-none select-none"
                                                            aria-hidden="true"
                                                        >
                                                            <SyntaxHighlighter
                                                                language={language}
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

                                                        <textarea
                                                            ref={textareaRef}
                                                            value={code}
                                                            onChange={(e) => setEditorState({ value: e.target.value, selection: e.target.selectionEnd })}
                                                            onKeyDown={handleKeyDown}
                                                            onScroll={handleScroll}
                                                            wrap="off"
                                                            onPaste={(e) => {
                                                                e.preventDefault();
                                                                setIsPasteGuardOpen(true);
                                                                telemetryService.logEvent('paste');
                                                            }}
                                                            className="editor-layer editor-textarea"
                                                            placeholder="Write your code here..."
                                                            spellCheck={false}
                                                        />
                                                    </div>
                                                </div>

                                                <div
                                                    ref={terminalRef}
                                                    className="border-t border-white/10 bg-black p-6 font-mono text-xs min-h-[200px] max-h-[300px] overflow-y-auto"
                                                >
                                                    <div className="flex items-center gap-3 text-white/40 mb-4 font-bold uppercase tracking-widest">
                                                        <Processor size={14} className="text-white/60" />
                                                        <span>OUTPUT</span>
                                                    </div>
                                                    <div className="space-y-2">
                                                        {output.length === 0 && (
                                                            <p className="text-white/30">No output yet. Run your code to see results.</p>
                                                        )}
                                                        {output.map((line, i) => (
                                                            <p
                                                                key={i}
                                                                className={
                                                                    line.type === 'success'
                                                                        ? 'text-green-400 font-bold'
                                                                        : line.type === 'error'
                                                                            ? 'text-red-400 font-bold'
                                                                            : 'text-white/60'
                                                                }>
                                                                {line.text}
                                                            </p>
                                                        ))}
                                                        {isRunning && (
                                                            <motion.span
                                                                animate={{ opacity: [0, 1, 0] }}
                                                                transition={{ repeat: Infinity, duration: 1 }}
                                                                className="inline-block w-2 h-4 bg-white align-middle ml-1"
                                                            />
                                                        )}
                                                    </div>
                                                </div>

                                                <div className="border-t border-white/10 bg-black">
                                                    <div className="flex items-center gap-3 px-6 py-4 border-b border-white/5 text-white/40 font-bold uppercase tracking-widest cursor-pointer hover:text-white/60" onClick={() => setShowHistory(!showHistory)}>
                                                        <div className="flex-1">History</div>
                                                        <div className="text-xs">{showHistory ? '▼' : '▶'}</div>
                                                    </div>
                                                    {showHistory && (
                                                        <SubmissionHistory history={history} loading={historyLoading} />
                                                    )}
                                                </div>

                                                {submissionResult && (
                                                    <motion.div
                                                        initial={{ opacity: 0, y: 10 }}
                                                        animate={{ opacity: 1, y: 0 }}
                                                        className="border-t border-white/10 p-6 bg-white/[0.02]">
                                                        <div className="flex items-center gap-2 text-white font-bold uppercase text-sm">
                                                            <VerifiedCheck size={16} />
                                                            Submission Result
                                                        </div>
                                                        <p className="text-white/60 text-sm mt-2 font-light">
                                                            {submissionResult.status === 'completed' && submissionResult.resultDetails?.passed
                                                                ? '🎉 All tests passed!'
                                                                : '❌ Some tests failed. Keep trying!'}
                                                        </p>
                                                    </motion.div>
                                                )}
                                            </div>
                                        </LessonSection>
                                    </div>
                                </motion.div>
                            </div>
                        </div>
                    </>
                )}
            </div >
            <PasteGuard
                isOpen={isPasteGuardOpen}
                onClose={() => setIsPasteGuardOpen(false)}
                onAcknowledge={() => setIsPasteGuardOpen(false)}
            />

            {/* Relapse Mechanics */}
            {!loading && isRelapsed && !isDetoxOpen && (
                <RelapseOverlay
                    user={user}
                    onStartDetox={() => setIsDetoxOpen(true)}
                />
            )}

            <DetoxModal
                isOpen={isDetoxOpen}
                onClose={() => setIsDetoxOpen(false)}
                requiredDrills={user?.detoxRequired || 5}
                onComplete={() => {
                    window.location.reload();
                }}
            />
        </>
    );
};

function getFileExtension(language) {
    const extensions = {
        javascript: 'js',
        python: 'py',
        java: 'java',
        go: 'go',
        csharp: 'cs'
    };
    return extensions[language] || 'txt';
}

export default LessonDetailPage;
