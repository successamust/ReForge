import React from 'react';

const CyberBackground = () => {
    return (
        <div className="fixed inset-0 pointer-events-none z-0 overflow-hidden">
            {/* Base Dark Void */}
            <div className="absolute inset-0 bg-[#050505]" />

            {/* CRT Scanline Overlay */}
            <div className="crt-overlay" />

            {/* Digital Grid / Noise */}
            <div className="absolute inset-0 opacity-[0.03]"
                style={{
                    backgroundImage: `linear-gradient(#fff 1px, transparent 1px), linear-gradient(90deg, #fff 1px, transparent 1px)`,
                    backgroundSize: '40px 40px'
                }}
            />

            {/* Subtle Vignette */}
            <div className="absolute inset-0 shadow-[inset_0_0_150px_rgba(0,0,0,1)]" />

            {/* Glowing Red Pulse (Bottom) */}
            <div className="absolute bottom-0 left-0 right-0 h-64 bg-gradient-to-t from-red-900/10 to-transparent pointer-events-none" />
        </div>
    );
};

export default CyberBackground;
