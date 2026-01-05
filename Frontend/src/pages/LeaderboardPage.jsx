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
    const [myRank, setMyRank] = useState(null);
    const [offset, setOffset] = useState(0);
    const [hasMore, setHasMore] = useState(true);
    const [isLoadMore, setIsLoadMore] = useState(false);

    const loadLeaderboard = React.useCallback(async (reset = false) => {
        try {
            const currentOffset = reset ? 0 : offset;
            if (reset) {
                setLoading(true);
                setLeaderboard([]);
            } else {
                setIsLoadMore(true);
            }

            const [leaderboardRes, myRankRes] = await Promise.all([
                leaderboardService.getLeaderboard(selectedLanguage, 100, currentOffset),
                reset ? leaderboardService.getMyRank(selectedLanguage) : Promise.resolve(null)
            ]);

            const newEntries = leaderboardRes?.data || [];
            const pagination = leaderboardRes?.pagination || {};

            setLeaderboard(prev => reset ? newEntries : [...prev, ...newEntries]);
            if (myRankRes) setMyRank(myRankRes?.data);

            setHasMore(pagination.hasMore ?? (newEntries.length === 100));
            setOffset(currentOffset + 100);

        } catch (error) {
            console.error('Failed to load leaderboard:', error);
        } finally {
            setLoading(false);
            setIsLoadMore(false);
        }
    }, [selectedLanguage, offset]);

    useEffect(() => {
        setOffset(0);
        loadLeaderboard(true);
    }, [selectedLanguage]);

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
                        <div className="w-1.5 h-1.5 bg-white rounded-none" />
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
                            className={`px-6 py-3 font-bold uppercase tracking-widest text-sm transition-all border ${selectedLanguage === lang.id
                                ? 'bg-white text-black border-white'
                                : 'bg-white/[0.02] text-white/60 border-white/10 hover:border-white/20 hover:text-white'
                                }`}
                        >
                            {lang.name}
                        </motion.button>
                    ))}
                </div>

                {/* Personal Rank Card */}
                {myRank && (
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="mb-16 p-8 bg-white/[0.02] border border-white/10 relative overflow-hidden group"
                    >
                        <div className="absolute top-0 right-0 p-8 opacity-5 group-hover:opacity-10 transition-opacity duration-700">
                            <AwardMedal size={200} />
                        </div>

                        <div className="flex flex-col md:flex-row items-start md:items-end gap-12 relative z-10">
                            <div>
                                <div className="flex items-center gap-3 mb-2">
                                    <div className="w-1.5 h-1.5 bg-green-500 rounded-full animate-pulse" />
                                    <span className="text-xs font-bold uppercase tracking-widest text-white/40">Your Current Rank</span>
                                </div>
                                <h2 className="text-6xl font-black text-white tracking-tighter leading-none">
                                    #{myRank.rank?.toLocaleString() || '-'}
                                </h2>
                            </div>

                            <div className="flex gap-12">
                                <div>
                                    <p className="text-3xl font-bold text-white leading-none mb-2">
                                        {myRank.score?.toLocaleString() || '0'}
                                    </p>
                                    <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Total Score</p>
                                </div>
                                <div>
                                    <p className="text-3xl font-bold text-white leading-none mb-2">
                                        Top {myRank.percentile}%
                                    </p>
                                    <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Percentile</p>
                                </div>
                                <div>
                                    <p className="text-3xl font-bold text-white leading-none mb-2">
                                        {myRank.lastPassedDay}/30
                                    </p>
                                    <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Days Completed</p>
                                </div>
                            </div>
                        </div>
                    </motion.div>
                )}

                {/* Leaderboard Table */}
                {loading && leaderboard.length === 0 ? (
                    <div className="text-center py-20">
                        <div className="inline-block w-8 h-8 border-2 border-white border-t-transparent rounded-full animate-spin" />
                    </div>
                ) : (
                    <div className="bg-black border border-white/10 overflow-hidden mb-20">
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
                                            const rank = index + 1; // Backend sends correctly ranked entries with pagination
                                            // Ideally backend sends 'rank' property, as index is relative to page
                                            // The backend DOES send 'rank' property now
                                            const displayRank = entry.rank || (index + 1);
                                            const isMe = myRank && entry.user?._id === myRank.userId;

                                            return (
                                                <motion.tr
                                                    key={`${entry._id || index}-${displayRank}`}
                                                    initial={{ opacity: 0, x: -20 }}
                                                    animate={{ opacity: 1, x: 0 }}
                                                    transition={{ delay: (index % 100) * 0.01 }}
                                                    className={`border-b border-white/5 last:border-0 transition-colors group ${isMe ? 'bg-white/[0.05] border-l-2 border-l-white' : 'hover:bg-white/[0.02]'
                                                        }`}
                                                >
                                                    <td className="px-8 py-6">
                                                        <div className="flex items-center gap-3">
                                                            {displayRank <= 3 && <AwardMedal size={16} className="text-white" />}
                                                            <span className="text-xl font-black tracking-tight text-white">
                                                                #{displayRank < 10 ? `0${displayRank}` : displayRank}
                                                            </span>
                                                        </div>
                                                    </td>
                                                    <td className="px-8 py-6">
                                                        <div className="flex items-center gap-4">
                                                            <div className={`w-10 h-10 border ${isMe ? 'border-white bg-white text-black' : 'border-white/10 text-white'} flex items-center justify-center font-black text-xs`}>
                                                                {entry.user?.email?.charAt(0).toUpperCase() || 'U'}
                                                            </div>
                                                            <span className={`font-bold tracking-tight ${isMe ? 'text-white underline decoration-white/30 underline-offset-4' : 'text-white'}`}>
                                                                {entry.user?.email?.split('@')[0] || 'Anonymous'}
                                                                {isMe && <span className="ml-2 text-[10px] uppercase tracking-widest text-white/40 font-normal">(You)</span>}
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
                                                        <span className={`text-xs font-bold uppercase tracking-widest ${displayRank === 1 ? 'text-white' :
                                                                displayRank <= 3 ? 'text-white/95' :
                                                                    displayRank <= 10 ? 'text-white/85' :
                                                                        displayRank <= 25 ? 'text-white/70' :
                                                                            displayRank <= 50 ? 'text-white/55' :
                                                                                'text-white/40'
                                                            }`}>
                                                            {displayRank === 1 ? '🏆 Champion' :
                                                                displayRank <= 3 ? '💎 Elite' :
                                                                    displayRank <= 10 ? '⭐ Master' :
                                                                        displayRank <= 25 ? '✓ Verified' :
                                                                            displayRank <= 50 ? '→ Rising' :
                                                                                '• Active'}
                                                        </span>
                                                    </td>
                                                </motion.tr>
                                            );
                                        })
                                    )}
                                </tbody>
                            </table>

                            {/* Pagination / Load More */}
                            {hasMore && (
                                <div className="p-4 border-t border-white/10 flex justify-center">
                                    <button
                                        onClick={() => loadLeaderboard(false)}
                                        disabled={isLoadMore}
                                        className="px-8 py-3 bg-white text-black font-bold uppercase tracking-widest text-xs hover:bg-gray-200 transition-colors disabled:opacity-50"
                                    >
                                        {isLoadMore ? (
                                            <span className="flex items-center gap-2">
                                                <div className="w-3 h-3 border-2 border-black border-t-transparent rounded-full animate-spin" />
                                                Loading...
                                            </span>
                                        ) : 'Load More Engineers'}
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
};

export default LeaderboardPage;

