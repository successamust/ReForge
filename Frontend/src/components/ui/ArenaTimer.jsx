import React, { useState, useEffect } from 'react';
import { motion } from 'framer-motion';

const ArenaTimer = ({ timeLeft, initialTime }) => {
    const percentage = (timeLeft / initialTime) * 100;

    const formatTime = (seconds) => {
        const mins = Math.floor(seconds / 60);
        const secs = seconds % 60;
        return `${mins}:${secs.toString().padStart(2, '0')}`;
    };

    return (
        <div className="flex items-center gap-4">
            <div className="text-right">
                <div className="text-[10px] font-black text-white/40 uppercase tracking-[0.2em] mb-1">Time Remaining</div>
                <div className={`text-2xl font-black tabular-nums ${timeLeft < 30 ? 'text-red-500 animate-pulse' : 'text-white'}`}>
                    {formatTime(timeLeft)}
                </div>
            </div>

            <div className="w-48 h-2 bg-white/5 border border-white/10 relative overflow-hidden">
                <motion.div
                    initial={{ width: '100%' }}
                    animate={{ width: `${percentage}%` }}
                    className={`absolute inset-y-0 left-0 ${timeLeft < 30 ? 'bg-red-600' : 'bg-white/40'}`}
                />
            </div>
        </div>
    );
};

export default ArenaTimer;
