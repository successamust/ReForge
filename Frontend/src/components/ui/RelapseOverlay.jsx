
import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from './Button';
import { EnergyZap } from '../icons/CustomIcons';

const RelapseOverlay = ({ user, onStartDetox }) => {
    return (
        <div className="fixed inset-0 z-[100] bg-black/95 backdrop-blur-sm flex items-center justify-center p-6">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="max-w-2xl w-full text-center relative"
            >
                {/* Toxic Glow */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-full h-full bg-red-600/20 blur-[100px] rounded-full pointer-events-none" />

                <div className="relative border border-red-500/30 bg-black/80 rounded-2xl p-12 overflow-hidden">
                    {/* Animated Glitch Effect overlay if desired */}

                    <div className="mb-8">
                        <div className="mx-auto w-24 h-24 rounded-full bg-red-500/10 flex items-center justify-center border-2 border-red-500 mb-6">
                            <EnergyZap size={48} className="text-red-500" />
                        </div>

                        <h1 className="text-5xl font-black text-white mb-2 tracking-tighter uppercase glitch-text">
                            System Relapsed
                        </h1>
                        <p className="text-red-500 font-mono tracking-widest text-sm uppercase mb-8">
                            Inactivity Detected • Access Restricted
                        </p>

                        <p className="text-white/60 text-lg font-light leading-relaxed max-w-lg mx-auto">
                            The muscle memory has faded. You have fallen behind.
                            To regain access to your dashboard and resume your training,
                            you must prove your commitment.
                        </p>
                    </div>

                    <div className="bg-red-500/5 border border-red-500/20 rounded-lg p-6 mb-8 max-w-lg mx-auto">
                        <h3 className="text-red-400 font-bold uppercase tracking-widest text-xs mb-2">
                            Remedial Action Required
                        </h3>
                        <p className="text-white font-mono text-xl">
                            Complete {user.detoxRequired || 5} Syntax Drills
                        </p>
                    </div>

                    <Button
                        onClick={onStartDetox}
                        className="w-full max-w-md bg-red-600 hover:bg-red-500 text-white border-none py-4 text-lg font-bold uppercase tracking-widest shadow-[0_0_30px_rgba(220,38,38,0.4)]"
                    >
                        Initiate Detox Protocol
                    </Button>
                </div>
            </motion.div>
        </div>
    );
};

export default RelapseOverlay;
