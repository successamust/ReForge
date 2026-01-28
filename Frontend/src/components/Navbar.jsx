import React, { useState, useEffect, useContext } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { Link } from 'react-router-dom';
import {
    CodeFile,
    AwardMedal,
    CodeTerminal,
    CodeShield,
    ChevronDown,
    NeuralCore,
    TrendingUp,
    Skull
} from './icons/CustomIcons';
import { AppContext } from '../context/AppContext';
import Button from './ui/Button';
import MissionTimer from './ui/MissionTimer';

import AnimatedLogo from './AnimatedLogo';

const Navbar = () => {
    const { isAuthenticated, user, logout } = useContext(AppContext);
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const [isProtocolOpen, setIsProtocolOpen] = useState(false);

    useEffect(() => {
        const handleScroll = () => setIsScrolled(window.scrollY > 20);
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    const navLinks = [
        { name: 'Lessons', href: '/lessons', icon: CodeFile },
        { name: 'Leaderboard', href: '/leaderboard', icon: AwardMedal },
        { name: 'Practice', href: '/practice', icon: CodeTerminal },
        { name: 'Arena', href: '/arena', icon: Skull, auth: true },
        { name: 'Dashboard', href: '/dashboard', icon: TrendingUp, auth: true },
        { name: 'Admin', href: '/admin', icon: CodeShield, auth: true, adminOnly: true },
    ];

    return (
        <nav className={`fixed top-0 left-0 right-0 z-[100] transition-all duration-500 ${isScrolled ? 'py-4 bg-black/60 backdrop-blur-xl border-b border-white/5' : 'py-8 bg-transparent'
            }`}>
            <div className="container mx-auto px-6 flex items-center justify-between">
                {/* Logo */}
                <Link to="/">
                    <motion.div
                        initial={{ opacity: 0, x: -20 }}
                        animate={{ opacity: 1, x: 0 }}
                        className="group cursor-pointer relative"
                    >
                        <AnimatedLogo />
                    </motion.div>
                </Link>

                {/* Desktop Nav */}
                <div className="hidden md:flex items-center gap-6">
                    {isAuthenticated && (
                        <div className="mr-4">
                            <MissionTimer mini={true} />
                        </div>
                    )}

                    <div className="relative">
                        <motion.button
                            onClick={() => setIsProtocolOpen(!isProtocolOpen)}
                            className={`flex items-center gap-2 px-4 py-2 border transition-all text-xs font-black uppercase tracking-widest ${isProtocolOpen ? 'bg-white text-black border-white' : 'text-white/40 border-white/10 hover:border-white/40 hover:text-white'
                                }`}
                        >
                            <NeuralCore size={14} />
                            Protocol
                            <ChevronDown size={12} className={`transition-transform duration-300 ${isProtocolOpen ? 'rotate-180' : ''}`} />
                        </motion.button>

                        <AnimatePresence>
                            {isProtocolOpen && (
                                <>
                                    <div className="fixed inset-0 z-[-1]" onClick={() => setIsProtocolOpen(false)} />
                                    <motion.div
                                        initial={{ opacity: 0, y: 10, scale: 0.95 }}
                                        animate={{ opacity: 1, y: 0, scale: 1 }}
                                        exit={{ opacity: 0, y: 10, scale: 0.95 }}
                                        className="absolute top-full left-0 mt-4 w-56 bg-zinc-900 border border-white/10 shadow-2xl overflow-hidden"
                                    >
                                        <div className="p-2 flex flex-col">
                                            {navLinks
                                                .filter(link => !link.auth || isAuthenticated)
                                                .filter(link => !link.adminOnly || user?.role === 'admin')
                                                .map((link) => (
                                                    <Link
                                                        key={link.name}
                                                        to={link.href}
                                                        onClick={() => setIsProtocolOpen(false)}
                                                        className="flex items-center gap-3 px-4 py-3 text-[10px] font-black uppercase tracking-widest text-white/40 hover:text-white hover:bg-white/5 transition-all"
                                                    >
                                                        <link.icon size={14} className="text-white/60" />
                                                        {link.name}
                                                    </Link>
                                                ))}
                                        </div>
                                    </motion.div>
                                </>
                            )}
                        </AnimatePresence>
                    </div>

                    <div className="w-px h-4 bg-white/10 mx-2" />

                    <div className="flex items-center gap-3">
                        {isAuthenticated ? (
                            <>
                                <Link to="/profile">
                                    <Button variant="ghost" size="sm">
                                        {user?.firstName || 'Profile'}
                                    </Button>
                                </Link>
                                <Button size="sm" onClick={logout}>
                                    Sign Out
                                </Button>
                            </>
                        ) : (
                            <>
                                <Link to="/login">
                                    <Button variant="ghost" size="sm">Sign In</Button>
                                </Link>
                                <Link to="/register">
                                    <Button size="sm">Get Started</Button>
                                </Link>
                            </>
                        )}
                    </div>
                </div>

                {/* Mobile Toggle */}
                <motion.button
                    className="md:hidden text-white p-2"
                    onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                    whileTap={{ scale: 0.9 }}
                >
                    <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                        {isMobileMenuOpen ? (
                            <path d="M18 6L6 18M6 6l12 12" />
                        ) : (
                            <path d="M3 12h18M3 6h18M3 18h18" />
                        )}
                    </svg>
                </motion.button>
            </div>

            {/* Mobile Menu */}
            <AnimatePresence>
                {isMobileMenuOpen && (
                    <motion.div
                        initial={{ opacity: 0, height: 0 }}
                        animate={{ opacity: 1, height: 'auto' }}
                        exit={{ opacity: 0, height: 0 }}
                        className="md:hidden bg-black border-b border-white/10 overflow-hidden"
                    >
                        <div className="px-6 py-8 flex flex-col gap-6">
                            {navLinks
                                .filter(link => !link.auth || isAuthenticated)
                                .filter(link => !link.adminOnly || user?.role === 'admin')
                                .map((link) => (
                                    <Link
                                        key={link.name}
                                        to={link.href}
                                        onClick={() => setIsMobileMenuOpen(false)}
                                        className="flex items-center justify-between text-white/40 font-black uppercase tracking-widest text-sm hover:text-white transition-colors"
                                    >
                                        <div className="flex items-center gap-4">
                                            <link.icon size={18} className="text-white" />
                                            {link.name}
                                        </div>
                                    </Link>
                                ))}
                            <div className="pt-6 border-t border-white/5 flex flex-col gap-4">
                                {isAuthenticated ? (
                                    <>
                                        <Link to="/profile" onClick={() => setIsMobileMenuOpen(false)}>
                                            <Button variant="ghost" className="w-full">Profile</Button>
                                        </Link>
                                        <Button onClick={() => { logout(); setIsMobileMenuOpen(false); }} className="w-full">
                                            Sign Out
                                        </Button>
                                    </>
                                ) : (
                                    <>
                                        <Link to="/register" onClick={() => setIsMobileMenuOpen(false)}>
                                            <Button className="w-full">Get Started</Button>
                                        </Link>
                                        <Link to="/login" onClick={() => setIsMobileMenuOpen(false)}>
                                            <Button variant="ghost" className="w-full">Sign In</Button>
                                        </Link>
                                    </>
                                )}
                            </div>
                        </div>
                    </motion.div>
                )}
            </AnimatePresence>
        </nav>
    );
};

export default Navbar;
