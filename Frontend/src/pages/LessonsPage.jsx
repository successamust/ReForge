import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useParams, Link, useNavigate } from 'react-router-dom';
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
const LessonCard = ({ day, lesson, status, selectedLanguage, heatmapEntry }) => {
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
            className={`bg-black p-6 border border-white/10 h-32 flex flex-col justify-between transition-all ${isLocked ? 'opacity-30' : 'hover:bg-white/[0.02]'
                }`}
        >
            <Link
                to={`/lessons/${selectedLanguage}/${day}`}
                className={`block h-full flex flex-col justify-between ${isLocked ? 'pointer-events-none cursor-not-allowed' : 'cursor-pointer'}`}
            >
                <div className="flex justify-between items-start">
                    <span className={`text-xs font-black tracking-tight ${isActive ? 'text-white' : isCompleted ? 'text-white' : 'text-white/30'
                        }`}>
                        D{day < 10 ? `0${day}` : day}
                    </span>
                    {isCompleted ? (
                        <VerifiedCheck size={14} className="text-white" />
                    ) : isActive ? (
                        <RunPlay size={14} className="text-white" />
                    ) : (
                        <div className="flex flex-col items-end gap-1">
                            <div className="flex gap-0.5">
                                {[1, 2, 3].map(bit => (
                                    <div
                                        key={bit}
                                        className={`w-1.5 h-1.5 ${heatmapEntry && heatmapEntry.rate > (bit * 25) ? 'bg-white/40' : 'bg-white/5'
                                            }`}
                                    />
                                ))}
                            </div>
                            <span className="text-[8px] font-bold text-white/20 uppercase tracking-tighter">Density</span>
                        </div>
                    )}
                </div>

                <div>
                    <div className="w-full h-px bg-white/5 mb-2">
                        <motion.div
                            className={`h-full ${isCompleted ? 'bg-white' : isActive ? 'bg-white' : 'bg-transparent'
                                }`}
                            initial={{ width: 0 }}
                            whileInView={{
                                width: isCompleted ? '100%' : isActive ? '50%' : '0%'
                            }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5 }}
                        />
                    </div>
                    <p className={`text-[10px] font-bold uppercase truncate ${isActive || isCompleted ? 'text-white' : 'text-white/30'
                        }`}>
                        {lesson?.title || `Day ${day}`}
                    </p>
                </div>
            </Link>
        </motion.div>
    );
};

// Separate component for Course Card (Selection View)
const CourseCard = ({ lang, prog }) => {
    const navigate = useNavigate();
    const currentDay = prog?.currentDay || 0;
    const isActive = currentDay > 0;
    const percentage = prog ? Math.round((prog.lastPassedDay / 30) * 100) : 0;

    const cardRef = useRef(null);
    const { scrollYProgress: cardProgress } = useScroll({
        target: cardRef,
        offset: ["start end", "center start"]
    });
    const cardY = useTransform(cardProgress, [0, 1], [60, 0]);
    const cardOpacity = useTransform(cardProgress, [0, 0.5, 1], [0, 1, 1]);

    return (
        <motion.div
            ref={cardRef}
            style={{ y: cardY, opacity: cardOpacity }}
            className="bg-black p-10 border border-white/10 group hover:border-white/30 transition-all cursor-pointer relative overflow-hidden"
            onClick={() => navigate(`/lessons/${lang.id}`)}
        >
            {/* Ambient Background Glow */}
            <div className="absolute top-0 right-0 w-32 h-32 bg-white/5 blur-[80px] -mr-16 -mt-16 group-hover:bg-white/10 transition-colors" />

            <div className="flex items-center justify-between mb-8">
                <div className="w-14 h-14 border border-white/10 flex items-center justify-center bg-white/[0.02]">
                    <CodeFile size={24} className="text-white" />
                </div>
                <div className="text-right">
                    <span className={`text-[10px] font-black uppercase tracking-widest ${isActive ? 'text-white' : 'text-white/20'}`}>
                        {isActive ? 'Active Mission' : 'Not Started'}
                    </span>
                </div>
            </div>

            <h3 className="text-3xl font-black text-white mb-8 tracking-tight group-hover:translate-x-1 transition-transform">
                {lang.name}
            </h3>

            <div className="space-y-6">
                <div>
                    <div className="flex justify-between text-[10px] font-bold uppercase tracking-[0.2em] mb-3">
                        <span className="text-white/40">Neural Progress</span>
                        <span className="text-white">{percentage}%</span>
                    </div>
                    <div className="w-full h-px bg-white/5 relative">
                        <motion.div
                            className="absolute inset-0 bg-white"
                            initial={{ width: 0 }}
                            animate={{ width: `${percentage}%` }}
                            transition={{ duration: 1, ease: "easeOut" }}
                        />
                    </div>
                </div>

                <div className="flex justify-between items-center pt-2">
                    <div className="text-[10px] font-black uppercase tracking-widest text-white/40">
                        {isActive ? `Day ${currentDay} / 30` : '30-Day Protocol'}
                    </div>
                    <div className="px-4 py-2 border border-white/10 group-hover:border-white/40 group-hover:bg-white/5 transition-all">
                        <span className="text-[10px] font-black uppercase tracking-[0.2em] text-white">
                            {isActive ? 'Continue' : 'Initiate'}
                        </span>
                    </div>
                </div>
            </div>
        </motion.div>
    );
};

