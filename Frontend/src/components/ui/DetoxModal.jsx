
import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import Button from './Button';
import { VerifiedCheck } from '../icons/CustomIcons';
// Import a service we will create shortly
import { relapseService } from '../../services/relapse.service.client';

const DetoxModal = ({ isOpen, onClose, requiredDrills, onComplete }) => {
    const [drills, setDrills] = useState([]);
    const [currentDrillIndex, setCurrentDrillIndex] = useState(0);
    const [userInput, setUserInput] = useState('');
    const [streak, setStreak] = useState(0);
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState(null);
    const inputRef = useRef(null);

    useEffect(() => {
        if (isOpen) {
            loadDrills();
        }
    }, [isOpen]);

    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.focus();
        }
    }, [currentDrillIndex, isOpen, userInput]);

    const loadDrills = async () => {
        setLoading(true);
        try {
            // Mock drills for now until backend endpoint exists
            // In real impl: const data = await relapseService.getDetoxDrills();
            const mockDrills = [
                { id: 1, code: 'for (let i = 0; i < 10; i++) { console.log(i); }' },
                { id: 2, code: 'const sum = (a, b) => a + b;' },
                { id: 3, code: 'import React, { useState } from "react";' },
                { id: 4, code: 'if (isValid && !isEmpty) { return true; }' },
                { id: 5, code: 'export default function App() { return <div />; }' }
            ].slice(0, requiredDrills);

            setDrills(mockDrills);
            setCurrentDrillIndex(0);
            setUserInput('');
            setStreak(0);
        } catch (err) {
            setError('Failed to load detox sequence.');
        } finally {
            setLoading(false);
        }
    };

    const handleInput = (e) => {
        if (loading) return;
        const val = e.target.value;
        setUserInput(val);

        const currentDrill = drills[currentDrillIndex];

        // Exact match check
        if (val === currentDrill.code) {
            // Success!
            if (currentDrillIndex + 1 >= drills.length) {
                // All done
                handleComplete();
            } else {
                // Next drill
                setTimeout(() => {
                    setStreak(s => s + 1);
                    setCurrentDrillIndex(i => i + 1);
                    setUserInput('');
                }, 200); // Slight delay for satisfaction
            }
        }
    };

    const handleComplete = async () => {
        setLoading(true);
        try {
            await relapseService.completeDetox();
            onComplete();
            onClose();
        } catch (err) {
            setError('Failed to verify completion.');
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    const currentDrill = drills[currentDrillIndex];

    return (
        <div className="fixed inset-0 z-[110] bg-black flex items-center justify-center">
            <div className="w-full max-w-3xl px-6">
                <div className="flex justify-between items-center mb-8">
                    <div>
                        <h2 className="text-red-500 font-bold uppercase tracking-widest text-sm mb-1">
                            Detox Protocol In Progress
                        </h2>
                        <p className="text-white/40 text-xs font-mono">
                            Drill {currentDrillIndex + 1} / {drills.length}
                        </p>
                    </div>
                    <div className="text-right">
                        <div className="text-4xl font-black text-white font-mono">
                            {((currentDrillIndex / drills.length) * 100).toFixed(0)}%
                        </div>
                    </div>
                </div>

                <AnimatePresence mode="wait">
                    {loading ? (
                        <div className="text-white text-center py-20 animate-pulse">Initializing Neural Link...</div>
                    ) : (
                        <motion.div
                            key={currentDrillIndex}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -20 }}
                            className="space-y-8"
                        >
                            <div className="bg-white/5 border border-white/10 p-8 rounded-lg text-center select-none relative overflow-hidden">
                                <p className="text-2xl md:text-3xl font-mono text-white font-bold tracking-tight">
                                    {currentDrill?.code}
                                </p>
                            </div>

                            <div className="relative">
                                <input
                                    ref={inputRef}
                                    type="text"
                                    value={userInput}
                                    onChange={handleInput}
                                    className="w-full bg-black border-b-2 border-white/20 py-4 text-2xl md:text-3xl font-mono text-white focus:outline-none focus:border-red-500 transition-colors text-center placeholder-white/10"
                                    placeholder="Type exactly as shown..."
                                    autoFocus
                                    onPaste={(e) => e.preventDefault()} // No cheating in detox!
                                />
                                {/* Progress bar based on char match length could go here */}
                            </div>

                        </motion.div>
                    )}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default DetoxModal;
