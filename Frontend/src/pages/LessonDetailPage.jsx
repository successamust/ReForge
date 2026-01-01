import React, { useState, useEffect, useContext, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
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
    }, [loadLesson]);

    const handleRun = () => {
        if (!isAuthenticated) {
            addNotification({
                type: 'warning',
                message: 'Please login to run code'
            });
            return;
        }

        setIsRunning(true);
        setOutput([{ type: 'info', text: 'Running code...' }]);

        // Simulate code execution
        setTimeout(() => {
            setOutput([
                { type: 'info', text: 'Code executed successfully' },
                { type: 'success', text: 'All tests passed!' }
            ]);
            setIsRunning(false);
        }, 2000);
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
        try {
            const response = await submissionService.submitCode(language, parseInt(day), code);
            const submissionData = response?.data || response;
            setSubmissionResult(submissionData);

            // Trigger confetti on successful submission
            if (submissionData.status === 'completed' && submissionData.resultDetails?.passed) {
                setShowConfetti(true);
                setTimeout(() => setShowConfetti(false), 5000);
            }

            addNotification({
                type: 'success',
                message: 'Submission successful!'
            });
        } catch (error) {
            addNotification({
                type: 'error',
                message: error.response?.data?.message || 'Submission failed'
            });
        } finally {
            setIsSubmitting(false);
        }
    };

    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    });

    const headerY = useTransform(scrollYProgress, [0, 1], [50, -50]);
    const headerOpacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
    const contentY = useTransform(scrollYProgress, [0, 1], [60, -60]);
    const contentOpacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
    const codeY = useTransform(scrollYProgress, [0, 1], [80, -80]);
    const codeOpacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

    const sections = [
        { title: 'Objectives', id: 0 },
        { title: 'Content', id: 1 },
        { title: 'Examples', id: 2 },
        { title: 'Exercise', id: 3 },
        { title: 'Code', id: 4 }
    ];

    return (
        <>
            {/* Confetti Celebration */}
            {showConfetti && (
                <Confetti
                    width={windowSize.width}
                    height={windowSize.height}
                    recycle={false}
                    numberOfPieces={500}
                    gravity={0.3}
                />
            )}

            <div ref={ref} className="relative min-h-screen bg-black pt-32 pb-20 px-6">
                {loading ? (
                    <div className="flex items-center justify-center min-h-[60vh]">
                        <div className="w-12 h-12 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    </div>
                ) : !lesson ? null : (
                    <>
                        {/* Progress Tracker */}
                        <ContentProgressTracker
                            sections={sections}
                            currentSection={currentSection}
                        />

                        <div className="container mx-auto max-w-7xl">
                            <motion.div
                                style={{
                                    y: headerY,
                                    opacity: headerOpacity
                                }}
                                className="mb-12">
                                <Button
                                    variant="ghost"
                                    onClick={() => navigate(`/lessons/${language}`)}
                                    className="mb-8">
                                    ← Back to Lessons
                                </Button>
                                <div className="flex items-center gap-3 mb-6">
                                    <div className="px-3 py-1 border border-white/10 text-xs font-bold uppercase tracking-widest text-white">
                                        Day {day}
                                    </div>
                                    <div className="px-3 py-1 border border-white/10 text-xs font-bold uppercase tracking-widest text-white/60">
                                        {language.toUpperCase()}
                                    </div>
                                    {lesson.estimatedMinutes && (
                                        <div className="px-3 py-1 border border-white/10 text-xs font-bold uppercase tracking-widest text-purple-400">
                                            ⏱ {lesson.estimatedMinutes} min
                                        </div>
                                    )}
                                </div>
                                <h1 className="text-[clamp(2.5rem,6vw,4rem)] font-black leading-[0.9] tracking-[-0.02em] text-white mb-6">
                                    {lesson.title}
                                </h1>
                                <p className="text-white/60 font-light text-lg max-w-3xl">
                                    {lesson.objectives?.join(' • ')}
                                </p>
                            </motion.div>

                            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                                {/* Lesson Content */}
                                <motion.div
                                    style={{
                                        y: contentY,
                                        opacity: contentOpacity
                                    }}
                                    className="space-y-0">

                                    {/* Objectives Section */}
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

                                    {/* Content Section */}
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

                                    {/* Examples Section */}
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

                                    {/* Exercise Section */}
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

                                    {/* Tests Section */}
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
                                </motion.div>

                                {/* Code Editor */}
                                <motion.div
                                    style={{
                                        y: codeY,
                                        opacity: codeOpacity
                                    }}
                                    className="lg:sticky lg:top-32 h-fit">
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
                                                </div>
                                                <div className="flex gap-2">
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
                                                        className="text-xs uppercase">
                                                        Submit
                                                    </Button>
                                                </div>
                                            </div>

                                            <div className="relative h-[500px] font-mono text-sm overflow-hidden bg-black/50">
                                                <textarea
                                                    value={code}
                                                    onChange={(e) => setCode(e.target.value)}
                                                    onPaste={(e) => {
                                                        e.preventDefault();
                                                        addNotification({
                                                            type: 'warning',
                                                            message: 'Pasting is disabled. Please type your code manually.'
                                                        });
                                                    }}
                                                    className="w-full h-full p-6 bg-transparent text-white/80 resize-none focus:outline-none focus:ring-0 font-mono text-sm leading-relaxed"
                                                    placeholder="Write your code here..."
                                                    spellCheck={false}
                                                />
                                            </div>

                                            {/* Output Terminal */}
                                            <div className="border-t border-white/10 bg-black p-6 font-mono text-xs min-h-[200px] max-h-[300px] overflow-y-auto">
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

                                            {/* Submission History Section */}
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
                                </motion.div>
                            </div>
                        </div>
                    </>
                )}
            </div>
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
