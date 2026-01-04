import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { adminService } from '../services/admin.service';
import Button from '../components/ui/Button';
import { GrowthChart, LanguagePopularityChart, SubmissionTrendsChart } from '../components/admin/AdminCharts';

const StatCard = ({ title, value, subtext }) => (
    <div className="bg-white/5 border border-white/10 p-6">
        <h3 className="text-white/60 text-sm uppercase tracking-widest font-bold mb-2">{title}</h3>
        <p className="text-4xl text-white font-black mb-1">{value?.toLocaleString() || 0}</p>
        {subtext && <p className="text-white/40 text-xs font-mono">{subtext}</p>}
    </div>
);

const AdminDashboardPage = () => {
    const [stats, setStats] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        loadStats();
    }, []);

    const loadStats = async () => {
        try {
            setLoading(true);
            const response = await adminService.getSystemStats();
            setStats(response.data || response);
        } catch (err) {
            setError('Failed to load system stats');
            console.error(err);
        } finally {
            setLoading(false);
        }
    };

    if (loading) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center">
                <div className="w-12 h-12 border-2 border-white border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    if (error) {
        return (
            <div className="min-h-screen bg-black py-40 px-6 text-center">
                <p className="text-red-500 mb-4">{error}</p>
                <Button onClick={loadStats}>Retry</Button>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-black py-32 px-6">
            <div className="container mx-auto max-w-6xl">
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    className="mb-12"
                >
                    <div className="inline-flex items-center gap-3 px-4 py-2 border border-white/10 bg-white/[0.02] mb-8">
                        <div className="w-1.5 h-1.5 bg-red-500 rounded-full" />
                        <span className="text-[10px] font-mono text-white/60 tracking-[0.3em] uppercase">
                            Admin Portal
                        </span>
                    </div>
                    <h1 className="text-5xl font-black text-white mb-6">System Overview</h1>
                </motion.div>

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-12">
                    <StatCard
                        title="Total Users"
                        value={stats?.users?.total}
                        subtext={`${stats?.users?.newToday || 0} new today`}
                    />
                    <StatCard
                        title="Premium Users"
                        value={stats?.users?.premium}
                        subtext={`${((stats?.users?.premium / stats?.users?.total) * 100).toFixed(1)}% conversion`}
                    />
                    <StatCard
                        title="Active Today"
                        value={stats?.engagement?.activeToday}
                        subtext="Users active in last 24h"
                    />
                    <StatCard
                        title="Total Points"
                        value={stats?.engagement?.totalPoints}
                        subtext="Global engagement score"
                    />
                </div>

                {/* Charts Selection */}
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
                    <div className="lg:col-span-2">
                        <GrowthChart data={stats?.growth} />
                    </div>
                    <div>
                        <LanguagePopularityChart data={stats?.popularity} />
                    </div>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-12">
                    <div className="lg:col-span-1">
                        <SubmissionTrendsChart data={stats?.trends} />
                    </div>
                    <div className="lg:col-span-2 bg-white/5 border border-white/10 p-8">
                        <h3 className="text-xl font-bold text-white mb-6">System Health</h3>
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-x-12 gap-y-4">
                            <div className="flex justify-between border-b border-white/10 pb-4">
                                <span className="text-white/60">Node Version</span>
                                <span className="text-white font-mono">{stats?.system?.nodeVersion}</span>
                            </div>
                            <div className="flex justify-between border-b border-white/10 pb-4">
                                <span className="text-white/60">Uptime</span>
                                <span className="text-white font-mono">{(stats?.system?.uptime / 3600).toFixed(2)} hours</span>
                            </div>
                            <div className="flex justify-between border-b border-white/10 pb-4">
                                <span className="text-white/60">Last Updated</span>
                                <span className="text-white font-mono">{new Date().toLocaleTimeString()}</span>
                            </div>
                            <div className="flex justify-between border-b border-white/10 pb-4">
                                <span className="text-white/60">Memory (RSS)</span>
                                <span className="text-white font-mono">{Math.round(stats?.system?.memoryUsage?.rss / 1024 / 1024)} MB</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="bg-white/5 border border-white/10 p-8 flex items-center justify-between mb-24">
                    <div>
                        <h3 className="text-xl font-bold text-white mb-2">Administrative Console</h3>
                        <p className="text-white/40 text-sm">Execute system-wide protocols and manage user integrity.</p>
                    </div>
                    <div className="flex gap-4">
                        <Button to="/admin/users">Manage Users</Button>
                        <Button variant="ghost" to="/admin/logs">View Logs</Button>
                        <Button variant="ghost" to="/status">System Health</Button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminDashboardPage;
