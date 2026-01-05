
import React from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from './Button';

const PasteGuard = ({ isOpen, onClose, onAcknowledge }) => {
    return (
        <AnimatePresence>
            {isOpen && (
                <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
                    <motion.div
                        initial={{ opacity: 0 }}
                        animate={{ opacity: 1 }}
                        exit={{ opacity: 0 }}
                        className="absolute inset-0 bg-black/80 backdrop-blur-sm"
                        onClick={onClose}
                    />
                    <motion.div
                        initial={{ scale: 0.9, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0.9, opacity: 0 }}
                        className="relative bg-zinc-900 border border-red-500/30 rounded-lg p-8 max-w-md w-full shadow-[0_0_50px_rgba(239,68,68,0.2)]"
                    >
                        <div className="text-center space-y-4">
                            <div className="mx-auto w-16 h-16 rounded-full bg-red-500/10 flex items-center justify-center mb-4 border border-red-500/20">
                                <span className="text-3xl">🚫</span>
                            </div>

                            <h2 className="text-2xl font-black text-white uppercase tracking-tight">
                                Manual Mode Only
                            </h2>

                            <p className="text-white/60 leading-relaxed">
                                ReForge is about rehabilitating your coding skills.
                                <br />
                                <span className="text-red-400 font-bold">Copy-pasting is strictly forbidden.</span>
                            </p>

                            <div className="bg-white/5 rounded p-4 text-sm text-white/50 italic border border-white/5">
                                "The muscle memory you build today is the career you save tomorrow."
                            </div>

                            <div className="pt-4 flex gap-3 justify-center">
                                <Button
                                    onClick={onAcknowledge}
                                    className="bg-red-600 hover:bg-red-500 text-white font-bold uppercase tracking-widest border-none w-full"
                                >
                                    I Understand
                                </Button>
                            </div>
                        </div>
                    </motion.div>
                </div>
            )}
        </AnimatePresence>
    );
};

export default PasteGuard;
