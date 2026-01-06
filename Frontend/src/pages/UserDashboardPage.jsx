import React, { useState, useEffect, useContext, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link, useNavigate } from 'react-router-dom';
import Button from '../components/ui/Button';
import { NeuralCore, PrecisionTarget, EnergyZap, CodeFile, VerifiedCheck, AchievementTrophy } from '../components/icons/CustomIcons';
import { progressService } from '../services/progress.service';
import { AppContext } from '../context/AppContext';
import AchievementBadge from '../components/AchievementBadge';
import RelapseOverlay from '../components/ui/RelapseOverlay';
import DetoxModal from '../components/ui/DetoxModal';

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

                <div className="space-y-4 mb-8">
                    <div className="flex justify-between text-sm">
                        <span className="text-white/60 font-light">Progress</span>
                        <span className={`text-white font-black ${!isActive && 'opacity-20'}`}>{percentage}%</span>
                    </div>
                    <div className="w-full h-px bg-white/5 overflow-hidden">
                        <motion.div
                            className="h-full bg-white"
                            initial={{ width: 0 }}
                            animate={{ width: `${percentage}%` }}
                            transition={{ duration: 1, delay: i * 0.1 }}
                        />
                    </div>
                    {isActive ? (
                        <div className="flex justify-between text-xs text-white/40 font-bold uppercase tracking-widest">
                            <span>Day {currentDay} / 30</span>
                            <div className="flex items-center gap-2">
                                <AchievementTrophy size={10} className="text-white/40" />
                                <span>{prog?.points || 0} PTS</span>
                            </div>
                        </div>
                    ) : (
                        <div className="text-xs text-white/20 font-bold uppercase tracking-widest text-center">
                            30 Days of Intense Reforging
                        </div>
                    )}
                </div>

                {!isActive ? (
                    <Button
                        variant="outline"
                        size="md"
                        className="w-full border-white/10 hover:border-white/40 hover:bg-white/5 group-hover:scale-[1.02] transition-all"
                        onClick={(e) => {
                            e.preventDefault();
                            navigate(`/lessons/${lang.id}/1`);
                        }}
                    >
                        Start {lang.name} Track
                    </Button>
                ) : (
                    <Button
                        variant="ghost"
                        size="md"
                        className="w-full border border-white/5 bg-white/5 hover:bg-white/10"
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

    const [achievements, setAchievements] = useState([]);
    const [progress, setProgress] = useState([]);
    const [loading, setLoading] = useState(true);
    const [stats, setStats] = useState({
        totalDays: 0,
        completedDays: 0,
        currentStreak: 0,
        languagesActive: 0,
        totalArenaWins: 0
    });
    const [isDetoxOpen, setIsDetoxOpen] = useState(false);

    // Check for relapse state
    const isRelapsed = user?.status === 'relapsed';

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
            const [progressResponse, statsResponse, achievementsResponse] = await Promise.all([
                progressService.getAllProgress(),
                progressService.getStats().catch(() => ({ data: { stats: {} } })),
                progressService.getAchievements().catch(() => ({ data: { data: [] } }))
            ]);

            // API interceptor returns response.data, so response is already { success, data }
            // Backend returns { success: true, data: { progress } }
            const progressData = progressResponse?.data?.progress || progressResponse?.progress || [];
            const progressArray = Array.isArray(progressData) ? progressData : [];
            // Backend returns { success: true, data: { stats } }
            const statsData = statsResponse?.data?.stats || {};
            // Backend returns { success: true, data: { achievements: [...] } }
            const achievementsData = achievementsResponse?.data?.achievements || [];

            setProgress(progressArray);
            setAchievements(Array.isArray(achievementsData) ? achievementsData : []);

            // Calculate stats using the array version
            const totalDays = progressArray.reduce((sum, p) => sum + (p.currentDay || 0), 0);
            const completedDays = progressArray.reduce((sum, p) => sum + (p.lastPassedDay || 0), 0);
            const languagesActive = progressArray.filter(p => p.currentDay > 0).length;

            setStats({
                totalDays,
                completedDays,
                currentStreak: statsData.streak || 0,
                languagesActive,
                accuracy: statsData.accuracy || 0,
                totalSubmissions: statsData.totalSubmissions || 0,
                totalPoints: statsData.totalPoints || 0,
                totalArenaWins: statsData.totalArenaWins || 0
            });
        } catch (error) {
            console.error('Failed to load progress:', error);
            setProgress([]);
            setAchievements([]);
            setStats({
                totalDays: 0,
                completedDays: 0,
                currentStreak: 0,
                languagesActive: 0,
                accuracy: 0
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

    const ACHIEVEMENT_GROUPS = [
        {
            title: "General & Performance",
            items: [
                { type: 'FIRST_BLOOD', label: 'First Blood', description: 'Complete your first lesson', icon: '⚔️' },
                { type: 'SPEED_DEMON', label: 'Speed Demon', description: 'Complete a lesson in < 5 mins', icon: '⚡' },
                { type: 'SHARPSHOOTER', label: 'Sharpshooter', description: 'Complete a lesson on first try', icon: '🎯' },
                { type: 'POLYGLOT', label: 'Polyglot', description: 'Start 3 different languages', icon: '🌐' },
                { type: 'STREAK_7', label: 'Week Warrior', description: 'Maintain a 7-day streak', icon: '🔥' },
                { type: 'STREAK_30', label: 'Monthly Master', description: 'Maintain a 30-day streak', icon: '📅' },
                { type: 'POINTS_100', label: 'Centurion', description: 'Earn 100 total points', icon: '💯' },
                { type: 'POINTS_1000', label: 'Kilo-Crusher', description: 'Earn 1,000 total points', icon: '🚀' },
                { type: 'ALL_COMPLETE', label: 'The Reforged', description: 'Master ALL 5 languages (Day 30)', icon: '👑' },
            ]
        },
        {
            title: "JavaScript Mastery",
            items: [
                { type: 'JAVASCRIPT_INITIATE', label: 'JS Initiate', description: 'Complete JavaScript Day 1', icon: '🟨' },
                { type: 'JAVASCRIPT_7', label: 'JS Scholar', description: 'Complete JavaScript Day 7', icon: '📜' },
                { type: 'JAVASCRIPT_15', label: 'JS Expert', description: 'Complete JavaScript Day 15', icon: '🧠' },
                { type: 'JAVASCRIPT_30', label: 'JS Master', description: 'Complete JavaScript Day 30', icon: '⚔️' },
            ]
        },
        {
            title: "Python Mastery",
            items: [
                { type: 'PYTHON_INITIATE', label: 'Python Initiate', description: 'Complete Python Day 1', icon: '🐍' },
                { type: 'PYTHON_7', label: 'Python Scholar', description: 'Complete Python Day 7', icon: '📜' },
                { type: 'PYTHON_15', label: 'Python Expert', description: 'Complete Python Day 15', icon: '🧠' },
                { type: 'PYTHON_30', label: 'Python Master', description: 'Complete Python Day 30', icon: '⚔️' },
            ]
        },
        {
            title: "Java Mastery",
            items: [
                { type: 'JAVA_INITIATE', label: 'Java Initiate', description: 'Complete Java Day 1', icon: '☕' },
                { type: 'JAVA_7', label: 'Java Scholar', description: 'Complete Java Day 7', icon: '📜' },
                { type: 'JAVA_15', label: 'Java Expert', description: 'Complete Java Day 15', icon: '🧠' },
                { type: 'JAVA_30', label: 'Java Master', description: 'Complete Java Day 30', icon: '⚔️' },
            ]
        },
        {
            title: "Go Mastery",
            items: [
                { type: 'GO_INITIATE', label: 'Go Initiate', description: 'Complete Go Day 1', icon: '🐹' },
                { type: 'GO_7', label: 'Go Scholar', description: 'Complete Go Day 7', icon: '📜' },
                { type: 'GO_15', label: 'Go Expert', description: 'Complete Go Day 15', icon: '🧠' },
                { type: 'GO_30', label: 'Go Master', description: 'Complete Go Day 30', icon: '⚔️' },
            ]
        },
        {
            title: "C# Mastery",
            items: [
                { type: 'CSHARP_INITIATE', label: 'C# Initiate', description: 'Complete C# Day 1', icon: '#️⃣' },
                { type: 'CSHARP_7', label: 'C# Scholar', description: 'Complete C# Day 7', icon: '📜' },
                { type: 'CSHARP_15', label: 'C# Expert', description: 'Complete C# Day 15', icon: '🧠' },
                { type: 'CSHARP_30', label: 'C# Master', description: 'Complete C# Day 30', icon: '⚔️' },
            ]
        }
    ];

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
                    <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-px bg-white/5 mb-16">
                        {[
                            { icon: AchievementTrophy, label: 'Total Points', value: stats.totalPoints },
                            { icon: EnergyZap, label: 'Streak', value: stats.currentStreak },
                            { icon: PrecisionTarget, label: 'Accuracy', value: `${stats.accuracy || 0}%` },
                            { icon: VerifiedCheck, label: 'Completed', value: stats.completedDays },
                            { icon: CodeFile, label: 'Languages', value: stats.languagesActive },
                            { icon: NeuralCore, label: 'Arena Breaches', value: stats.totalArenaWins },
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
                        <div className="space-y-12">
                            {ACHIEVEMENT_GROUPS.map((group, groupIndex) => (
                                <div key={groupIndex}>
                                    <h3 className="text-white/60 font-bold uppercase tracking-widest text-sm mb-6 flex items-center gap-3">
                                        <div className="w-1 h-1 bg-white rounded-full"></div>
                                        {group.title}
                                    </h3>
                                    <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                                        {group.items.map((type) => {
                                            const isUnlocked = achievements.some(a => a.type === type.type);
                                            return (
                                                <div key={type.type} className="flex justify-center">
                                                    <AchievementBadge
                                                        type={type.type}
                                                        size="lg"
                                                        locked={!isUnlocked}
                                                        showLabel={true}
                                                    />
                                                </div>
                                            );
                                        })}
                                    </div>
                                </div>
                            ))}
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

            {/* Relapse Mechanics */}
            {
                !loading && isRelapsed && !isDetoxOpen && (
                    <RelapseOverlay
                        user={user}
                        onStartDetox={() => setIsDetoxOpen(true)}
                    />
                )
            }

            <DetoxModal
                isOpen={isDetoxOpen}
                onClose={() => setIsDetoxOpen(false)}
                requiredDrills={user?.detoxRequired || 5}
                onComplete={() => {
                    // Refresh data after successful detox
                    loadProgress();
                    // Ideally we'd also force refresh the user context here to update status
                    window.location.reload(); // Hard refresh to ensure sync for now
                }}
            />
        </div >
    );
};

export default UserDashboardPage;
