import React, { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { EnergyZap, CodeShield, AchievementTrophy } from '../icons/CustomIcons';

const features = [
    {
        title: 'Elite Curriculum',
        desc: 'Master the high-performance patterns used at Big Tech and scale-ups.',
        icon: EnergyZap,
        number: '01'
    },
    {
        title: 'Precision Practice',
        desc: 'Real-world environments. No hand-holding. Pure engineering rigor.',
        icon: CodeShield,
        number: '02'
    },
    {
        title: 'Global Ranking',
        desc: 'Compete with the worlds top 1% engineers for the leaderboard crown.',
        icon: AchievementTrophy,
        number: '03'
    },
];

const FeatureGrid = () => {
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], [100, -100]);
    const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

    return (
        <section ref={ref} className="relative py-40 bg-black overflow-hidden">
            <div className="container mx-auto px-6">
                {/* Header with scroll animation */}
                        <motion.div
                    style={{ y, opacity }}
                    className="mb-24"
                        >
                    <div className="inline-flex items-center gap-3 px-4 py-2 border border-white/10 bg-white/[0.02] mb-8">
                        <div className="w-1.5 h-1.5 bg-white rounded-full" />
                        <span className="text-[10px] font-mono text-white/60 tracking-[0.3em] uppercase">
                            Core Features
                        </span>
                                    </div>
                    <h2 className="text-[clamp(3rem,8vw,7rem)] font-black leading-[0.9] tracking-[-0.02em] text-white mb-6">
                        Built for Excellence
                    </h2>
                    <p className="text-white/60 text-lg max-w-2xl font-light">
                        Everything you need to rebuild your coding muscle from the ground up
                    </p>
                </motion.div>

                {/* Features Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/5">
                    {features.map((feature, i) => {
                        const featureRef = useRef(null);
                        const { scrollYProgress: featureProgress } = useScroll({
                            target: featureRef,
                            offset: ["start end", "center start"]
                        });
                        
                        const featureY = useTransform(featureProgress, [0, 1], [60, 0]);
                        const featureOpacity = useTransform(featureProgress, [0, 0.5, 1], [0, 1, 1]);
                        const featureScale = useTransform(featureProgress, [0, 1], [0.95, 1]);

                        return (
                            <motion.div
                                key={i}
                                ref={featureRef}
                                style={{ y: featureY, opacity: featureOpacity, scale: featureScale }}
                                className="bg-black p-12 group relative overflow-hidden"
                                whileHover={{ backgroundColor: 'rgba(255, 255, 255, 0.02)' }}
                            >
                                {/* Number */}
                                <div className="absolute top-8 right-8 text-white/5 text-[120px] font-black leading-none">
                                    {feature.number}
                                </div>

                                {/* Icon */}
                                <motion.div
                                    className="mb-8"
                                    whileHover={{ scale: 1.1, rotate: 5 }}
                                    transition={{ type: "spring", stiffness: 400 }}
                                >
                                    <div className="w-16 h-16 border border-white/10 flex items-center justify-center bg-white/[0.02]">
                                        <feature.icon size={32} className="text-white" />
                                    </div>
                                </motion.div>

                                {/* Content */}
                                <h3 className="text-2xl font-black text-white mb-4 tracking-tight">
                                    {feature.title}
                                </h3>
                                <p className="text-white/60 font-light leading-relaxed max-w-sm">
                                    {feature.desc}
                                </p>

                                {/* Hover line */}
                                <motion.div
                                    className="absolute bottom-0 left-0 h-px bg-white"
                                    initial={{ width: 0 }}
                                    whileHover={{ width: '100%' }}
                                    transition={{ duration: 0.6, ease: "easeInOut" }}
                                />
                        </motion.div>
                        );
                    })}
                </div>
            </div>
        </section>
    );
};

export default FeatureGrid;
