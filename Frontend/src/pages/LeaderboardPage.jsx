import React, { useState, useEffect, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { AwardMedal, TrendingUp, CodeFile } from '../components/icons/CustomIcons';
import { leaderboardService } from '../services/leaderboard.service';

const languages = [
    { id: null, name: 'All Languages' },
    { id: 'javascript', name: 'JavaScript' },
    { id: 'python', name: 'Python' },
    { id: 'java', name: 'Java' },
    { id: 'go', name: 'Go' },
    { id: 'csharp', name: 'C#' },
];

const LeaderboardPage = () => {
    const [selectedLanguage, setSelectedLanguage] = useState(null);
    const [leaderboard, setLeaderboard] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        loadLeaderboard();
    }, [selectedLanguage]);

    const loadLeaderboard = async () => {
        try {
            setLoading(true);
            const response = await leaderboardService.getLeaderboard(selectedLanguage);
            // API interceptor returns response.data, so response is already { success, data }
            const leaderboardData = response?.data || response || [];
            setLeaderboard(Array.isArray(leaderboardData) ? leaderboardData : []);
        } catch (error) {
            console.error('Failed to load leaderboard:', error);
        } finally {
            setLoading(false);
        }
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
                            Global Ranking
                        </span>
                    </div>
                    <h1 className="text-[clamp(3rem,8vw,6rem)] font-black leading-[0.9] tracking-[-0.02em] text-white mb-6">
                        The Elite Table
                    </h1>
                    <p className="text-white/60 font-light text-lg">
                        Compete with the world's top engineers
                    </p>
                </motion.div>

                {/* Language Filter */}
                <div className="flex flex-wrap gap-2 mb-16">
                    {languages.map((lang) => (
                        <motion.button
                            key={lang.id || 'all'}
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

                {/* Leaderboard Table */}
                {loading ? (
                    <div className="text-center py-20">
                        <div className="inline-block w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    </div>
                ) : (
                    <div className="bg-black border border-white/10 overflow-hidden">
                        <div className="overflow-x-auto">
                            <table className="w-full text-left">
                                <thead>
                                    <tr className="border-b border-white/10 uppercase text-xs font-bold tracking-widest text-white/40">
                                        <th className="px-8 py-6">Rank</th>
                                        <th className="px-8 py-6">Engineer</th>
                                        <th className="px-8 py-6">Language</th>
                                        <th className="px-8 py-6">Days Completed</th>
                                        <th className="px-8 py-6">Score</th>
                                        <th className="px-8 py-6 text-right">Status</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {leaderboard.length === 0 ? (
                                        <tr>
                                            <td colSpan={6} className="px-8 py-12 text-center text-white/40">
                                                No entries yet. Be the first!
                                            </td>
                                        </tr>
                                    ) : (
                                        leaderboard.map((entry, index) => {
                                            const rank = index + 1;
                                            return (
                                                <motion.tr
                                                    key={entry._id || index}
                                                    initial={{ opacity: 0, x: -20 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    transition={{ delay: index * 0.05 }}
                                                    whileHover={{ backgroundColor: 'rgba(255,255,255,0.02)' }}
                                                    className="border-b border-white/5 last:border-0 transition-colors group"
                                                >
                                                    <td className="px-8 py-6">
                                                        <div className="flex items-center gap-3">
                                                            {rank <= 3 && <AwardMedal size={16} className="text-white" />}
                                                            <span className="text-xl font-black tracking-tight text-white">
                                                                #{rank < 10 ? `0${rank}` : rank}
                                                            </span>
                                                        </div>
                                                    </td>
                                                    <td className="px-8 py-6">
                                                        <div className="flex items-center gap-4">
                                                            <div className="w-10 h-10 border border-white/10 flex items-center justify-center font-black text-xs text-white">
                                                                {entry.user?.email?.charAt(0).toUpperCase() || 'U'}
                                                            </div>
                                                            <span className="text-white font-bold tracking-tight">
                                                                {entry.user?.email?.split('@')[0] || 'Anonymous'}
                                                            </span>
                                                        </div>
                                                    </td>
                                                    <td className="px-8 py-6">
                                                        <span className="text-xs font-bold uppercase tracking-widest text-white/60">
                                                            {entry.language?.toUpperCase() || 'N/A'}
                                                        </span>
                                                    </td>
                                                    <td className="px-8 py-6">
                                                        <span className="text-white/80 font-mono font-bold">
                                                            {entry.lastPassedDay || 0} / 30
                                                        </span>
                                                    </td>
                                                    <td className="px-8 py-6">
                                                        <span className="text-white font-mono font-black text-lg">
                                                            {entry.score?.toLocaleString() || '0'}
                                                        </span>
                                                    </td>
                                                    <td className="px-8 py-6 text-right">
                                                        <span className={`text-xs font-bold uppercase tracking-widest ${
                                                            rank === 1 ? 'text-white' : rank <= 10 ? 'text-white/80' : 'text-white/40'
                                                        }`}>
                                                            {rank === 1 ? 'Elite' : rank <= 10 ? 'Verified' : 'Active'}
                                                        </span>
                                                    </td>
                                                </motion.tr>
                                            );
                                        })
                                    )}
                                </tbody>
                            </table>
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default LeaderboardPage;

