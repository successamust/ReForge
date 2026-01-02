import React, { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { VerifiedCheck } from '../icons/CustomIcons';

const ContentProgressTracker = ({ sections = [], currentSection = 0, scrollContainerRef }) => {
    const [scrollProgress, setScrollProgress] = useState(0);
    const [viewedSections, setViewedSections] = useState(new Set());

    useEffect(() => {
        const handleScroll = () => {
            const container = scrollContainerRef?.current || document.documentElement;
            const scrolled = scrollContainerRef?.current ? container.scrollTop : window.scrollY;
            const totalScrollable = container.scrollHeight - container.clientHeight;

            if (totalScrollable > 0) {
                const progress = (scrolled / totalScrollable) * 100;
                setScrollProgress(Math.min(progress, 100));
            }
        };

        const target = scrollContainerRef?.current || window;
        target.addEventListener('scroll', handleScroll);
        handleScroll();
        return () => target.removeEventListener('scroll', handleScroll);
    }, [scrollContainerRef]);

    useEffect(() => {
        if (currentSection >= 0) {
            setTimeout(() => {
                setViewedSections(prev => new Set([...prev, currentSection]));
            }, 0);
        }
    }, [currentSection]);

    const scrollToSection = (index) => {
        const element = document.getElementById(`section-${index}`);
        if (element) {
            element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    };

    return (
        <div className="relative z-40 bg-black/80 backdrop-blur-md border-b border-white/10">
            {/* Progress Bar */}
            <div className="relative h-1 bg-white/5">
                <motion.div
                    className="absolute top-0 left-0 h-full bg-gradient-to-r from-purple-500 via-pink-500 to-purple-500 bg-[length:200%_100%]"
                    style={{ width: `${scrollProgress}%` }}
                    animate={{ backgroundPosition: ['0% 50%', '100% 50%'] }}
                    transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                />
            </div>

            {/* Section Navigation */}
            <div className="container mx-auto max-w-7xl px-6 py-3">
                <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs font-mono text-white/60">
                        <span className="uppercase tracking-widest">Progress</span>
                        <span className="text-white font-bold">{Math.round(scrollProgress)}%</span>
                    </div>

                    <div className="flex items-center gap-2">
                        {sections.map((section, index) => (
                            <button
                                key={index}
                                onClick={() => scrollToSection(index)}
                                className={`group relative px-3 py-1.5 text-xs font-bold uppercase tracking-wider transition-all ${viewedSections.has(index)
                                    ? 'text-white'
                                    : 'text-white/30 hover:text-white/60'
                                    }`}
                            >
                                {viewedSections.has(index) && (
                                    <motion.div
                                        initial={{ scale: 0 }}
                                        animate={{ scale: 1 }}
                                        className="absolute -top-1 -right-1"
                                    >
                                        <VerifiedCheck size={12} className="text-green-400" />
                                    </motion.div>
                                )}
                                {section.title}
                                {currentSection === index && (
                                    <motion.div
                                        layoutId="activeSection"
                                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-white"
                                    />
                                )}
                            </button>
                        ))}
                    </div>

                    <div className="text-xs font-mono text-white/40">
                        {viewedSections.size} / {sections.length} sections
                    </div>
                </div>
            </div>
        </div>
    );
};

export default ContentProgressTracker;
