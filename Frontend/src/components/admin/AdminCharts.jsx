import React from 'react';
import { motion } from 'framer-motion';

/**
 * Custom Area Chart for User Growth
 */
export const GrowthChart = ({ data }) => {
    if (!data || data.length === 0) return null;

    const maxCount = Math.max(...data.map(d => d.count), 5);
    const height = 200;
    const width = 800;
    const padding = 40;

    const points = data.map((d, i) => ({
        x: (i / (data.length - 1)) * (width - padding * 2) + padding,
        y: height - ((d.count / maxCount) * (height - padding * 2) + padding),
        date: d._id
    }));

    const pathData = `M ${points[0].x} ${points[0].y} ` + points.slice(1).map(p => `L ${p.x} ${p.y}`).join(' ');
    const areaData = `${pathData} L ${points[points.length - 1].x} ${height} L ${points[0].x} ${height} Z`;

    return (
        <div className="w-full bg-white/[0.02] border border-white/10 p-8">
            <h3 className="text-white/60 text-[10px] font-black uppercase tracking-[0.3em] mb-8">User Growth (30D)</h3>
            <div className="relative h-[200px] w-full">
                <svg viewBox={`0 0 ${width} ${height}`} className="w-full h-full overflow-visible">
                    {/* Grid Lines */}
                    {[0, 0.25, 0.5, 0.75, 1].map((p, i) => (
                        <line
                            key={i}
                            x1={padding}
                            y1={height - (p * (height - padding * 2) + padding)}
                            x2={width - padding}
                            y2={height - (p * (height - padding * 2) + padding)}
                            stroke="white"
                            strokeOpacity="0.05"
                            strokeDasharray="4 4"
                        />
                    ))}

                    {/* Area */}
                    <motion.path
                        d={areaData}
                        fill="url(#growthGradient)"
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        transition={{ duration: 1 }}
                    />

                    {/* Path */}
                    <motion.path
                        d={pathData}
                        fill="none"
                        stroke="white"
                        strokeWidth="2"
                        initial={{ pathLength: 0 }}
                        animate={{ pathLength: 1 }}
                        transition={{ duration: 1.5, ease: "easeInOut" }}
                    />

                    {/* Points */}
                    {points.map((p, i) => (
                        <motion.circle
                            key={i}
                            cx={p.x}
                            cy={p.y}
                            r="3"
                            fill="white"
                            initial={{ scale: 0 }}
                            animate={{ scale: 1 }}
                            transition={{ delay: 1 + i * 0.02 }}
                        />
                    ))}

                    <defs>
                        <linearGradient id="growthGradient" x1="0" y1="0" x2="0" y2="1">
                            <stop offset="0%" stopColor="white" stopOpacity="0.1" />
                            <stop offset="100%" stopColor="white" stopOpacity="0" />
                        </linearGradient>
                    </defs>
                </svg>
            </div>
        </div>
    );
};

/**
 * Custom Bar Chart for Language Popularity
 */
export const LanguagePopularityChart = ({ data }) => {
    if (!data) return null;

    const maxCount = Math.max(...data.map(d => d.count), 1);
    const languages = ['javascript', 'python', 'java', 'go', 'csharp'];

    const chartData = languages.map(lang => ({
        name: lang,
        count: data.find(d => d._id === lang)?.count || 0
    }));

    return (
        <div className="w-full bg-white/[0.02] border border-white/10 p-8">
            <h3 className="text-white/60 text-[10px] font-black uppercase tracking-[0.3em] mb-8">Active Enrollments</h3>
            <div className="space-y-6">
                {chartData.map((d, i) => (
                    <div key={d.name} className="space-y-2">
                        <div className="flex justify-between text-[10px] font-bold uppercase tracking-widest">
                            <span className="text-white/60">{d.name}</span>
                            <span className="text-white">{d.count} Users</span>
                        </div>
                        <div className="h-1.5 bg-white/5 relative overflow-hidden">
                            <motion.div
                                className="absolute inset-0 bg-white"
                                initial={{ width: 0 }}
                                animate={{ width: `${(d.count / maxCount) * 100}%` }}
                                transition={{ duration: 0.8, delay: i * 0.1 }}
                            />
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
};

export const SubmissionTrendsChart = ({ data }) => {
    if (!data) return null;

    const grouped = data.reduce((acc, curr) => {
        const date = curr._id.date;
        const status = curr._id.status;
        if (!acc[date]) acc[date] = { success: 0, failed: 0, total: 0 };

        if (status === 'completed' || status === 'passed') acc[date].success += curr.count;
        if (status === 'failed' || status === 'error') acc[date].failed += curr.count;

        acc[date].total += curr.count;
        return acc;
    }, {});

    const chartData = Object.entries(grouped).map(([date, stats]) => ({
        date,
        ...stats,
        rate: stats.total > 0 ? (stats.success / stats.total) * 100 : 0
    })).sort((a, b) => a.date.localeCompare(b.date));

    return (
        <div className="w-full bg-white/[0.02] border border-white/10 p-8">
            <h3 className="text-white/60 text-[10px] font-black uppercase tracking-[0.3em] mb-8">Submission Success (7D)</h3>
            <div className="grid grid-cols-7 gap-4">
                {chartData.map((d, i) => (
                    <div key={d.date} className="flex flex-col items-center">
                        <div className="h-32 w-full bg-white/5 relative flex flex-col justify-end overflow-hidden">
                            <motion.div
                                className="bg-red-500/20 w-full"
                                initial={{ height: 0 }}
                                animate={{ height: `${(d.failed / d.total) * 100}%` }}
                                transition={{ duration: 0.8, delay: i * 0.05 }}
                            />
                            <motion.div
                                className="bg-white w-full"
                                initial={{ height: 0 }}
                                animate={{ height: `${(d.success / d.total) * 100}%` }}
                                transition={{ duration: 0.8, delay: i * 0.05 + 0.2 }}
                            />
                        </div>
                        <span className="text-[10px] font-mono text-white/40 mt-3 rotate-45 origin-left">{d.date.split('-').slice(1).join('/')}</span>
                    </div>
                ))}
            </div>
            <div className="mt-8 flex gap-6">
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-white" />
                    <span className="text-[8px] font-black uppercase tracking-widest text-white/60">Passed</span>
                </div>
                <div className="flex items-center gap-2">
                    <div className="w-2 h-2 bg-red-500/20" />
                    <span className="text-[8px] font-black uppercase tracking-widest text-white/60">Failed</span>
                </div>
            </div>
        </div>
    );
};
