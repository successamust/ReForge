import React, { useState, useEffect, useContext, useRef } from 'react';
import { motion } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import Confetti from 'react-confetti';
import Button from '../components/ui/Button';
import { CodeFile, Processor, RunPlay, VerifiedCheck } from '../components/icons/CustomIcons';
import { lessonService } from '../services/lesson.service';
import { submissionService } from '../services/submission.service';
import { AppContext } from '../context/AppContext';
import SubmissionHistory from '../components/lessons/SubmissionHistory';
import ContentProgressTracker from '../components/lessons/ContentProgressTracker';
import CopyableCodeBlock from '../components/lessons/CopyableCodeBlock';
import LessonSection from '../components/lessons/LessonSection';

const LessonDetailPage = () => {
    const { language, day } = useParams();
    const navigate = useNavigate();
    const { isAuthenticated, addNotification } = useContext(AppContext);
    const [lesson, setLesson] = useState(null);
    const [code, setCode] = useState('');
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
    const [windowSize, setWindowSize] = useState({ width: window.innerWidth, height: window.innerHeight });
    const [isHeaderScrolled, setIsHeaderScrolled] = useState(false);

    useEffect(() => {
        const handleScroll = () => setIsHeaderScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
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
            const response = await lessonService.getLesson(language, parseInt(day));
            const lessonData = response?.data?.lesson || response?.lesson || response;
            setLesson(lessonData);
            setCode(lessonData?.exercise?.starterCode || '');
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
    }, [language, day, navigate, addNotification]);

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
                                newOutput.push({ type: 'error', text: `[Test ${i + 1}] ${test.stderr || 'Unexpected output'}` });
                            }
                        });
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
            const response = await submissionService.submitCode(language, parseInt(day), code);
            const submissionData = response?.data?.submission || response?.submission || response;

            pollSubmissionResult(submissionData.id || submissionData._id);

            addNotification({
                type: 'info',
                message: 'Submission queued. Synchronizing...'
            });
        } catch (error) {
            addNotification({
                type: 'error',
                message: error.response?.data?.message || 'Submission failed'
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

    const highlightCode = (code) => {
        if (!code) return '';

        // Escape HTML
        let escaped = code
            .replace(/&/g, "&amp;")
            .replace(/</g, "&lt;")
            .replace(/>/g, "&gt;");

        const keywords = [
            'function', 'const', 'let', 'var', 'return', 'if', 'else', 'for', 'while',
            'import', 'export', 'await', 'async', 'try', 'catch', 'new', 'class',
            'extends', 'super', 'switch', 'case', 'break', 'default', 'true', 'false', 'null'
        ];

        // Combined regex to avoid nested matching (e.g., strings inside style tags)
        // Group 1: Comments, Group 2: Strings, Group 3: Keywords, Group 4: Numbers
        const regex = new RegExp(
            `(\\/\\/.*$|\\/\\*[\\s\\S]*?\\*\\/)|` +
            `(".*?"|'.*?'|\`.*?\`)|` +
            `\\b(${keywords.join('|')})\\b|` +
            `(\\b\\d+\\b)`,
            'gm'
        );

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

        // 0. Comment Toggle (Cmd+/ or Ctrl+/)
        if (key === '/' && (metaKey || ctrlKey)) {
            e.preventDefault();

            // Find current line bounds
            const before = value.substring(0, selectionStart);
            const after = value.substring(selectionStart);

            const lineStart = before.lastIndexOf('\n') + 1;
            const lineEndRaw = after.indexOf('\n');
            const lineEnd = lineEndRaw === -1 ? value.length : selectionStart + lineEndRaw;

            const line = value.substring(lineStart, lineEnd);
            let newLine;
            let offset;

            if (line.trim().startsWith('//')) {
                // Uncomment
                newLine = line.replace(/(\s*)\/\/\s?/, '$1');
                offset = newLine.length - line.length;
            } else {
                // Comment
                newLine = '// ' + line;
                offset = 3;
            }

            const newValue = value.substring(0, lineStart) + newLine + value.substring(lineEnd);
            setCode(newValue);

            setTimeout(() => {
                target.setSelectionRange(selectionStart + offset, selectionEnd + offset);
            }, 0);
            return;
        }

        // 1. Tab Indentation (2 spaces)
        if (key === 'Tab') {
            e.preventDefault();
            const tab = '  ';
            const newValue = value.substring(0, selectionStart) + tab + value.substring(selectionEnd);
            setCode(newValue);

            // Re-position cursor using a timeout to ensure state has updated
            setTimeout(() => {
                target.setSelectionRange(selectionStart + tab.length, selectionStart + tab.length);
            }, 0);
        }

        // 2. Smart Enter (Auto-Indent)
        if (key === 'Enter') {
            e.preventDefault();

            // Get current line's indentation
            const linesBefore = value.substring(0, selectionStart).split('\n');
            const currentLine = linesBefore[linesBefore.length - 1];
            const indentMatch = currentLine.match(/^\s*/);
            const indent = indentMatch ? indentMatch[0] : '';

            // Add extra indent if previous line ends with an opening brace
            let extraIndent = '';
            if (currentLine.trim().endsWith('{') || currentLine.trim().endsWith('(') || currentLine.trim().endsWith('[')) {
                extraIndent = '  ';
            }

            const insertion = '\n' + indent + extraIndent;
            const newValue = value.substring(0, selectionStart) + insertion + value.substring(selectionEnd);
            setCode(newValue);

            setTimeout(() => {
                target.setSelectionRange(selectionStart + insertion.length, selectionStart + insertion.length);
            }, 0);
        }

        // 3. Auto-Closing Pairs
        const pairs = {
            '(': ')',
            '[': ']',
            '{': '}',
            '"': '"',
            "'": "'",
            '`': '`'
        };

        if (pairs[key]) {
            // Only auto-close if cursor is at end of line or before a space/closing bracket
            const charAfter = value.charAt(selectionStart);
            const shouldClose = !charAfter || /\s|\)|\}|\]|;/.test(charAfter);

            if (shouldClose) {
                e.preventDefault();
                const closing = pairs[key];
                const newValue = value.substring(0, selectionStart) + key + closing + value.substring(selectionEnd);
                setCode(newValue);

                setTimeout(() => {
                    target.setSelectionRange(selectionStart + 1, selectionStart + 1);
                }, 0);
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
                                                            <div key={i} style={{ height: '22.75px', lineHeight: '22.75px' }}>
                                                                {i + 1}
                                                            </div>
                                                        ))}
                                                    </div>

                                                    <div className="relative flex-1 overflow-hidden">
                                                        <div
                                                            ref={backdropRef}
                                                            className="editor-layer editor-backdrop"
                                                            dangerouslySetInnerHTML={{ __html: highlightCode(code) + '\n ' }}
                                                        />

                                                        <textarea
                                                            value={code}
                                                            onChange={(e) => setCode(e.target.value)}
                                                            onKeyDown={handleKeyDown}
                                                            onScroll={handleScroll}
                                                            wrap="off"
                                                            onPaste={(e) => {
                                                                e.preventDefault();
                                                                addNotification({
                                                                    type: 'warning',
                                                                    message: 'Pasting is disabled. Please type your code manually.'
                                                                });
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
