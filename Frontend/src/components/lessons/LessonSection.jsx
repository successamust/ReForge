import React, { useState, useEffect, useRef } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { VerifiedCheck } from '../icons/CustomIcons';

const LessonSection = ({
    id,
    title,
    icon: Icon,
    children,
    defaultExpanded = true,
    onInView
}) => {
    const [isExpanded, setIsExpanded] = useState(defaultExpanded);
    const [isInView, setIsInView] = useState(false);
    const sectionRef = useRef(null);

    useEffect(() => {
        const element = sectionRef.current;
        const observer = new IntersectionObserver(
            ([entry]) => {
                setIsInView(entry.isIntersecting);
                if (entry.isIntersecting && onInView) {
                    onInView(id);
                }
            },
            { threshold: 0.3 }
        );

        if (element) {
            observer.observe(element);
        }

        return () => {
            if (element) {
                observer.unobserve(element);
            }
        };
    }, [id, onInView]);

    return (
        <motion.div
            id={`section-${id}`}
            ref={sectionRef}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            className="relative"
        >
            {/* Section Header */}
            <div
                className="flex items-center justify-between mb-6 cursor-pointer group"
                onClick={() => setIsExpanded(!isExpanded)}
            >
                <div className="flex items-center gap-3">
                    {Icon && <Icon size={20} className="text-white/60" />}
                    <h2 className="text-2xl font-black text-white tracking-tight group-hover:text-white/80 transition-colors">
                        {title}
                    </h2>
                    <AnimatePresence>
                        {isInView && (
                            <motion.div
                                initial={{ scale: 0, rotate: -180 }}
                                animate={{ scale: 1, rotate: 0 }}
                                exit={{ scale: 0, rotate: 180 }}
                                transition={{ type: 'spring', stiffness: 200, damping: 15 }}
                            >
                                <VerifiedCheck size={16} className="text-green-400" />
                            </motion.div>
                        )}
                    </AnimatePresence>
                </div>

                {/* Expand/Collapse Icon */}
                <motion.div
                    animate={{ rotate: isExpanded ? 180 : 0 }}
                    transition={{ duration: 0.3 }}
                    className="text-white/40 group-hover:text-white/60 transition-colors"
                >
                    <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                        <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                </motion.div>
            </div>

            {/* Section Content */}
            <AnimatePresence initial={false}>
                {isExpanded && (
                    <motion.div
                        initial={{ height: 0, opacity: 0 }}
                        animate={{ height: 'auto', opacity: 1 }}
                        exit={{ height: 0, opacity: 0 }}
                        transition={{ duration: 0.3, ease: 'easeInOut' }}
                        className="overflow-hidden"
                    >
                        <motion.div
                            initial={{ y: -20 }}
                            animate={{ y: 0 }}
                            exit={{ y: -20 }}
                            transition={{ duration: 0.3 }}
                        >
                            {children}
                        </motion.div>
                    </motion.div>
                )}
            </AnimatePresence>

            {/* Section divider */}
            <div className="mt-8 mb-8 h-px bg-gradient-to-r from-transparent via-white/10 to-transparent" />
        </motion.div>
    );
};

export default LessonSection;
