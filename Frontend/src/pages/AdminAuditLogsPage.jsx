import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { adminService } from '../services/admin.service';
import Button from '../components/ui/Button';
import { AnimatePresence } from 'framer-motion';
import { Eye, X } from 'lucide-react';

const AdminAuditLogsPage = () => {
    const [logs, setLogs] = useState([]);
    const [loading, setLoading] = useState(true);
    const [page, setPage] = useState(1);
    const [pagination, setPagination] = useState({});
    const [peekCode, setPeekCode] = useState(null);
    const [loadingCode, setLoadingCode] = useState(false);

    const loadLogs = React.useCallback(async () => {
        try {
            setLoading(true);
            const response = await adminService.getAuditLogs({ page, limit: 20 });
            const data = response.data || response;
            setLogs(data.logs || []);
            setPagination(data.pagination || {});
        } catch (err) {
            console.error('Failed to load audit logs', err);
        } finally {
            setLoading(false);
        }
    }, [page]);

    const handlePeek = async (submissionId) => {
        try {
            setLoadingCode(true);
            const response = await adminService.getSubmissionCode(submissionId);
            setPeekCode(response.data?.submission || response.submission);
        } catch (err) {
            console.error('Failed to load code', err);
        } finally {
            setLoadingCode(false);
        }
    };

    useEffect(() => {
        loadLogs();
    }, [loadLogs]);

    return (
        <div className="min-h-screen bg-black py-32 px-6">
            <div className="container mx-auto max-w-6xl">
                <div className="flex justify-between items-center mb-12">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                    >
                        <h1 className="text-4xl font-black text-white mb-2">Audit Logs</h1>
                        <Link to="/admin" className="text-white/40 hover:text-white transition-colors text-sm">
                            &larr; Back to Dashboard
                        </Link>
                    </motion.div>
                </div>

                <div className="border border-white/10">
                    <div className="grid grid-cols-12 bg-white/5 px-6 py-4 border-b border-white/10 text-xs font-bold uppercase tracking-widest text-white/40">
                        <div className="col-span-2">Timestamp</div>
                        <div className="col-span-2">Action</div>
                        <div className="col-span-2">User</div>
                        <div className="col-span-3">Details</div>
                        <div className="col-span-3">IP Address</div>
                    </div>

                    {loading ? (
                        <div className="p-12 text-center text-white/40">Loading logs...</div>
                    ) : logs.length === 0 ? (
                        <div className="p-12 text-center text-white/40">No audit logs found.</div>
                    ) : (
                        logs.map(log => (
                            <div key={log._id} className="grid grid-cols-12 px-6 py-4 border-b border-white/10 items-center hover:bg-white/[0.02] transition-colors font-mono text-xs">
                                <div className="col-span-2 text-white/60">
                                    {log.createdAt ? new Date(log.createdAt).toLocaleString('en-US', {
                                        month: '2-digit',
                                        day: '2-digit',
                                        year: 'numeric',
                                        hour: '2-digit',
                                        minute: '2-digit',
                                        second: '2-digit',
                                        hour12: false
                                    }) : 'N/A'}
                                </div>
                                <div className="col-span-2">
                                    <span className="text-white font-bold uppercase tracking-wide">{log.action}</span>
                                </div>
                                <div className="col-span-2 text-white/60 truncate">
                                    {log.userId?.email || log.createdBy?.email || 'System'}
                                </div>
                                <div className="col-span-3 text-white/40 truncate pr-4">
                                    {log.payload ? JSON.stringify(log.payload) : 'N/A'}
                                </div>
                                <div className="col-span-2 text-white/40 font-mono">
                                    {log.ipAddress || '-'}
                                </div>
                                <div className="col-span-1 flex justify-end">
                                    {log.payload?.submissionId && (
                                        <button
                                            onClick={() => handlePeek(log.payload.submissionId)}
                                            className="p-2 border border-white/10 hover:border-white/40 hover:bg-white/5 transition-colors text-white/40 hover:text-white"
                                            title="Peek Code"
                                        >
                                            <Eye size={14} />
                                        </button>
                                    )}
                                </div>
                            </div>
                        ))
                    )}
                </div>

                <AnimatePresence>
                    {peekCode && (
                        <div className="fixed inset-0 z-[200] flex items-center justify-center p-6 bg-black/90 backdrop-blur-md">
                            <motion.div
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                className="bg-zinc-900 border border-white/10 w-full max-w-4xl max-h-[80vh] flex flex-col shadow-2xl"
                            >
                                <div className="p-6 border-b border-white/5 flex justify-between items-center">
                                    <div>
                                        <span className="text-[10px] font-black uppercase tracking-widest text-white/40 mb-1 block">
                                            Submission Peek
                                        </span>
                                        <h3 className="text-white font-bold flex items-center gap-2">
                                            {peekCode.language.toUpperCase()} / DAY {peekCode.day}
                                            <span className={`text-[10px] px-2 py-0.5 border ${peekCode.status === 'completed' ? 'border-green-500/50 text-green-400' : 'border-red-500/50 text-red-400'
                                                }`}>
                                                {peekCode.status.toUpperCase()}
                                            </span>
                                        </h3>
                                    </div>
                                    <button onClick={() => setPeekCode(null)} className="p-2 hover:bg-white/5 text-white/40 hover:text-white">
                                        <X size={20} />
                                    </button>
                                </div>
                                <div className="flex-1 overflow-auto p-6 font-mono text-sm">
                                    <pre className="text-white/80 whitespace-pre-wrap leading-relaxed">
                                        {peekCode.code}
                                    </pre>
                                </div>
                                <div className="p-4 bg-black/40 border-t border-white/5 flex justify-end">
                                    <Button size="sm" onClick={() => setPeekCode(null)}>Close Inspection</Button>
                                </div>
                            </motion.div>
                        </div>
                    )}
                </AnimatePresence>

                {/* Pagination */}
                <div className="flex justify-between items-center mt-6">
                    <span className="text-white/40 text-sm">
                        Page {pagination.page} of {pagination.pages}
                    </span>
                    <div className="flex gap-2">
                        <button
                            disabled={page === 1}
                            onClick={() => setPage(p => p - 1)}
                            className="px-4 py-2 border border-white/10 text-white disabled:opacity-30 disabled:cursor-not-allowed hover:bg-white/5"
                        >
                            Previous
                        </button>
                        <button
                            disabled={page === pagination.pages}
                            onClick={() => setPage(p => p + 1)}
                            className="px-4 py-2 border border-white/10 text-white disabled:opacity-30 disabled:cursor-not-allowed hover:bg-white/5"
                        >
                            Next
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AdminAuditLogsPage;
