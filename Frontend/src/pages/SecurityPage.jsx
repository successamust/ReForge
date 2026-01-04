import React from 'react';
import SEO from '../components/SEO';
import { Shield, Lock, Eye, AlertTriangle } from 'lucide-react';

const SecurityPage = () => {
    return (
        <div className="min-h-screen bg-black pt-32 pb-24">
            <SEO title="Security" description="Our commitment to your data and code security." />
            <div className="container mx-auto px-6 max-w-4xl">
                <div className="mb-12 text-center">
                    <div className="inline-flex items-center justify-center w-16 h-16 bg-white/5 border border-white/10 rounded-full mb-6">
                        <Shield className="text-white" size={32} />
                    </div>
                    <h1 className="text-4xl md:text-5xl font-black text-white mb-4 tracking-tighter uppercase">Security Protocol</h1>
                    <p className="text-white/40 text-lg font-medium mx-auto max-w-xl">
                        Ensuring the integrity of your code and the protection of your intellectual capital.
                    </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-16">
                    <div className="p-8 bg-white/5 border border-white/10 rounded-2xl">
                        <div className="flex items-center gap-4 mb-6">
                            <Lock className="text-white/60" size={24} />
                            <h3 className="text-white font-bold text-lg">Encryption</h3>
                        </div>
                        <p className="text-white/40 text-sm leading-relaxed">
                            All data is encrypted at rest using AES-256 and in transit via TLS 1.3. Your submissions are your own; we never train models on your private code.
                        </p>
                    </div>

                    <div className="p-8 bg-white/5 border border-white/10 rounded-2xl">
                        <div className="flex items-center gap-4 mb-6">
                            <Eye className="text-white/60" size={24} />
                            <h3 className="text-white font-bold text-lg">Sandboxing</h3>
                        </div>
                        <p className="text-white/40 text-sm leading-relaxed">
                            Code execution happens in isolated gVisor-hardened containers. Your local environment is never at risk, and resources are strictly governed.
                        </p>
                    </div>
                </div>

                <div className="bg-white/5 border border-white/10 rounded-3xl p-12 relative overflow-hidden">
                    <div className="absolute top-0 right-0 p-8 opacity-5">
                        <AlertTriangle size={120} />
                    </div>
                    <div className="relative z-10 max-w-2xl">
                        <h2 className="text-2xl font-black text-white mb-6 uppercase tracking-tight">Report a Vulnerability</h2>
                        <p className="text-white/60 mb-8 leading-relaxed">
                            We operate a private bug bounty program for security researchers. If you believe you've found a security vulnerability in ReForge, please report it immediately.
                        </p>
                        <a href="mailto:security@reforge.app" className="inline-block py-4 px-8 bg-white text-black font-black text-sm uppercase tracking-widest hover:bg-white/90 transition-all">
                            Initiate Protocol
                        </a>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default SecurityPage;