const LessonsPage = () => {
    const navigate = useNavigate();
    const { language: urlLanguage } = useParams();
    const isOverview = !urlLanguage;

    const [selectedLanguage, setSelectedLanguage] = useState(urlLanguage || 'javascript');
    const [lessons, setLessons] = useState([]);
    const [progress, setProgress] = useState(null); // Single language progress
    const [allProgress, setAllProgress] = useState([]); // All languages progress for overview
    const [heatmapData, setHeatmapData] = useState([]);
    const [loading, setLoading] = useState(true);

    const loadLessons = React.useCallback(async (lang) => {
        try {
            setLoading(true);
            const response = await lessonService.getLessonsByLanguage(lang);
            const lessonsArray = response?.data?.lessons || response?.lessons || [];
            setLessons(Array.isArray(lessonsArray) ? lessonsArray : []);
        } catch {
            setLessons([]);
        } finally {
            setLoading(false);
        }
    }, []);

    const loadLanguageData = React.useCallback(async (lang) => {
        try {
            setLoading(true);
            const [lessonsRes, progressRes] = await Promise.all([
                lessonService.getLessonsByLanguage(lang),
                progressService.getProgressByLanguage(lang)
            ]);

            const lessonsArray = lessonsRes?.data?.lessons || lessonsRes?.lessons || [];
            setLessons(Array.isArray(lessonsArray) ? lessonsArray : []);

            const pData = progressRes?.data?.progress || progressRes?.progress || progressRes?.data || progressRes;
            setProgress(pData);

            // Load heatmap data too
            const statsRes = await lessonService.getGlobalStats().catch(() => ({ data: { heatmap: [] } }));
            setHeatmapData(statsRes?.data?.heatmap || []);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    }, []);

    const loadOverviewData = React.useCallback(async () => {
        try {
            setLoading(true);
            const response = await progressService.getAllProgress();
            const pData = response?.data?.progress || response?.progress || response;
            setAllProgress(Array.isArray(pData) ? pData : []);
        } catch (err) {
            console.error(err);
        } finally {
            setLoading(false);
        }
    }, []);

    useEffect(() => {
        if (isOverview) {
            loadOverviewData();
        } else {
            loadLanguageData(urlLanguage);
        }
    }, [isOverview, urlLanguage, loadOverviewData, loadLanguageData]);

    const getLessonStatus = (day) => {
        if (!progress || progress.notStarted) {
            return day === 1 ? 'active' : 'locked';
        }
        if (day < progress.currentDay) return 'completed';
        if (day === progress.currentDay) return 'active';
        return 'locked';
    };

    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    });

    const headerY = useTransform(scrollYProgress, [0, 1], [50, -50]);
    const headerOpacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

    return (
        <div ref={ref} className="relative min-h-screen bg-black py-40 px-6">
            <div className="container mx-auto max-w-7xl">
                <motion.div
                    style={{ y: headerY, opacity: headerOpacity }}
                    className="mb-16"
                >
                    <div className="inline-flex items-center gap-3 px-4 py-2 border border-white/10 bg-white/[0.02] mb-8">
                        <div className="w-1.5 h-1.5 bg-white rounded-full" />
                        <span className="text-[10px] font-mono text-white/60 tracking-[0.3em] uppercase">
                            {isOverview ? 'Selection' : 'Curriculum'}
                        </span>
                    </div>
                    <h1 className="text-[clamp(3rem,8vw,6rem)] font-black leading-[0.9] tracking-[-0.02em] text-white mb-6">
                        {isOverview ? 'Choose Your Track' : languages.find(l => l.id === urlLanguage)?.name || 'Language'}
                    </h1>
                    <p className="text-white/60 font-light text-lg max-w-2xl">
                        {isOverview
                            ? "Select a specialized path to rebuild your engineering intuition. Each track is a 30-day manual coding challenge."
                            : "Master the protocol one day at a time. Complete the daily manual exercise to unlock the next level."}
                    </p>
                    {!isOverview && (
                        <motion.button
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            onClick={() => navigate('/lessons')}
                            className="mt-8 text-[10px] font-black uppercase tracking-[0.3em] text-white/40 hover:text-white transition-colors"
                        >
                            ← Back to selection
                        </motion.button>
                    )}
                </motion.div>

                {loading ? (
                    <div className="text-center py-40">
                        <div className="inline-block w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    </div>
                ) : isOverview ? (
                    /* Overview Selection Grid */
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/5">
                        {languages.map((lang) => {
                            const prog = allProgress.find(p => p.language === lang.id);
                            return <CourseCard key={lang.id} lang={lang} prog={prog} />;
                        })}
                    </div>
                ) : (
                    /* Individual Language Curriculum Grid */
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
                                    selectedLanguage={urlLanguage}
                                    heatmapEntry={heatmapData.find(h => h.language === urlLanguage && h.day === day)}
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

