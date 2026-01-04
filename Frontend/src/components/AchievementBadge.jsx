import React from 'react';
import {
    NeuralCore, AchievementTrophy,
    EnergyZap, PrecisionTarget, RunPlay, Sparkles, PulseActivity, SecureLock
} from './icons/CustomIcons';

const BADGE_CONFIG = {
    FIRST_BLOOD: { tier: 'bronze', icon: RunPlay, label: 'First Blood', color: 'text-orange-400' },
    SPEED_DEMON: { tier: 'silver', icon: EnergyZap, label: 'Speed Demon', color: 'text-yellow-400' },
    SHARPSHOOTER: { tier: 'silver', icon: PrecisionTarget, label: 'Sharpshooter', color: 'text-red-400' },
    POLYGLOT: { tier: 'gold', icon: NeuralCore, label: 'Polyglot', color: 'text-purple-400' },
    STREAK_7: { tier: 'bronze', icon: PulseActivity, label: 'Week Warrior', color: 'text-orange-400' },
    STREAK_30: { tier: 'gold', icon: PulseActivity, label: 'Monthly Master', color: 'text-red-500' },
    POINTS_100: { tier: 'bronze', icon: Sparkles, label: 'Centurion', color: 'text-blue-400' },
    POINTS_1000: { tier: 'gold', icon: Sparkles, label: 'Kilo-Crusher', color: 'text-purple-400' },
    ALL_COMPLETE: { tier: 'diamond', icon: AchievementTrophy, label: 'The Reforged', color: 'text-cyan-400' },

    JAVASCRIPT_INITIATE: { tier: 'bronze', text: 'JS', label: 'JS Initiate', color: 'text-yellow-300' },
    JAVASCRIPT_7: { tier: 'silver', text: 'JS', label: 'JS Scholar', color: 'text-yellow-300' },
    JAVASCRIPT_15: { tier: 'gold', text: 'JS', label: 'JS Expert', color: 'text-yellow-300' },
    JAVASCRIPT_30: { tier: 'platinum', text: 'JS', label: 'JS Master', color: 'text-yellow-300' },

    PYTHON_INITIATE: { tier: 'bronze', text: 'PY', label: 'Python Initiate', color: 'text-blue-400' },
    PYTHON_7: { tier: 'silver', text: 'PY', label: 'Python Scholar', color: 'text-blue-400' },
    PYTHON_15: { tier: 'gold', text: 'PY', label: 'Python Expert', color: 'text-blue-400' },
    PYTHON_30: { tier: 'platinum', text: 'PY', label: 'Python Master', color: 'text-blue-400' },

    JAVA_INITIATE: { tier: 'bronze', text: 'JV', label: 'Java Initiate', color: 'text-red-400' },
    JAVA_7: { tier: 'silver', text: 'JV', label: 'Java Scholar', color: 'text-red-400' },
    JAVA_15: { tier: 'gold', text: 'JV', label: 'Java Expert', color: 'text-red-400' },
    JAVA_30: { tier: 'platinum', text: 'JV', label: 'Java Master', color: 'text-red-400' },

    GO_INITIATE: { tier: 'bronze', text: 'GO', label: 'Go Initiate', color: 'text-cyan-400' },
    GO_7: { tier: 'silver', text: 'GO', label: 'Go Scholar', color: 'text-cyan-400' },
    GO_15: { tier: 'gold', text: 'GO', label: 'Go Expert', color: 'text-cyan-400' },
    GO_30: { tier: 'platinum', text: 'GO', label: 'Go Master', color: 'text-cyan-400' },

    CSHARP_INITIATE: { tier: 'bronze', text: 'C#', label: 'C# Initiate', color: 'text-purple-400' },
    CSHARP_7: { tier: 'silver', text: 'C#', label: 'C# Scholar', color: 'text-purple-400' },
    CSHARP_15: { tier: 'gold', text: 'C#', label: 'C# Expert', color: 'text-purple-400' },
    CSHARP_30: { tier: 'platinum', text: 'C#', label: 'C# Master', color: 'text-purple-400' },
};

