import React from 'react';
import { motion } from 'framer-motion';
import GlassContainer from '../ui/GlassContainer';
import Badge from '../ui/Badge';
import { CheckCircle2, Lock, PlayCircle } from 'lucide-react';

const CourseRoadmap = () => {
    const days = Array.from({ length: 30 }, (_, i) => ({
        day: i + 1,
        status: i < 5 ? 'completed' : i === 5 ? 'active' : 'locked',
        title: `Day ${i + 1}: ${i < 10 ? 'Fundamentals' : i < 20 ? 'Advanced' : 'Mastery'}`
    }));

    return (
        <section className="py-24 bg-black relative overflow-hidden">
            <div className="container mx-auto px-6">
                <div className="flex justify-between items-end mb-16">
                    <div>
                        <Badge variant="primary" className="mb-4">Standardized Timeline</Badge>
                        <h2 className="text-5xl font-black text-white italic tracking-tighter uppercase leading-none">
                            30-Day <br /> Sprint
                        </h2>
                    </div>
                    <div className="text-right hidden md:block">
                        <p className="text-white/40 font-bold text-sm uppercase tracking-widest mb-2">Completion Rate</p>
                        <p className="text-white text-3xl font-black tracking-tighter">16%</p>
                    </div>
                </div>

                <div className="grid grid-cols-2 md:grid-cols-5 lg:grid-cols-6 gap-4">
                    {days.map((day, i) => (
                        <motion.div
                            key={day.day}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ delay: i * 0.02 }}
                        >
                            <GlassContainer
                                intensity={day.status === 'active' ? 'high' : 'medium'}
                                className={`p-4 h-32 flex flex-col justify-between transition-all group ${day.status === 'active' ? 'border-white/30 shadow-[0_0_20px_rgba(255,255,255,0.1)]' : 'hover:border-white/20'
                                    }`}
                            >
                                <div className="flex justify-between items-start">
                                    <span className={`text-xs font-black italic tracking-tighter ${day.status === 'active' ? 'text-white' : 'text-white/20'
                                        }`}>
                                        D{day.day < 10 ? `0${day.day}` : day.day}
                                    </span>
                                    {day.status === 'completed' ? (
                                        <CheckCircle2 size={14} className="text-green-500" />
                                    ) : day.status === 'active' ? (
                                        <PlayCircle size={14} className="text-white animate-pulse" />
                                    ) : (
                                        <Lock size={14} className="text-white/20" />
                                    )}
                                </div>

                                <div>
                                    <div className={`w-full h-1 mb-2 ${day.status === 'completed' ? 'bg-green-500/20' :
                                        day.status === 'active' ? 'bg-white/20' : 'bg-white/5'
                                        }`}>
                                        <div className={`h-full ${day.status === 'completed' ? 'w-full bg-green-500' :
                                            day.status === 'active' ? 'w-1/2 bg-white animate-pulse' : 'w-0'
                                            }`} />
                                    </div>
                                    <p className={`text-[10px] font-bold uppercase truncate ${day.status === 'active' ? 'text-white' : 'text-white/40'
                                        }`}>
                                        {day.status === 'locked' ? 'Locked' : day.status === 'active' ? 'In Progress' : 'Verified'}
                                    </p>
                                </div>
                            </GlassContainer>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
};

export default CourseRoadmap;
