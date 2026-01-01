import React, { useState, useRef, useContext } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';
import { authService } from '../services/auth.service';
import { AppContext } from '../context/AppContext';

const ForgotPasswordPage = () => {
    const { addNotification } = useContext(AppContext);
    const [email, setEmail] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const [isSent, setIsSent] = useState(false);

    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    });
    const y = useTransform(scrollYProgress, [0, 1], [50, -50]);
    const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);
        try {
            await authService.forgotPassword(email);
            setIsSent(true);
            addNotification({
                type: 'success',
                message: 'Password reset email sent. Check your inbox.'
            });
        } catch (error) {
            addNotification({
                type: 'error',
                message: error.response?.data?.message || 'Failed to send reset email'
            });
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div ref={ref} className="relative min-h-screen flex items-center justify-center bg-black px-6 py-24">
            <motion.div
                style={{ y, opacity }}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="w-full max-w-md"
            >
                <div className="bg-black border border-white/10 p-12">
                    <div className="mb-10">
                        <div className="inline-flex items-center gap-3 px-4 py-2 border border-white/10 bg-white/[0.02] mb-8">
                            <div className="w-1.5 h-1.5 bg-white rounded-full" />
                            <span className="text-[10px] font-mono text-white/60 tracking-[0.3em] uppercase">
                                Password Reset
                            </span>
                        </div>
                        <h1 className="text-[clamp(2.5rem,6vw,4rem)] font-black leading-[0.9] tracking-[-0.02em] text-white mb-4">
                            {isSent ? 'Check Your Email' : 'Reset Password'}
                        </h1>
                        <p className="text-white/60 font-light text-lg">
                            {isSent 
                                ? 'We\'ve sent a password reset link to your email address.'
                                : 'Enter your email address and we\'ll send you a link to reset your password.'}
                        </p>
                    </div>

                    {!isSent ? (
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-widest text-white/40 mb-3">
                                    Email Address
                                </label>
                                <input
                                    type="email"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    required
                                    className="w-full px-4 py-3 bg-white/[0.02] border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-white/20 focus:bg-white/[0.04] transition-all font-light"
                                    placeholder="user@example.com"
                                />
                            </div>

                            <Button
                                type="submit"
                                size="lg"
                                isLoading={isLoading}
                                className="w-full h-14 text-sm uppercase tracking-widest"
                            >
                                Send Reset Link
                            </Button>
                        </form>
                    ) : (
                        <div className="text-center">
                            <p className="text-white/60 font-light mb-6">
                                If an account exists with that email, you'll receive a password reset link shortly.
                            </p>
                            <Link to="/login">
                                <Button variant="ghost" className="w-full">
                                    Back to Login
                                </Button>
                            </Link>
                        </div>
                    )}

                    <div className="mt-8 text-center">
                        <Link to="/login" className="text-white/60 hover:text-white font-light text-sm transition-colors">
                            Remember your password? Sign in
                        </Link>
                    </div>
                </div>
            </motion.div>
        </div>
    );
};

export default ForgotPasswordPage;

