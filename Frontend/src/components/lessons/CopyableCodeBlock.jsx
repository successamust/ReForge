import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { vscDarkPlus } from 'react-syntax-highlighter/dist/esm/styles/prism';

const CopyableCodeBlock = ({ code, language = 'python', title = '', showLineNumbers = false }) => {
    const [copied, setCopied] = useState(false);

    const handleCopy = async () => {
        try {
            await navigator.clipboard.writeText(code);
            setCopied(true);
            setTimeout(() => setCopied(false), 2000);
        } catch (err) {
            console.error('Failed to copy:', err);
        }
    };

    return (
        <div className="relative group">
            <div className="bg-[#1e1e1e] border border-white/10 rounded overflow-hidden transition-all hover:border-white/20">
                {/* Header */}
                <div className="flex items-center justify-between px-4 py-2 bg-white/[0.02] border-b border-white/5">
                    {title && (
                        <span className="text-xs font-bold uppercase tracking-widest text-white/60">
                            {title}
                        </span>
                    )}
                    <div className="flex items-center gap-2">
                        <span className="text-xs font-mono text-white/40">{language}</span>
                        <button
                            onClick={handleCopy}
                            className="relative px-2 py-1 text-xs font-bold uppercase tracking-wider text-white/60 hover:text-white transition-colors"
                        >
                            <AnimatePresence mode="wait">
                                {copied ? (
                                    <motion.span
                                        key="copied"
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: 10 }}
                                        className="text-green-400"
                                    >
                                        ✓ Copied!
                                    </motion.span>
                                ) : (
                                    <motion.span
                                        key="copy"
                                        initial={{ opacity: 0, y: -10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        exit={{ opacity: 0, y: 10 }}
                                    >
                                        Copy
                                    </motion.span>
                                )}
                            </AnimatePresence>
                        </button>
                    </div>
                </div>

                {/* Code Content */}
                <div className="relative overflow-x-auto">
                    <SyntaxHighlighter
                        language={language}
                        style={vscDarkPlus}
                        showLineNumbers={showLineNumbers}
                        customStyle={{
                            margin: 0,
                            padding: '1rem',
                            background: 'transparent',
                            fontSize: '0.875rem',
                            lineHeight: '1.5'
                        }}
                        codeTagProps={{
                            style: {
                                fontFamily: "'Geist Mono', 'Monaco', 'Courier New', monospace"
                            }
                        }}
                    >
                        {code}
                    </SyntaxHighlighter>
                </div>
            </div>

            {/* Hover effect */}
            <motion.div
                className="absolute -inset-0.5 bg-gradient-to-r from-purple-500/20 via-pink-500/20 to-purple-500/20 rounded -z-10 opacity-0 group-hover:opacity-100 blur-sm transition-opacity"
                animate={{ backgroundPosition: ['0% 50%', '100% 50%', '0% 50%'] }}
                transition={{ duration: 3, repeat: Infinity, ease: 'linear' }}
                style={{ backgroundSize: '200% 100%' }}
            />
        </div>
    );
};

export default CopyableCodeBlock;