const BadgeShapes = {
    bronze: ({ className, children, locked }) => (
        <div className={`rounded-full border-2 ${locked ? 'border-white/10 bg-white/5' : className} aspect-square flex items-center justify-center transition-all duration-300`}>
            {children}
        </div>
    ),
    silver: ({ className, children, locked }) => (
        <div className={`rounded-lg border-2 rotate-45 ${locked ? 'border-white/10 bg-white/5' : className} aspect-square flex items-center justify-center transition-all duration-300`}>
            <div className="-rotate-45">
                {children}
            </div>
        </div>
    ),
    gold: ({ className, children, locked }) => (
        <div className="relative flex items-center justify-center w-full h-full">
            <svg viewBox="0 0 100 100" className={`w-full h-full ${locked ? 'stroke-white/10 fill-white/5' : className.replace('bg-', 'fill-').replace('border-', 'stroke-')}`} strokeWidth="2.5" fill="none">
                <path d="M50 2 L95 25 L95 75 L50 98 L5 75 L5 25 Z" />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
                {children}
            </div>
        </div>
    ),
    platinum: ({ className, children, locked }) => (
        <div className="relative flex items-center justify-center w-full h-full">
            <svg viewBox="0 0 100 100" className={`w-full h-full ${locked ? 'stroke-white/10 fill-white/5' : className.replace('bg-', 'fill-').replace('border-', 'stroke-')}`} strokeWidth="3" fill="none">
                <path d="M50 0 L100 20 L85 95 L50 100 L15 95 L0 20 Z" />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center mb-1">
                {children}
            </div>
        </div>
    ),
    diamond: ({ className, children, locked }) => (
        <div className="relative flex items-center justify-center w-full h-full">
            <svg viewBox="0 0 100 100" className={`w-full h-full ${locked ? 'stroke-white/10 fill-white/5' : className.replace('bg-', 'fill-').replace('border-', 'stroke-')}`} strokeWidth="3" fill="none">
                <path d="M50 0 L65 35 L100 50 L65 65 L50 100 L35 65 L0 50 L35 35 Z" />
            </svg>
            <div className="absolute inset-0 flex items-center justify-center">
                {children}
            </div>
        </div>
    )
};

const TIER_STYLES = {
    bronze: "border-orange-700/60 bg-orange-900/20",
    silver: "border-slate-400/60 bg-slate-800/20",
    gold: "stroke-yellow-500/60 fill-yellow-900/20",
    platinum: "stroke-indigo-400/80 fill-indigo-900/25",
    diamond: "stroke-cyan-400 fill-cyan-950/40",
};

const AchievementBadge = ({ type, size = "md", locked = false, showLabel = false }) => {
    const config = BADGE_CONFIG[type] || { tier: 'bronze', text: '??', color: 'text-gray-400' };
    const Icon = config.icon;
    const ShapeContainer = BadgeShapes[config.tier] || BadgeShapes.bronze;
    const tierStyle = TIER_STYLES[config.tier];

    const sizeClasses = {
        sm: "w-10 h-10 text-xs",
        md: "w-16 h-16 text-lg",
        lg: "w-24 h-24 text-2xl"
    };

    const iconSizes = {
        sm: 12,
        md: 20,
        lg: 32
    };

    return (
        <div className={`flex flex-col items-center gap-3 transition-all duration-500 ${locked ? 'opacity-40 grayscale' : 'opacity-100 group/badge cursor-default'}`}>
            <div className={`${sizeClasses[size]} relative transition-all duration-300 ${!locked ? 'group-hover/badge:scale-110' : 'group-hover/badge:opacity-100 group-hover/badge:grayscale-0'}`}>

                {/* Unified Glow Effect for all unlocked badges */}
                {!locked && (
                    <>
                        <div className="absolute inset-0 bg-white/5 blur-xl rounded-full opacity-0 group-hover/badge:opacity-100 transition-opacity duration-500" />
                        <div className="absolute inset-0 overflow-hidden pointer-events-none opacity-0 group-hover/badge:opacity-100 transition-opacity duration-700 rounded-full">
                            <div className="w-[200%] h-full absolute top-0 left-[-100%] bg-gradient-to-r from-transparent via-white/10 to-transparent transform -skew-x-12 animate-shimmer" />
                        </div>
                    </>
                )}

                <ShapeContainer className={tierStyle} locked={locked}>
                    {Icon ? (
                        <Icon size={iconSizes[size]} className={locked ? 'text-white/30' : config.color} />
                    ) : (
                        <span className={`font-black tracking-tighter ${locked ? 'text-white/30' : config.color}`}>
                            {config.text}
                        </span>
                    )}
                </ShapeContainer>

                {/* Consistent Lock Positioning - outside the shape for absolute anchor */}
                {locked && (
                    <div className="absolute -top-1 -right-1 bg-black border border-white/20 rounded-full p-1.5 shadow-xl z-10 group-hover/badge:border-white/40 transition-colors">
                        <SecureLock size={size === 'sm' ? 10 : 12} className="text-white/60" />
                    </div>
                )}
            </div>

            {showLabel && (
                <div className="text-center">
                    <p className={`font-bold text-[10px] uppercase tracking-widest ${locked ? 'text-white/40' : config.color} opacity-90 transition-colors duration-300 group-hover/badge:text-white`}>
                        {config.label}
                    </p>
                </div>
            )}
        </div>
    );
};

export default AchievementBadge;
