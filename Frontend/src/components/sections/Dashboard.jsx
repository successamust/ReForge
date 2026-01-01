import React, { useContext, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { NeuralCore, PulseActivity, PrecisionTarget, EnergyZap, SecureLock } from '../icons/CustomIcons';
import { AppContext } from '../../context/AppContext';

const Dashboard = () => {
    const { isSessionActive } = useContext(AppContext);
    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    });

    const y = useTransform(scrollYProgress, [0, 1], [80, -80]);
    const opacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);

    const detoxMetrics = [
        { label: 'Manual Logic Accuracy', value: '98.2%', icon: PrecisionTarget, trend: '+4.1%' },
        { label: 'Pattern Memory Index', value: 'Optimizing', icon: NeuralCore, trend: 'Improving' },
        { label: 'Syntax Retention', value: 'High', icon: EnergyZap, trend: 'Stable' },
    ];

    const phases = [
        { title: 'Logical Baseline', status: 'verified', day: 'D1-D05' },
        { title: 'Manual Reconstruction', status: 'active', day: 'D06-D15' },
        { title: 'Structural Solving', status: 'locked', day: 'D16-D25' },
        { title: 'Architecture Mastery', status: 'locked', day: 'D26-D30' },
    ];

    return (
        <section ref={ref} className="relative py-40 bg-black border-t border-white/5 overflow-hidden">
            <div className="container mx-auto px-6">
                <motion.div
                    style={{ y, opacity }}
                    className="flex flex-col xl:flex-row justify-between items-start xl:items-end gap-16 mb-24"
                >
                    <div className="flex-1">
                        <div className="inline-flex items-center gap-3 px-4 py-2 border border-white/10 bg-white/[0.02] mb-8">
                            <div className="w-1.5 h-1.5 bg-white rounded-none" />
                            <span className="text-[10px] font-mono text-white/60 tracking-[0.3em] uppercase">
                                Detox Metrics
                            </span>
                        </div>
                        <h2 className="text-[clamp(3rem,8vw,7rem)] font-black leading-[0.9] tracking-[-0.02em] text-white mb-6">
                            Logic Reload
                        </h2>
                        <p className="text-white/60 font-light text-lg max-w-md leading-relaxed">
                            Tracking your transition back to manual proficiency. Rebuilding technical autonomy through rigorous architectural patterns.
                        </p>
                    </div>

                    {/* Metrics */}
                    <div className="flex gap-4 w-full xl:w-auto overflow-x-auto pb-4 xl:pb-0">
                        {detoxMetrics.map((metric, i) => (
                            <MetricCard key={i} metric={metric} isSessionActive={isSessionActive} />
                        ))}
                    </div>
                </motion.div>

                {/* Phases Grid */}
                <div className="grid grid-cols-1 lg:grid-cols-4 gap-px bg-white/5">
                    {phases.map((phase, i) => (
                        <PhaseCard key={i} phase={phase} isSessionActive={isSessionActive} />
                    ))}
                </div>
            </div>
        </section>
    );
};

const MetricCard = ({ metric, isSessionActive }) => {
    const metricRef = useRef(null);
    const { scrollYProgress: metricProgress } = useScroll({
        target: metricRef,
        offset: ["start end", "center start"]
    });
    const metricY = useTransform(metricProgress, [0, 1], [40, 0]);
    const metricOpacity = useTransform(metricProgress, [0, 0.6, 1], [0, 1, 1]);

    return (
        <motion.div
            ref={metricRef}
            style={{ y: metricY, opacity: metricOpacity }}
            className="relative flex-shrink-0 min-w-[200px] bg-white/[0.02] border border-white/10 p-6 group hover:bg-white/[0.04] transition-all"
        >
            <div className="flex items-center gap-3 mb-4">
                <div className="w-10 h-10 border border-white/10 flex items-center justify-center">
                    <metric.icon size={20} className="text-white" />
                </div>
                <span className="text-[10px] font-bold uppercase text-white/50 tracking-widest">
                    {metric.label}
                </span>
            </div>
            <div className="flex items-end justify-between">
                <span className="text-3xl font-black text-white">
                    {isSessionActive ? metric.value : '0.0%'}
                </span>
                <span className="text-[10px] font-bold text-white/60">
                    {isSessionActive ? metric.trend : ''}
                </span>
            </div>
        </motion.div>
    );
};

const PhaseCard = ({ phase, isSessionActive }) => {
    const phaseRef = useRef(null);
    const { scrollYProgress: phaseProgress } = useScroll({
        target: phaseRef,
        offset: ["start end", "center start"]
    });
    const phaseY = useTransform(phaseProgress, [0, 1], [60, 0]);
    const phaseOpacity = useTransform(phaseProgress, [0, 0.5, 1], [0, 1, 1]);
    const phaseScale = useTransform(phaseProgress, [0, 1], [0.96, 1]);

    return (
        <motion.div
            ref={phaseRef}
            style={{ y: phaseY, opacity: phaseOpacity, scale: phaseScale }}
            className={`bg-black p-8 relative overflow-hidden group ${phase.status === 'active' && isSessionActive ? 'border-l-2 border-white' : ''
                }`}
            whileHover={{ backgroundColor: 'rgba(255, 255, 255, 0.02)' }}
        >
            {!isSessionActive && phase.status !== 'verified' && (
                <div className="absolute inset-0 bg-black/60 backdrop-blur-[1px] z-10 pointer-events-none" />
            )}

            <div className="flex justify-between items-start mb-8">
                <span className={`text-xs font-bold tracking-widest ${phase.status === 'active' && isSessionActive ? 'text-white' : 'text-white/30'
                    }`}>
                    {phase.day}
                </span>
                {phase.status === 'verified' ? (
                    <PulseActivity size={16} className="text-white" />
                ) : phase.status === 'active' && isSessionActive ? (
                    <NeuralCore size={16} className="text-white" />
                ) : (
                    <SecureLock size={16} className="text-white/20" />
                )}
            </div>

            <h4 className={`text-xl font-black mb-4 tracking-tight ${phase.status === 'active' && isSessionActive ? 'text-white' : 'text-white/40'
                }`}>
                {phase.title}
            </h4>

            <div className="w-full h-px bg-white/5 overflow-hidden">
                <motion.div
                    initial={{ width: 0 }}
                    whileInView={{
                        width: phase.status === 'verified' ? '100%' :
                            (phase.status === 'active' && isSessionActive) ? '40%' : '0%'
                    }}
                    viewport={{ once: true }}
                    className="h-full bg-white"
                    transition={{ duration: 1, ease: "easeOut" }}
                />
            </div>
        </motion.div>
    );
};

export default Dashboard;
