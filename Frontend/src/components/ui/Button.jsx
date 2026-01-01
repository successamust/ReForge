import React from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import { clsx } from 'clsx';
import { twMerge } from 'tailwind-merge';

const cn = (...inputs) => twMerge(clsx(inputs));

const Button = ({
    children,
    variant = 'primary',
    size = 'md',
    className,
    isLoading,
    icon: Icon,
    to,
    ...props
}) => {
    const variants = {
        primary: 'bg-white text-black hover:bg-white/90',
        secondary: 'bg-white/[0.02] text-white border border-white/10 hover:bg-white/[0.05] hover:border-white/20',
        ghost: 'bg-transparent text-white/60 hover:text-white hover:bg-white/[0.02]',
        outline: 'bg-transparent border border-white/20 text-white hover:bg-white/[0.02]',
    };

    const sizes = {
        sm: 'px-4 py-2 text-xs',
        md: 'px-6 py-3 text-sm',
        lg: 'px-8 py-4 text-base',
    };

    const baseClasses = cn(
        'relative inline-flex items-center justify-center gap-2 font-bold transition-all duration-300 disabled:opacity-50 disabled:cursor-not-allowed overflow-hidden',
        variants[variant],
        sizes[size],
        className
    );

    const buttonContent = (
        <>
            {isLoading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
            ) : (
                <>
                    {Icon && <Icon size={18} />}
                    {children}
                </>
            )}

            {/* Subtle hover effect */}
            {variant === 'primary' && (
                <motion.div
                    className="absolute inset-0 bg-white/10"
                    initial={{ x: '-100%' }}
                    whileHover={{ x: '100%' }}
                    transition={{ duration: 0.6, ease: "easeInOut" }}
                />
            )}
        </>
    );

    if (to) {
        return (
            <Link to={to} className={baseClasses}>
                <motion.div
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full h-full flex items-center justify-center gap-2"
                >
                    {buttonContent}
                </motion.div>
            </Link>
        );
    }

    return (
        <motion.button
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
            className={baseClasses}
            {...props}
        >
            {buttonContent}
        </motion.button>
    );
};

export default Button;
