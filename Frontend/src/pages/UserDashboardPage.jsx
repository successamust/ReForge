import React, { useState, useEffect, useContext, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../components/ui/Button';
import { NeuralCore, PrecisionTarget, EnergyZap, CodeFile, VerifiedCheck } from '../components/icons/CustomIcons';
import { progressService } from '../services/progress.service';
import { AppContext } from '../context/AppContext';

const languages = [
    { id: 'javascript', name: 'JavaScript' },
    { id: 'python', name: 'Python' },
    { id: 'java', name: 'Java' },
    { id: 'go', name: 'Go' },
    { id: 'csharp', name: 'C#' },
];

// Separate component for stat card to properly use hooks
const StatCard = ({ stat }) => {
    const statRef = useRef(null);
    const { scrollYProgress: statProgress } = useScroll({
        target: statRef,
        offset: ["start end", "center start"]
    });
    const statY = useTransform(statProgress, [0, 1], [40, 0]);
    const statOpacity = useTransform(statProgress, [0, 0.5, 1], [0, 1, 1]);

    return (
        <motion.div
            ref={statRef}
            style={{ y: statY, opacity: statOpacity, position: 'relative' }}
            className="bg-black p-8 border border-white/10"
        >
            <div className="flex items-center gap-4">
                <div className="w-12 h-12 border border-white/10 flex items-center justify-center">
                    <stat.icon size={20} className="text-white" />
                </div>
                <div>
                    <p className="text-xs font-bold uppercase text-white/40 tracking-widest mb-1">{stat.label}</p>
                    <p className="text-3xl font-black text-white">{stat.value}</p>
                </div>
            </div>
        </motion.div>
    );
};

// Separate component for language progress card to properly use hooks
const LanguageProgressCard = ({ lang, prog, i }) => {
    const navigate = useNavigate();

    const getProgressPercentage = (prog) => {
        if (!prog || prog.currentDay === 0) return 0;
        return Math.round((prog.lastPassedDay / 30) * 100);
    };

    const percentage = getProgressPercentage(prog);
    const currentDay = prog?.currentDay || 0;
    const isActive = currentDay > 0;

    const cardRef = useRef(null);
    const { scrollYProgress: cardProgress } = useScroll({
        target: cardRef,
        offset: ["start end", "center start"]
    });
    const cardY = useTransform(cardProgress, [0, 1], [60, 0]);
    const cardOpacity = useTransform(cardProgress, [0, 0.5, 1], [0, 1, 1]);
    const cardScale = useTransform(cardProgress, [0, 1], [0.96, 1]);

    return (
        <motion.div
            ref={cardRef}
            style={{ y: cardY, opacity: cardOpacity, scale: cardScale, position: 'relative' }}
            className="bg-black p-8 border border-white/10 group hover:bg-white/[0.02] transition-all"
        >
            <Link to={`/lessons/${lang.id}`}>
                <div className="flex items-center justify-between mb-6">
                    <div className="w-12 h-12 border border-white/10 flex items-center justify-center">
                        <CodeFile size={20} className="text-white" />
                    </div>
                    <span className={`text-xs font-bold uppercase tracking-widest ${isActive ? 'text-white' : 'text-white/30'
                        }`}>
                        {isActive ? 'Active' : 'Not Started'}
                    </span>
                </div>

                <h3 className="text-2xl font-black text-white mb-6 tracking-tight">
                    {lang.name}
                </h3>

                <div className="space-y-4 mb-6">
                    <div className="flex justify-between text-sm">
                        <span className="text-white/60 font-light">Progress</span>
                        <span className="text-white font-black">{percentage}%</span>
                    </div>
                    <div className="w-full h-px bg-white/5 overflow-hidden">
                        <motion.div
                            className="h-full bg-white"
                            initial={{ width: 0 }}
                            whileInView={{ width: `${percentage}%` }}
                            viewport={{ once: true }}
                            transition={{ duration: 1, delay: i * 0.1 }}
                        />
                    </div>
                    <div className="flex justify-between text-xs text-white/40 font-bold uppercase tracking-widest">
                        <span>Day {currentDay || 0} / 30</span>
                        <span>{prog?.lastPassedDay || 0} Completed</span>
                    </div>
                </div>

                {isActive && (
                    <Button
                        variant="ghost"
                        size="sm"
                        className="w-full"
                        onClick={(e) => {
                            e.preventDefault();
                            navigate(`/lessons/${lang.id}/${currentDay}`);
                        }}
                    >
                        Continue Learning
                    </Button>
                )}
            </Link>
        </motion.div>
    );
};

const UserDashboardPage = () => {
    const navigate = useNavigate();
    const { user, isAuthenticated } = useContext(AppContext);
    const [progress, setProgress] = useState([]);
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState({
        totalDays: 0,
        completedDays: 0,
        currentStreak: 0,
        languagesActive: 0
    });

    useEffect(() => {
        if (!isAuthenticated) {
            navigate('/login');
            return;
        }
        loadProgress();
    }, [isAuthenticated, navigate]);

    const loadProgress = async () => {
        try {
            setLoading(true);
            const response = await progressService.getAllProgress();
            // API interceptor returns response.data, so response is already { success, data }
            const progressData = response?.data || response || [];
            const progressArray = Array.isArray(progressData) ? progressData : [];
            setProgress(progressArray);

            // Calculate stats using the array version
            const totalDays = progressArray.reduce((sum, p) => sum + (p.currentDay || 0), 0);
            const completedDays = progressArray.reduce((sum, p) => sum + (p.lastPassedDay || 0), 0);
            const languagesActive = progressArray.filter(p => p.currentDay > 0).length;

            setStats({
                totalDays,
                completedDays,
                currentStreak: 0, // Streak tracking to be implemented
                languagesActive
            });
        } catch (error) {
            console.error('Failed to load progress:', error);
            setProgress([]);
            setStats({
                totalDays: 0,
                completedDays: 0,
                currentStreak: 0,
                languagesActive: 0
            });
        } finally {
            setLoading(false);
        }
    };

    // Hooks must be called at the top level, before any conditional returns
    const ref = useRef(null);
    // Always use the same scroll configuration to maintain hook order
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    });

    // Always call useTransform hooks unconditionally
    const headerY = useTransform(scrollYProgress, [0, 1], [50, -50]);
    const headerOpacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

    return (
        <div ref={ref} className="relative min-h-screen bg-black py-40 px-6">
            {loading ? (
                <div className="flex items-center justify-center min-h-[60vh]">
                    <div className="w-12 h-12 border-2 border-white border-t-transparent rounded-full animate-spin" />
                </div>
            ) : (
                <div className="container mx-auto max-w-7xl">
                    <motion.div
                        style={{
                            y: headerY,
                            opacity: headerOpacity
                        }}
                        className="mb-16"
                    >
                        <div className="inline-flex items-center gap-3 px-4 py-2 border border-white/10 bg-white/[0.02] mb-8">
                            <div className="w-1.5 h-1.5 bg-white rounded-full" />
                            <span className="text-[10px] font-mono text-white/60 tracking-[0.3em] uppercase">
                                Dashboard
                            </span>
                        </div>
                        <h1 className="text-[clamp(3rem,8vw,6rem)] font-black leading-[0.9] tracking-[-0.02em] text-white mb-6">
                            Welcome back, {user?.firstName || 'User'}
                        </h1>
                        <p className="text-white/60 font-light text-lg">
                            Track your progress across all languages
                        </p>
                    </motion.div>

                    {/* Stats Grid */}
                    <div className="grid grid-cols-1 md:grid-cols-4 gap-px bg-white/5 mb-16">
                        {[
                            { icon: PrecisionTarget, label: 'Total Days', value: stats.totalDays },
                            { icon: VerifiedCheck, label: 'Completed', value: stats.completedDays },
                            { icon: EnergyZap, label: 'Streak', value: stats.currentStreak },
                            { icon: CodeFile, label: 'Languages', value: stats.languagesActive },
                        ].map((stat, i) => (
                            <StatCard key={i} stat={stat} i={i} />
                        ))}
                    </div>

                    {/* Language Progress Cards */}
                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-px bg-white/5">
                        {languages.map((lang) => {
                            const prog = progress.find(p => p.language === lang.id);
                            return (
                                <LanguageProgressCard
                                    key={lang.id}
                                    lang={lang}
                                    prog={prog}
                                />
                            );
                        })}
                    </div>

                    {/* Achievements Section */}
                    <div className="mt-16">
                        <h2 className="text-2xl font-black text-white mb-8 border-b border-white/10 pb-4">
                            Achievements
                        </h2>
                        <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
                            <div className="bg-black p-6 border border-white/10 opacity-50">
                                <div className="mb-4 text-white/40">🔒</div>
                                <h4 className="text-white font-bold text-sm mb-1">First Steps</h4>
                                <p className="text-white/40 text-xs">Complete your first lesson</p>
                            </div>
                            <div className="bg-black p-6 border border-white/10 opacity-50">
                                <div className="mb-4 text-white/40">🔒</div>
                                <h4 className="text-white font-bold text-sm mb-1">Week Streak</h4>
                                <p className="text-white/40 text-xs">Maintain a 7-day streak</p>
                            </div>
                            <div className="bg-black p-6 border border-white/10 opacity-50">
                                <div className="mb-4 text-white/40">🔒</div>
                                <h4 className="text-white font-bold text-sm mb-1">Polyglot</h4>
                                <p className="text-white/40 text-xs">Start 3 different languages</p>
                            </div>
                            <div className="bg-black p-6 border border-white/10 opacity-50">
                                <div className="mb-4 text-white/40">🔒</div>
                                <h4 className="text-white font-bold text-sm mb-1">Mastery</h4>
                                <p className="text-white/40 text-xs">Complete a 30-day challenge</p>
                            </div>
                        </div>
                    </div>

                    {/* Certificates Section */}
                    <div className="mt-16 mb-24">
                        <h2 className="text-2xl font-black text-white mb-8 border-b border-white/10 pb-4">
                            Certificates
                        </h2>
                        {progress.some(p => p.lastPassedDay === 30) ? (
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                {progress.filter(p => p.lastPassedDay === 30).map(p => (
                                    <div key={p.language} className="bg-white/5 border border-white/10 p-8 flex items-center justify-between">
                                        <div>
                                            <h3 className="text-white font-bold text-lg mb-1">
                                                {languages.find(l => l.id === p.language)?.name} Mastery
                                            </h3>
                                            <p className="text-white/60 text-sm">Completed on {new Date(p.completedAt).toLocaleDateString()}</p>
                                        </div>
                                        <Button size="sm" onClick={() => progressService.generateCertificate(p.language)}>
                                            Download PDF
                                        </Button>
                                    </div>
                                ))}
                            </div>
                        ) : (
                            <div className="bg-white/[0.02] border border-white/10 p-8 text-center">
                                <p className="text-white/40">Complete a 30-day challenge to earn your completion certificate.</p>
                            </div>
                        )}
                    </div>
                </div>
            )}
        </div>
    );
};

export default UserDashboardPage;

