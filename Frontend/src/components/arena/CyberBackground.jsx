import React from 'react';
import { motion } from 'framer-motion';

const CyberBackground = ({ intensity = 0 }) => {
    // intensity is 0 to 1
    return (
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
            {/* Base Dark Void */}
            <div className="absolute inset-0 bg-[#050505]" />

            {/* CRT Scanline Overlay */}
            <div className="crt-overlay" />

            {/* Digital Grid / Noise */}
            <motion.div
                className="absolute inset-0"
                style={{
                    backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`,
                    backgroundSize: '40px 40px',
                    opacity: 0.03 + (intensity * 0.05)
                }}
            />

            {/* Subtle Vignette */}
            <div className="absolute inset-0 shadow-[inset_0_0_150px_rgba(0,0,0,1)]" />

            {/* Glowing Red Pulse (Bottom) */}
            <motion.div
                animate={{
                    height: 256 + (intensity * 200),
                    opacity: 0.1 + (intensity * 0.3)
                }}
                className="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-red-600/20 to-transparent pointer-events-none"
            />

            {/* Glitch Strips at high intensity */}
            {intensity > 0.7 && (
                <div className="absolute inset-0 overflow-hidden opacity-20">
                    <div className="absolute top-1/4 left-0 w-full h-px bg-red-500 animate-[glitch-line_2s_infinite]" />
                    <div className="absolute top-3/4 left-0 w-full h-px bg-white animate-[glitch-line_1.5s_infinite]" />
                </div>
            )}
        </div>
    );
};

export default CyberBackground;
