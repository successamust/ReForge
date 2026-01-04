import { motion, AnimatePresence } from 'framer-motion';
import { Award, Star, Zap, Trophy, ShieldCheck } from 'lucide-react';

const icons = {
    STREAK: Star,
    POINTS: Zap,
    LANGUAGE: Trophy,
    FIRST_BLOOD: ShieldCheck,
    DEFAULT: Award
};

const AchievementToast = ({ achievement, onClose }) => {
    if (!achievement) return null;

    const Icon = Object.entries(icons).find(([key]) =>
        achievement.type.includes(key))?.[1] || icons.DEFAULT;

    return (
        <motion.div
            initial={{ x: 300, opacity: 0 }}
            animate={{ x: 0, opacity: 1 }}
            exit={{ x: 300, opacity: 0 }}
            className="fixed bottom-24 right-6 z-[100] bg-zinc-900/90 backdrop-blur-xl border border-white/20 p-4 w-72 shadow-2xl overflow-hidden"
        >
            <div className="absolute top-0 left-0 w-1 h-full bg-white animate-pulse" />

            <div className="flex items-center gap-4">
                <div className="p-3 bg-white text-black">
                    <Icon size={24} strokeWidth={2.5} />
                </div>
                <div className="flex-1">
                    <span className="text-[10px] uppercase tracking-[0.2em] text-white/40 font-bold block mb-1">
                        Rehabilitation Achievement
                    </span>
                    <h4 className="text-white font-black uppercase tracking-wider leading-none">
                        {achievement.type.replace(/_/g, ' ')}
                    </h4>
                </div>
            </div>

            <div className="mt-4 flex justify-between items-end">
                <span className="text-[10px] font-mono text-white/30">
                    ID: {achievement._id?.substring(0, 8) || 'SYNCED'}
                </span>
                <button
                    onClick={onClose}
                    className="text-[10px] font-bold uppercase tracking-widest text-white/60 hover:text-white"
                >
                    Dismiss
                </button>
            </div>

            {/* Decorative glitch squares */}
            <div className="absolute -bottom-1 -right-1 w-4 h-4 bg-white/5 rotate-45" />
        </motion.div>
    );
};

export default AchievementToast;
