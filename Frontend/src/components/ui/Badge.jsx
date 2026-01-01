import React from 'react';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

const cn = (...inputs) => twMerge(clsx(inputs));

const Badge = ({ children, variant = 'default', className }) => {
    const variants = {
        default: 'bg-white/5 text-white/40 border-white/10',
        primary: 'bg-white/10 text-white border-white/20',
        success: 'bg-green-500/10 text-green-500 border-green-500/30',
        warning: 'bg-yellow-500/10 text-yellow-500 border-yellow-500/30',
    };

    return (
        <span className={cn(
            'inline-flex items-center gap-1.5 px-3 py-1 border text-[10px] font-bold uppercase tracking-wider backdrop-blur-sm',
            variants[variant],
            className
        )}>
            {children}
        </span>
    );
};

export default Badge;
