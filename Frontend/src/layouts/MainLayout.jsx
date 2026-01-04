import React, { useContext } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { motion, AnimatePresence } from 'framer-motion';
import { AppContext } from '../context/AppContext';

const MainLayout = ({ children }) => {
    const { notifications, isAuthenticated } = useContext(AppContext);

    return (
        <div className="min-h-screen bg-black text-white selection:bg-white/30 selection:text-white flex flex-col">
            <div className="noise" />

            <Navbar />

            <main className="flex-1 relative z-10">
                {children}
            </main>

            <Footer />

            {/* Global Notifications - Industrial Design */}
            <div className="fixed bottom-8 right-8 z-[200] flex flex-col gap-2 pointer-events-none">
                <AnimatePresence>
                    {notifications.map((n) => (
                        <motion.div
                            key={n.id}
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            exit={{ opacity: 0, x: 20 }}
                            className={`pointer-events-auto min-w-[300px] border-l-4 p-4 shadow-2xl bg-black border-y border-r border-white/10 font-mono text-xs ${n.type === 'error' ? 'border-l-red-500' :
                                n.type === 'success' ? 'border-l-green-500' :
                                    'border-l-white'
                                }`}
                        >
                            <div className="flex justify-between items-center mb-1 opacity-50 text-[10px] uppercase tracking-widest">
                                <span>[{n.type === 'error' ? 'ERR' : 'SYS'}]</span>
                                <span>{new Date().toLocaleTimeString([], { hour12: false })}</span>
                            </div>
                            <div className="text-white font-bold uppercase tracking-wide">
                                {n.msg}
                            </div>
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default MainLayout;
