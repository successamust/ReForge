import React from 'react';
import { Github, Twitter, Linkedin, Terminal } from 'lucide-react';
import Badge from './ui/Badge';

const Footer = () => {
    return (
        <footer className="bg-black border-t border-white/5 py-24 relative overflow-hidden">
            <div className="container mx-auto px-6 relative z-10">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-24">
                    <div className="md:col-span-2">
                        <div className="flex items-center gap-3 mb-6">
                            <span className="text-white font-black tracking-tighter text-xl">ReForge</span>
                        </div>
                        <p className="text-gray-500 font-medium max-w-sm leading-relaxed mb-8">
                            The world's most rigorous coding challenge. Built for the next generation of software engineers.
                        </p>
                        <div className="flex gap-4">
                            {[Github, Twitter, Linkedin].map((Icon, i) => (
                                <a key={i} href="#" className="w-10 h-10 rounded-xl bg-white/2 border border-white/5 flex items-center justify-center text-gray-400 hover:text-white hover:border-white/20 transition-all">
                                    <Icon size={18} />
                                </a>
                            ))}
                        </div>
                    </div>

                    <div>
                        <h4 className="text-white font-black uppercase text-xs tracking-[0.2em] mb-8">Platform</h4>
                        <ul className="space-y-4">
                            {['Curriculum', 'Leaderboard', 'Achievements', 'Pricing'].map(item => (
                                <li key={item}>
                                    <a href="#" className="text-gray-500 hover:text-white font-bold text-sm transition-colors">{item}</a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div>
                        <h4 className="text-white font-black uppercase text-xs tracking-[0.2em] mb-8">System</h4>
                        <ul className="space-y-4">
                            {['Status', 'Docs', 'API Reference', 'Security'].map(item => (
                                <li key={item}>
                                    <a href="#" className="text-gray-500 hover:text-white font-bold text-sm transition-colors">{item}</a>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>

                <div className="pt-12 border-t border-white/5 flex flex-col md:flex-row justify-between items-center gap-8">
                    <div className="flex items-center gap-6">
                        <p className="text-gray-600 text-[10px] font-black uppercase tracking-widest">
                            &copy; 2025 ReForge. All rights reserved.
                        </p>
                        <Badge variant="default" className="text-[8px]">v4.2.0-stable</Badge>
                    </div>
                    <div className="flex gap-8">
                        <a href="#" className="text-gray-600 hover:text-white text-[10px] font-black uppercase tracking-widest transition-colors">Privacy</a>
                        <a href="#" className="text-gray-600 hover:text-white text-[10px] font-black uppercase tracking-widest transition-colors">Terms</a>
                    </div>
                </div>
            </div>

        </footer>
    );
};

export default Footer;
