import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';

const GlitchLines = () => {
    const [lines] = useState(() => Array.from({ length: 20 }, (_, i) => ({
        id: i,
        top: Math.random() * 100,
        opacity: Math.random()
    })));

    return (
        <>
            {lines.map((line) => (
                <div
                    key={line.id}
                    className="absolute h-px bg-white w-full"
                    style={{ top: `${line.top}%`, opacity: line.opacity }}
                />
            ))}
        </>
    );
};

const NotFoundPage = () => {
    return (
        <div className="min-h-screen bg-black flex flex-col items-center justify-center p-6 relative overflow-hidden font-mono">
            {/* Glitch Background */}
            <div className="absolute inset-0 opacity-[0.05] pointer-events-none">
                <GlitchLines />
            </div>

            <div className="max-w-2xl w-full z-10">
                <motion.div
                    initial={{ opacity: 0, scale: 0.95 }}
                    animate={{ opacity: 1, scale: 1 }}
                    className="border-l-4 border-red-500 bg-red-500/5 p-8 backdrop-blur-sm"
                >
                    <div className="flex items-center gap-4 mb-6">
                        <div className="w-3 h-3 bg-red-500 rounded-none animate-pulse" />
                        <h1 className="text-red-500 font-bold tracking-[0.2em] text-sm uppercase">
                            System Error: 404_PAGE_NOT_FOUND
                        </h1>
                    </div>

                    <h2 className="text-4xl md:text-6xl font-black text-white mb-8 tracking-tighter">
                        KERNEL PANIC
                    </h2>

                    <div className="font-mono text-sm text-white/60 mb-8 space-y-2 bg-black/50 p-6 border border-white/10">
                        <p className="text-red-400">{`> FATAL EXCEPTION IN THREAD "MAIN"`}</p>
                        <p>{`> at com.reforge.navigation.Router.resolve(Router.js:404)`}</p>
                        <p>{`> at com.reforge.core.Kernel.boot(Kernel.js:120)`}</p>
                        <p className="text-white/30 pt-2">{`// The anticipated resource was not allocated in the memory heap.`}</p>
                        <p className="text-white/30">{`// Please verify your navigation coordinates.`}</p>
                    </div>

                    <div className="flex gap-4">
                        <Link to="/">
                            <Button className="border-red-500/50 hover:bg-red-500/10 text-red-500">
                                REBOOT_SYSTEM // HOME
                            </Button>
                        </Link>
                        <button onClick={() => window.history.back()} className="px-6 py-3 text-white/40 hover:text-white uppercase text-xs font-bold tracking-widest transition-colors">
                            &lt; ROLLBACK
                        </button>
                    </div>
                </motion.div>

                <div className="mt-8 text-center">
                    <p className="text-xs text-white/20 uppercase tracking-[0.5em]">
                        Memory Dump Complete
                    </p>
                </div>
            </div>
        </div>
    );
};

export default NotFoundPage;
