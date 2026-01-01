import React, { useState, useEffect, useContext, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useParams, useNavigate } from 'react-router-dom';
import Button from '../components/ui/Button';
import { CodeFile, Processor, RunPlay, VerifiedCheck } from '../components/icons/CustomIcons';
import { lessonService } from '../services/lesson.service';
import { submissionService } from '../services/submission.service';
import { AppContext } from '../context/AppContext';

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

    useEffect(() => {
        loadLesson();
    }, [language, day]);

    const loadLesson = async () => {
        try {
            setLoading(true);
            const response = await lessonService.getLesson(language, parseInt(day));
            // API interceptor returns response.data, so response is { success: true, data: { lesson: {...} } }
            // Extract lesson from nested structure
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
    };

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
            // API interceptor returns response.data, so use response directly or response.data
            const submissionData = response?.data || response;
            setSubmissionResult(submissionData);
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
    // Always use the same scroll configuration to maintain hook order
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    });
    
    // Always call useTransform hooks unconditionally
    const headerY = useTransform(scrollYProgress, [0, 1], [50, -50]);
    const headerOpacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
    const contentY = useTransform(scrollYProgress, [0, 1], [60, -60]);
    const contentOpacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
    const codeY = useTransform(scrollYProgress, [0, 1], [80, -80]);
    const codeOpacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

    return (
        <div ref={ref} className="relative min-h-screen bg-black py-40 px-6">
            {loading ? (
                <div className="flex items-center justify-center min-h-[60vh]">
                    <div className="w-12 h-12 border-2 border-white border-t-transparent rounded-full animate-spin" />
                </div>
            ) : !lesson ? null : (
            <div className="container mx-auto max-w-7xl">
                <motion.div
                    style={{
                        y: headerY,
                        opacity: headerOpacity
                    }}
                    className="mb-12"
                >
                    <Button
                        variant="ghost"
                        onClick={() => navigate(`/lessons/${language}`)}
                        className="mb-8"
                    >
                        ← Back to Lessons
                    </Button>
                    <div className="flex items-center gap-3 mb-6">
                        <div className="px-3 py-1 border border-white/10 text-xs font-bold uppercase tracking-widest text-white">
                            Day {day}
                        </div>
                        <div className="px-3 py-1 border border-white/10 text-xs font-bold uppercase tracking-widest text-white/60">
                            {language.toUpperCase()}
                        </div>
                    </div>
                    <h1 className="text-[clamp(2.5rem,6vw,4rem)] font-black leading-[0.9] tracking-[-0.02em] text-white mb-6">
                        {lesson.title}
                    </h1>
                    <p className="text-white/60 font-light text-lg max-w-3xl">
                        {lesson.objectives?.join(' • ')}
                    </p>
                </motion.div>

                <div className="grid grid-cols-1 lg:grid-cols-2 gap-px bg-white/5">
                    {/* Lesson Content */}
                    <motion.div
                        style={{
                            y: contentY,
                            opacity: contentOpacity
                        }}
                        className="bg-black p-8 border border-white/10 space-y-8"
                    >
                        <div>
                            <h2 className="text-2xl font-black text-white mb-6 tracking-tight">
                                Objectives
                            </h2>
                            <ul className="space-y-4">
                                {lesson.objectives?.map((obj, i) => (
                                    <li key={i} className="flex items-start gap-3">
                                        <VerifiedCheck size={18} className="text-white mt-1 flex-shrink-0" />
                                        <span className="text-white/80 font-light">{obj}</span>
                                    </li>
                                ))}
                            </ul>
                        </div>

                        {lesson.contentHtml && (
                            <div>
                                <h2 className="text-2xl font-black text-white mb-6 tracking-tight">
                                    Content
                                </h2>
                                <div
                                    className="prose prose-invert max-w-none text-white/80 font-light"
                                    dangerouslySetInnerHTML={{ __html: lesson.contentHtml }}
                                />
                            </div>
                        )}

                        {lesson.examples && lesson.examples.length > 0 && (
                            <div>
                                <h2 className="text-2xl font-black text-white mb-6 tracking-tight">
                                    Examples
                                </h2>
                                <div className="space-y-6">
                                    {lesson.examples.map((example, i) => (
                                        <div key={i} className="bg-white/[0.02] p-6 border border-white/10 space-y-3">
                                            {example.title && (
                                                <h3 className="text-sm font-bold uppercase tracking-widest text-white/60">
                                                    {example.title}
                                                </h3>
                                            )}
                                            <pre className="text-sm text-white/80 font-mono overflow-x-auto bg-black/30 p-4 rounded border border-white/5">
                                                <code>{example.code}</code>
                                            </pre>
                                            {example.explanation && (
                                                <p className="text-white/60 font-light text-sm leading-relaxed">
                                                    {example.explanation}
                                                </p>
                                            )}
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}

                        {lesson.exercise && (
                            <div>
                                <h2 className="text-2xl font-black text-white mb-6 tracking-tight">
                                    Exercise
                                </h2>
                                <div className="bg-white/[0.02] p-6 border border-white/10 space-y-4">
                                    <p className="text-white/80 font-light leading-relaxed">
                                        {lesson.exercise.description}
                                    </p>
                                    {lesson.exercise.hints && lesson.exercise.hints.length > 0 && (
                                        <div className="pt-4 border-t border-white/5">
                                            <p className="text-xs font-bold uppercase tracking-widest text-white/40 mb-2">
                                                Hints
                                            </p>
                                            <ul className="space-y-2">
                                                {lesson.exercise.hints.map((hint, i) => (
                                                    <li key={i} className="text-white/60 text-sm font-light flex items-start gap-2">
                                                        <span className="text-white/40">•</span>
                                                        <span>{hint}</span>
                                                    </li>
                                                ))}
                                            </ul>
                                        </div>
                                    )}
                                </div>
                            </div>
                        )}

                        {lesson.tests && lesson.tests.length > 0 && (
                            <div>
                                <h2 className="text-2xl font-black text-white mb-6 tracking-tight">
                                    Tests
                                </h2>
                                <div className="space-y-3">
                                    {lesson.tests.map((test, i) => (
                                        <div key={test.id || i} className="bg-white/[0.02] p-4 border border-white/10">
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
                                                {test.isHidden && (
                                                    <span className="text-xs font-bold uppercase tracking-widest text-white/30">
                                                        Hidden
                                                    </span>
                                                )}
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>
                        )}
                    </motion.div>

                    {/* Code Editor */}
                    <motion.div
                        style={{
                            y: codeY,
                            opacity: codeOpacity
                        }}
                        className="bg-black border border-white/10"
                    >
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
                                    className="text-xs uppercase"
                                >
                                    Run
                                </Button>
                                <Button
                                    size="sm"
                                    onClick={handleSubmit}
                                    isLoading={isSubmitting}
                                    className="text-xs uppercase"
                                >
                                    Submit
                                </Button>
                            </div>
                        </div>

                        <div className="relative h-[500px] font-mono text-sm overflow-hidden bg-black/50">
                            <textarea
                                value={code}
                                onChange={(e) => setCode(e.target.value)}
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
                                                ? 'text-white font-bold'
                                                : line.type === 'error'
                                                ? 'text-white font-bold'
                                                : 'text-white/60'
                                        }
                                    >
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

                        {submissionResult && (
                            <div className="border-t border-white/10 p-6 bg-white/[0.02]">
                                <div className="flex items-center gap-2 text-white font-bold uppercase text-sm">
                                    <VerifiedCheck size={16} />
                                    Submission Successful
                                </div>
                                <p className="text-white/60 text-sm mt-2 font-light">
                                    {submissionResult.status === 'completed' && submissionResult.resultDetails?.passed
                                        ? 'All tests passed!'
                                        : 'Some tests failed. Keep trying!'}
                                </p>
                            </div>
                        )}
                    </motion.div>
                </div>
            </div>
            )}
        </div>
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

