import React, { useState, useEffect, useContext } from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import Button from '../components/ui/Button';
import { authService } from '../services/auth.service';
import { AppContext } from '../context/AppContext';

const VerificationPendingPage = () => {
    const navigate = useNavigate();
    const { user, addNotification, logout } = useContext(AppContext);
    const [isResending, setIsResending] = useState(false);
    const [countdown, setCountdown] = useState(0);

    useEffect(() => {
        if (user?.isVerified) {
            navigate('/dashboard');
        }
    }, [user, navigate]);

    useEffect(() => {
        if (countdown > 0) {
            const timer = setTimeout(() => setCountdown(countdown - 1), 1000);
            return () => clearTimeout(timer);
        }
    }, [countdown]);

    const handleResend = async () => {
        if (!user?.email || countdown > 0) return;

        try {
            setIsResending(true);
            await authService.resendVerification(user.email);
            addNotification({
                type: 'success',
                message: 'Verification email resent successfully. Please check your inbox.'
            });
            setCountdown(60); // 60 seconds throttle
        } catch (error) {
            addNotification({
                type: 'error',
                message: error.response?.data?.message || 'Failed to resend verification email'
            });
        } finally {
            setIsResending(false);
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-black px-6 py-24">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="w-full max-w-xl text-center"
            >
                <div className="inline-flex items-center gap-3 px-4 py-2 border border-white/10 bg-white/[0.02] mb-12">
                    <div className="w-1.5 h-1.5 bg-yellow-500 rounded-full animate-pulse" />
                    <span className="text-[10px] font-mono text-white/60 tracking-[0.3em] uppercase">
                        Action Required
                    </span>
                </div>

                <h1 className="text-[clamp(2.5rem,6vw,4.5rem)] font-black leading-[0.9] tracking-[-0.02em] text-white mb-8">
                    Verify Your <br />
                    <span className="text-white/20">Identity</span>
                </h1>

                <p className="text-xl text-white/60 mb-12 max-w-md mx-auto font-light leading-relaxed">
                    Check your inbox at <span className="text-white font-medium">{user?.email}</span> to verify your account and unlock the full ReForge experience.
                </p>

                <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                    <Button
                        onClick={handleResend}
                        disabled={isResending || countdown > 0}
                        className="w-full sm:w-auto min-w-[200px]"
                    >
                        {isResending ? 'Sending...' : countdown > 0 ? `Retry in ${countdown}s` : 'Resend Email'}
                    </Button>

                    <button
                        onClick={logout}
                        className="text-white/40 hover:text-white text-sm font-mono tracking-widest uppercase transition-colors"
                    >
                        Sign Out
                    </button>
                </div>

                <div className="mt-24 grid grid-cols-1 sm:grid-cols-4 gap-4 opacity-40">
                    {[
                        { label: 'Manual Practice', status: 'Available', color: 'text-green-500' },
                        { label: 'Submit Code', status: 'Locked', color: 'text-red-500' },
                        { label: 'Track Progress', status: 'Locked', color: 'text-red-500' },
                        { label: 'Leaderboard', status: 'Locked', color: 'text-red-500' }
                    ].map((item, i) => (
                        <div key={i} className="border border-white/10 p-4">
                            <div className="text-[8px] font-mono uppercase tracking-[0.2em] mb-1">{item.label}</div>
                            <div className="text-xs font-bold uppercase ${item.color}">{item.status}</div>
                        </div>
                    ))}
                </div>
            </motion.div>
        </div>
    );
};

export default VerificationPendingPage;
