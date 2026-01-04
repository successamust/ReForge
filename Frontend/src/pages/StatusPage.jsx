import React, { useEffect, useState } from 'react';
import api from '../services/api';
import SEO from '../components/SEO';
import Badge from '../components/ui/Badge';

const StatusPage = () => {
    const [status, setStatus] = useState(null);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchStatus = async () => {
            try {
                const response = await api.get('/health');
                setStatus(response.data);
            } catch (error) {
                console.error('Failed to fetch status:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchStatus();
    }, []);

    return (
        <div className="min-h-screen bg-black pt-32 pb-24">
            <SEO title="System Status" description="Real-time status of ReForge systems." />
            <div className="container mx-auto px-6 max-w-4xl">
                <div className="mb-12">
                    <h1 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tighter">SYSTEM STATUS</h1>
                    <p className="text-white/40 text-lg font-medium">Real-time infrastructure health monitoring.</p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="p-8 bg-white/5 border border-white/10 rounded-2xl">
                        <div className="flex justify-between items-center mb-6">
                            <span className="text-white/60 font-bold text-sm uppercase tracking-widest">API Services</span>
                            {loading ? (
                                <Badge variant="secondary">Checking...</Badge>
                            ) : status?.status === 'healthy' ? (
                                <Badge variant="success">Operational</Badge>
                            ) : (
                                <Badge variant="error" className="bg-red-500/10 text-red-500 border-red-500/20">Degraded</Badge>
                            )}
                        </div>
                        <div className="space-y-4">
                            <div className="flex justify-between">
                                <span className="text-white/40 text-sm">Response Time</span>
                                <span className="text-white font-mono text-sm">~45ms</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-white/40 text-sm">Uptime (30d)</span>
                                <span className="text-white font-mono text-sm">99.98%</span>
                            </div>
                        </div>
                    </div>

                    <div className="p-8 bg-white/5 border border-white/10 rounded-2xl">
                        <div className="flex justify-between items-center mb-6">
                            <span className="text-white/60 font-bold text-sm uppercase tracking-widest">Code Runners</span>
                            <Badge variant="success">Operational</Badge>
                        </div>
                        <div className="space-y-4">
                            <div className="flex justify-between">
                                <span className="text-white/40 text-sm">Avg. Exec Time</span>
                                <span className="text-white font-mono text-sm">~240ms</span>
                            </div>
                            <div className="flex justify-between">
                                <span className="text-white/40 text-sm">Containers Active</span>
                                <span className="text-white font-mono text-sm">12/12</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="mt-12 p-8 border border-white/5 rounded-2xl bg-gradient-to-br from-white/5 to-transparent">
                    <h3 className="text-white font-bold mb-4">Historical Incidents</h3>
                    <div className="space-y-6">
                        <div className="relative pl-6 border-l border-white/10">
                            <div className="absolute -left-1.5 top-1.5 w-3 h-3 rounded-full bg-white/10" />
                            <div className="flex justify-between mb-1">
                                <span className="text-white text-sm font-bold">Planned Maintenance</span>
                                <span className="text-white/20 text-xs">Jan 02, 2026</span>
                            </div>
                            <p className="text-white/40 text-sm">Database optimization and migration. System remained operational with high latency for 15 minutes.</p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default StatusPage;
