import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

const cn = (...inputs) => twMerge(clsx(inputs));

const GlassContainer = ({ children, className, intensity = 'medium', glow = false }) => {
    const intensities = {
        low: 'bg-white/2 backdrop-blur-sm',
        medium: 'bg-white/5 backdrop-blur-md',
        high: 'bg-white/10 backdrop-blur-xl',
    };

    return (
        <div className={cn(
            'rounded-2xl border border-white/10 relative overflow-hidden',
            intensities[intensity],
            glow && 'shadow-[0_0_30px_rgba(168,85,247,0.1)]',
            className
        )}>
            {children}
        </div>
    );
};

export default GlassContainer;
