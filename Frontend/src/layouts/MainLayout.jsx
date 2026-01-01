import React, { useContext } from 'react';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';
import { motion, AnimatePresence } from 'framer-motion';
import { AppContext } from '../context/AppContext';

const MainLayout = ({ children }) => {
    const { notifications } = useContext(AppContext);

    return (
        <div className="min-h-screen bg-black text-white selection:bg-white/30 selection:text-white flex flex-col">
            <div className="noise" />

            <Navbar />

            <main className="flex-1 relative z-10">
                {children}
            </main>

            <Footer />

            {/* Global Notifications */}
            <div className="fixed bottom-8 right-8 z-[200] flex flex-col gap-4">
                <AnimatePresence>
                    {notifications.map((n) => (
                        <motion.div
                            key={n.id}
                            initial={{ opacity: 0, x: 50, scale: 0.9 }}
                            animate={{ opacity: 1, x: 0, scale: 1 }}
                            exit={{ opacity: 0, x: 20, scale: 0.9 }}
                            className={`px-6 py-3 rounded-xl border backdrop-blur-xl shadow-2xl ${n.type === 'error' ? 'bg-red-500/10 border-red-500/20 text-red-400' :
                                    n.type === 'success' ? 'bg-green-500/10 border-green-500/20 text-green-400' :
                                        'bg-white/5 border-white/20 text-white'
                                }`}
                        >
                            {n.msg}
                        </motion.div>
                    ))}
                </AnimatePresence>
            </div>
        </div>
    );
};

export default MainLayout;
