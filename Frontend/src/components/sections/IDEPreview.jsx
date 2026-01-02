import React, { useState, useContext, useRef } from 'react';
import { motion, AnimatePresence, useScroll, useTransform } from 'framer-motion';
import Button from '../ui/Button';
import { CodeFile, Processor, RunPlay, SecureLock } from '../icons/CustomIcons';
import { AppContext } from '../../context/AppContext';

const IDEPreview = () => {
    const { isSessionActive, addNotification } = useContext(AppContext);
    const [activeTab, setActiveTab] = useState('algorithm.go');
    const [isRunning, setIsRunning] = useState(false);
    const [output, setOutput] = useState([
        { type: 'info', text: 'System Kernel v4.2.0 initialized.' },
        { type: 'info', text: 'Waiting for manual node synchronization...' }
    ]);

    const runSimulation = () => {
        if (!isSessionActive) {
            addNotification({
                type: 'warning',
                title: 'Sync Required',
                message: 'Please initiate the detox session from the bridge first.'
            });
            return;
        }

        setIsRunning(true);
        setOutput(prev => [...prev, { type: 'cmd', text: '> executing manual_recon.sh' }]);

        setTimeout(() => {
            setOutput(prev => [
                ...prev,
                { type: 'info', text: '[recon] verifying logic flow...' },
                { type: 'success', text: '✓ ALGORITHM SYNCHRONIZED. COMPONENT STABLE.' },
                { type: 'success', text: 'EXECUTION_ACCURACY: 98.4%' }
            ]);
            setIsRunning(false);
        }, 2000);
    };

    const files = [
        { name: 'algorithm.go', icon: CodeFile, color: 'text-blue-400' },
        { name: 'memory.h', icon: Processor, color: 'text-purple-400' },
    ];

    const codeData = `package rehab_core

import "reforge/sync"

type SyncBuffer struct {
    data []byte
    head int
    tail int
}

func (s *SyncBuffer) Push(b byte) {
    // Manual logic only:
    s.data[s.tail] = b
    s.tail = (s.tail + 1) % len(s.data)
    
    // STATUS: [STABLE]
}`;

    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    });

    const containerY = useTransform(scrollYProgress, [0, 1], [100, -100]);
    const containerOpacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
    const codeY = useTransform(scrollYProgress, [0, 1], [-50, 50]);

    return (
        <section ref={ref} id="curriculum" className="relative py-40 bg-black overflow-hidden">
            <div className="container mx-auto px-6">
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-24 items-center">
                    <motion.div
                        style={{ y: containerY, opacity: containerOpacity }}
                    >
                        <div className="inline-flex items-center gap-3 px-4 py-2 border border-white/10 bg-white/[0.02] mb-8">
                            <div className="w-1.5 h-1.5 bg-white rounded-none" />
                            <span className="text-[10px] font-mono text-white/60 tracking-[0.3em] uppercase">
                                Curriculum Module 01
                            </span>
                        </div>
                        <h2 className="text-[clamp(3rem,8vw,7rem)] font-black leading-[0.9] tracking-[-0.02em] text-white mb-8">
                            Algorithm Reconstruction
                        </h2>
                        <p className="text-white/60 font-light text-lg leading-relaxed max-w-lg mb-12">
                            Break the habit of automated dependence. We strip away the assistance and force you to rebuild core data structures from the ground up. Reclaim your technical autonomy.
                        </p>

                        <div className="grid grid-cols-1 sm:grid-cols-2 gap-px bg-white/5">
                            {[
                                { title: 'No Autocomplete', desc: 'Syntax is structural.' },
                                { title: 'Logic Synthesis', desc: 'First Principles Only.' }
                            ].map((item, i) => (
                                <div key={i} className="bg-black p-6 border border-white/10">
                                    <h4 className="text-white font-bold uppercase text-xs tracking-widest mb-2">{item.title}</h4>
                                    <p className="text-white/40 text-xs font-light uppercase leading-relaxed">{item.desc}</p>
                                </div>
                            ))}
                        </div>
                    </motion.div>

                    <motion.div
                        style={{ y: codeY, opacity: containerOpacity }}
                        className={`bg-black border border-white/10 transition-all duration-700 ${isSessionActive ? 'border-white/20' : ''}`}
                    >
                        <div className="flex items-center justify-between px-6 py-4 border-b border-white/10 bg-white/[0.02]">
                            <div className="flex gap-2">
                                {files.map(file => (
                                    <button
                                        key={file.name}
                                        onClick={() => setActiveTab(file.name)}
                                        className={`flex items-center gap-2 px-4 py-2 text-xs font-bold tracking-widest uppercase transition-colors ${activeTab === file.name
                                            ? 'text-white border-b-2 border-white'
                                            : 'text-white/40 hover:text-white/60'
                                            }`}
                                    >
                                        <file.icon size={14} className="text-white" />
                                        {file.name}
                                    </button>
                                ))}
                            </div>
                            <button
                                onClick={runSimulation}
                                disabled={isRunning || !isSessionActive}
                                className="px-4 py-2 bg-white text-black text-xs font-bold uppercase tracking-widest hover:bg-white/90 transition-all disabled:opacity-50 disabled:cursor-not-allowed flex items-center gap-2"
                            >
                                {isRunning ? (
                                    <>
                                        <div className="w-3 h-3 border border-black border-t-transparent rounded-full animate-spin" />
                                        Running
                                    </>
                                ) : isSessionActive ? (
                                    <>
                                        <RunPlay size={14} />
                                        Run
                                    </>
                                ) : (
                                    <>
                                        <SecureLock size={14} />
                                        Locked
                                    </>
                                )}
                            </button>
                        </div>

                        <div className="relative h-[500px] font-mono text-sm overflow-hidden bg-black/50">
                            <AnimatePresence>
                                {!isSessionActive && (
                                    <motion.div
                                        initial={{ opacity: 0 }}
                                        animate={{ opacity: 1 }}
                                        exit={{ opacity: 0 }}
                                        className="absolute inset-0 z-20 bg-black/80 backdrop-blur-sm flex items-center justify-center p-8 text-center"
                                    >
                                        <div>
                                            <p className="text-white font-black uppercase tracking-[0.2em] mb-4">Manual Mode Locked</p>
                                            <p className="text-white/20 text-[10px] uppercase font-bold tracking-widest">Initiate detox to unlock workstation.</p>
                                        </div>
                                    </motion.div>
                                )}
                            </AnimatePresence>

                            <div className="p-8 h-full overflow-auto">
                                <pre className="text-white/70 leading-relaxed">
                                    {codeData.split('\n').map((line, i) => (
                                        <div key={i} className="hover:bg-white/5 transition-colors px-4 -mx-4 rounded flex gap-6">
                                            <span className="w-8 text-white/20 select-none text-right font-mono text-xs">{i + 1}</span>
                                            <span className={!isSessionActive ? 'blur-[2px] pointer-events-none transition-all' : 'transition-all'}>
                                                {line.startsWith('//') ? (
                                                    <span className="text-white/40 italic">{line}</span>
                                                ) : (
                                                    line.split(' ').map((word, j) => (
                                                        <span key={j} className={
                                                            ['package', 'import', 'type', 'struct', 'func', 'if', 'return'].includes(word) ? 'text-white' :
                                                                ['s', 'b', 'Push', 'data', 'head', 'tail', 'byte', 'len'].includes(word.replace(/[().,;]/g, '')) ? 'text-white/80' :
                                                                    word.startsWith('"') ? 'text-white/60' : 'text-white/70'
                                                        }>
                                                            {word}{' '}
                                                        </span>
                                                    ))
                                                )}
                                            </span>
                                        </div>
                                    ))}
                                </pre>
                            </div>
                        </div>

                        <div className="border-t border-white/10 bg-black p-6 font-mono text-xs min-h-[160px]">
                            <div className="flex items-center gap-3 text-white/40 mb-4 font-bold uppercase tracking-widest">
                                <Processor size={14} className="text-white/60" />
                                <span>OUTPUT</span>
                            </div>
                            <div className="space-y-2">
                                {output.map((line, i) => (
                                    <p key={i} className={
                                        line.type === 'success' ? 'text-white font-bold' :
                                            line.type === 'cmd' ? 'text-white/80 font-semibold' : 'text-white/50'
                                    }>
                                        {line.text}
                                    </p>
                                ))}
                                {isRunning && (
                                    <motion.span
                                        animate={{ opacity: [0, 1, 0] }}
                                        transition={{ repeat: Infinity, duration: 1 }}
                                        className="inline-block w-2 h-4 bg-white align-middle ml-1"
                                    />
                                )}
                            </div>
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
};

export default IDEPreview;
