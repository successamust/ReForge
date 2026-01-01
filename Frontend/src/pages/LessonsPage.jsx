import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useParams, Link } from 'react-router-dom';
import { CodeFile, SecureLock, VerifiedCheck, RunPlay } from '../components/icons/CustomIcons';
import { lessonService } from '../services/lesson.service';
import { progressService } from '../services/progress.service';

const languages = [
    { id: 'javascript', name: 'JavaScript' },
    { id: 'python', name: 'Python' },
    { id: 'java', name: 'Java' },
    { id: 'go', name: 'Go' },
    { id: 'csharp', name: 'C#' },
];

// Separate component for lesson card to properly use hooks
const LessonCard = ({ day, lesson, status, selectedLanguage }) => {
    const cardRef = useRef(null);
    const { scrollYProgress: cardProgress } = useScroll({
        target: cardRef,
        offset: ["start end", "center start"]
    });
    const cardY = useTransform(cardProgress, [0, 1], [40, 0]);
    const cardOpacity = useTransform(cardProgress, [0, 0.5, 1], [0, 1, 1]);

    const isActive = status === 'active';
    const isCompleted = status === 'completed';
    const isLocked = status === 'locked';

    return (
        <motion.div
            ref={cardRef}
            style={{ y: cardY, opacity: cardOpacity, position: 'relative' }}
            className={`bg-black p-6 border border-white/10 h-32 flex flex-col justify-between transition-all ${
                isLocked ? 'opacity-30' : 'hover:bg-white/[0.02]'
            }`}
        >
            <Link
                to={`/lessons/${selectedLanguage}/${day}`}
                className={`block h-full flex flex-col justify-between ${isLocked ? 'pointer-events-none cursor-not-allowed' : 'cursor-pointer'}`}
            >
                <div className="flex justify-between items-start">
                    <span className={`text-xs font-black tracking-tight ${
                        isActive ? 'text-white' : isCompleted ? 'text-white' : 'text-white/30'
                    }`}>
                        D{day < 10 ? `0${day}` : day}
                    </span>
                    {isCompleted ? (
                        <VerifiedCheck size={14} className="text-white" />
                    ) : isActive ? (
                        <RunPlay size={14} className="text-white" />
                    ) : (
                        <SecureLock size={14} className="text-white/20" />
                    )}
                </div>

                <div>
                    <div className="w-full h-px bg-white/5 mb-2">
                        <motion.div
                            className={`h-full ${
                                isCompleted ? 'bg-white' : isActive ? 'bg-white' : 'bg-transparent'
                            }`}
                            initial={{ width: 0 }}
                            whileInView={{
                                width: isCompleted ? '100%' : isActive ? '50%' : '0%'
                            }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                        />
                    </div>
                    <p className={`text-[10px] font-bold uppercase truncate ${
                        isActive || isCompleted ? 'text-white' : 'text-white/30'
                    }`}>
                        {lesson?.title || `Day ${day}`}
                    </p>
                </div>
            </Link>
        </motion.div>
    );
};

const LessonsPage = () => {
    const { language: urlLanguage } = useParams();
    const [selectedLanguage, setSelectedLanguage] = useState(urlLanguage || 'javascript');
    const [lessons, setLessons] = useState([]);
    const [progress, setProgress] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadLessons();
        loadProgress();
    }, [selectedLanguage]);

    const loadLessons = async () => {
        try {
            setLoading(true);
            const response = await lessonService.getLessonsByLanguage(selectedLanguage);
            // API interceptor returns response.data, so response is already { success, data }
            const lessonsData = response?.data || response || [];
            setLessons(Array.isArray(lessonsData) ? lessonsData : []);
        } catch (error) {
            console.error('Failed to load lessons:', error);
        } finally {
            setLoading(false);
        }
    };

    const loadProgress = async () => {
        try {
            const response = await progressService.getProgressByLanguage(selectedLanguage);
            // API interceptor returns response.data, so response is already { success, data }
            // The progress object is nested: { success: true, data: { progress: {...} } }
            const progressData = response?.data?.progress || response?.progress || response?.data || response;
            setProgress(progressData);
        } catch (error) {
            // User might not be authenticated or progress doesn't exist yet
            // Day 1 will be unlocked by getLessonStatus logic
            setProgress(null);
        }
    };

    const getLessonStatus = (day) => {
        // If no progress exists, day 1 should be active (unlocked) for new users
        if (!progress) {
            return day === 1 ? 'active' : 'locked';
        }
        if (day < progress.currentDay) return 'completed';
        if (day === progress.currentDay) return 'active';
        return 'locked';
    };

    const getCurrentDay = () => {
        return progress?.currentDay || 1;
    };

    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    });

    return (
        <div ref={ref} className="relative min-h-screen bg-black py-40 px-6">
            <div className="container mx-auto max-w-7xl">
                <motion.div
                    style={{
                        y: useTransform(scrollYProgress, [0, 1], [50, -50]),
                        opacity: useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0])
                    }}
                    className="mb-16"
                >
                    <div className="inline-flex items-center gap-3 px-4 py-2 border border-white/10 bg-white/[0.02] mb-8">
                        <div className="w-1.5 h-1.5 bg-white rounded-full" />
                        <span className="text-[10px] font-mono text-white/60 tracking-[0.3em] uppercase">
                            Curriculum
                        </span>
                    </div>
                    <h1 className="text-[clamp(3rem,8vw,6rem)] font-black leading-[0.9] tracking-[-0.02em] text-white mb-6">
                        Choose Your Language
                    </h1>
                    <p className="text-white/60 font-light text-lg max-w-2xl">
                        Master one language at a time. Complete 30 days to unlock the next challenge.
                    </p>
                </motion.div>

                {/* Language Selector */}
                <div className="flex flex-wrap gap-2 mb-16">
                    {languages.map((lang) => (
                        <motion.button
                            key={lang.id}
                            whileHover={{ scale: 1.02 }}
                            whileTap={{ scale: 0.98 }}
                            onClick={() => setSelectedLanguage(lang.id)}
                            className={`px-6 py-3 font-bold uppercase tracking-widest text-sm transition-all border ${
                                selectedLanguage === lang.id
                                    ? 'bg-white text-black border-white'
                                    : 'bg-white/[0.02] text-white/60 border-white/10 hover:border-white/20 hover:text-white'
                            }`}
                        >
                            {lang.name}
                        </motion.button>
                    ))}
                </div>

                {/* Lessons Grid */}
                {loading ? (
                    <div className="text-center py-20">
                        <div className="inline-block w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    </div>
                ) : (
                    <div className="grid grid-cols-2 md:grid-cols-5 lg:grid-cols-6 gap-px bg-white/5">
                        {Array.from({ length: 30 }, (_, i) => {
                            const day = i + 1;
                            const lesson = lessons.find(l => l.day === day);
                            const status = getLessonStatus(day);

                            return (
                                <LessonCard
                                    key={day}
                                    day={day}
                                    lesson={lesson}
                                    status={status}
                                    selectedLanguage={selectedLanguage}
                                />
                            );
                        })}
                    </div>
                )}
            </div>
        </div>
    );
};

export default LessonsPage;

