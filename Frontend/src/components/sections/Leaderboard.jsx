import React from 'react';
import { motion } from 'framer-motion';
import GlassContainer from '../ui/GlassContainer';
import Badge from '../ui/Badge';
import { TrendingUp, Award, Zap } from 'lucide-react';

const players = [
    { rank: 1, name: 'Saito_K', score: 14500, avatar: 'SK', trend: 'up' },
    { rank: 2, name: 'Neon_Pulse', score: 12200, avatar: 'NP', trend: 'down' },
    { rank: 3, name: 'Void_Main', score: 11800, avatar: 'VM', trend: 'up' },
    { rank: 4, name: 'Bit_Walker', score: 10500, avatar: 'BW', trend: 'neutral' },
    { rank: 5, name: 'Code_Runner', score: 9800, avatar: 'CR', trend: 'up' },
];

const Leaderboard = () => {
    return (
        <section className="py-24 bg-black">
            <div className="container mx-auto px-6">
                <div className="flex flex-col md:flex-row justify-between items-start md:items-end gap-8 mb-16">
                    <div className="flex-1">
                        <Badge variant="primary" className="mb-4">Global Ranking</Badge>
                        <h2 className="text-5xl font-black text-white italic tracking-tighter uppercase leading-none">
                            The Elite <br /> Table
                        </h2>
                    </div>
                    <div className="flex gap-4">
                        <GlassContainer intensity="low" className="px-6 py-4 flex items-center gap-4 border-white/5">
                            <div className="p-2 bg-yellow-500/10 text-yellow-500">
                                <Award size={20} />
                            </div>
                            <div>
                                <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Prize Pool</p>
                                <p className="text-white font-black tracking-tight text-xl">$15,000</p>
                            </div>
                        </GlassContainer>
                        <GlassContainer intensity="low" className="px-6 py-4 flex items-center gap-4 border-white/5">
                            <div className="p-2 bg-white/10 text-white">
                                <Zap size={20} />
                            </div>
                            <div>
                                <p className="text-[10px] font-bold text-white/40 uppercase tracking-widest">Daily XP</p>
                                <p className="text-white font-black tracking-tight text-xl">1.5M+</p>
                            </div>
                        </GlassContainer>
                    </div>
                </div>

                <GlassContainer intensity="high" className="border-white/5 shadow-2xl">
                    <div className="overflow-x-auto">
                        <table className="w-full text-left font-sans">
                            <thead>
                                <tr className="border-b border-white/5 uppercase text-[10px] font-black tracking-[0.2em] text-white/40">
                                    <th className="px-8 py-6">Rank</th>
                                    <th className="px-8 py-6">Engineer</th>
                                    <th className="px-8 py-6">Sprint XP</th>
                                    <th className="px-8 py-6">Trend</th>
                                    <th className="px-8 py-6 text-right">Status</th>
                                </tr>
                            </thead>
                            <tbody>
                                {players.map((player) => (
                                    <motion.tr
                                        key={player.rank}
                                        whileHover={{ backgroundColor: 'rgba(255,255,255,0.02)' }}
                                        className="border-b border-white/5 last:border-0 transition-colors group"
                                    >
                                        <td className="px-8 py-6">
                                            <span className={`text-xl font-black italic italic tracking-tighter ${player.rank === 1 ? 'text-yellow-500' :
                                                player.rank === 2 ? 'text-gray-300' :
                                                    player.rank === 3 ? 'text-orange-500' : 'text-gray-600'
                                                }`}>
                                                #{player.rank < 10 ? `0${player.rank}` : player.rank}
                                            </span>
                                        </td>
                                        <td className="px-8 py-6">
                                            <div className="flex items-center gap-4">
                                                <div className="w-10 h-10 bg-white/10 border border-white/10 flex items-center justify-center font-black text-xs text-white group-hover:scale-110 transition-transform">
                                                    {player.avatar}
                                                </div>
                                                <span className="text-white font-black tracking-tight group-hover:text-white/80 transition-colors">
                                                    {player.name}
                                                </span>
                                            </div>
                                        </td>
                                        <td className="px-8 py-6">
                                            <span className="text-white/60 font-mono font-bold">
                                                {player.score.toLocaleString()}
                                            </span>
                                        </td>
                                        <td className="px-8 py-6">
                                            <div className={`flex items-center gap-1 font-bold text-[10px] uppercase ${player.trend === 'up' ? 'text-green-500' :
                                                player.trend === 'down' ? 'text-red-500' : 'text-white/40'
                                                }`}>
                                                {player.trend === 'up' && <TrendingUp size={12} />}
                                                {player.trend}
                                            </div>
                                        </td>
                                        <td className="px-8 py-6 text-right">
                                            <Badge variant={player.rank === 1 ? 'primary' : 'default'}>
                                                {player.rank === 1 ? 'Elite' : 'Verified'}
                                            </Badge>
                                        </td>
                                    </motion.tr>
                                ))}
                            </tbody>
                        </table>
                    </div>
                </GlassContainer>
            </div>
        </section>
    );
};

export default Leaderboard;
