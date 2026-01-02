import React from 'react';
import { motion } from 'framer-motion';

const SubmissionHistory = ({ history, loading }) => {
    if (loading) return <div className="p-6 text-white/40 text-center">Loading history...</div>;

    if (!history?.length) {
        return (
            <div className="p-6 text-center">
                <p className="text-white/40 text-sm">No submissions yet.</p>
            </div>
        );
    }

    return (
        <div className="font-mono text-xs max-h-[200px] overflow-y-auto">
            {history.map((sub) => (
                <div key={sub._id} className="border-b border-white/5 py-3 px-6 hover:bg-white/[0.02]">
                    <div className="flex justify-between items-center mb-1">
                        <span className={`font-bold ${sub.status === 'completed' && sub.resultDetails?.passed ? 'text-green-500' : 'text-red-500'}`}>
                            {sub.status === 'completed' && sub.resultDetails?.passed ? 'PASSED' : 'FAILED'}
                        </span>
                        <span className="text-white/30">{new Date(sub.createdAt).toLocaleString()}</span>
                    </div>
                    <div className="text-white/50 truncate">
                        Duration: {sub.resultDetails?.executionTimeMs || 0}ms
                    </div>
                </div>
            ))}
        </div>
    );
};

export default SubmissionHistory;
