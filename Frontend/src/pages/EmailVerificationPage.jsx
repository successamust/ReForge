import React, { useState, useEffect, useRef, useContext } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import Button from '../components/ui/Button';
import { authService } from '../services/auth.service';
import { AppContext } from '../context/AppContext';

const EmailVerificationPage = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const { addNotification } = useContext(AppContext);
    const [isVerifying, setIsVerifying] = useState(true);
    const [isSuccess, setIsSuccess] = useState(false);
    const token = searchParams.get('token');

    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    });
    const y = useTransform(scrollYProgress, [0, 1], [50, -50]);
    const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

    useEffect(() => {
        const verifyEmail = async () => {
            if (!token) {
                addNotification({
                    type: 'error',
                    message: 'Invalid verification token'
                });
                navigate('/login');
                return;
            }

            try {
                setIsVerifying(true);
                await authService.verifyEmail(token);
                setIsSuccess(true);
                addNotification({
                    type: 'success',
                    message: 'Email verified successfully'
                });
            } catch (error) {
                addNotification({
                    type: 'error',
                    message: error.response?.data?.message || 'Email verification failed'
                });
            } finally {
                setIsVerifying(false);
            }
        };

        verifyEmail();
    }, [token, navigate, addNotification]);

    return (
        <div ref={ref} className="relative min-h-screen flex items-center justify-center bg-black px-6 py-24">
            <motion.div
                style={{ y, opacity }}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.8 }}
                className="w-full max-w-md"
            >
                <div className="bg-black border border-white/10 p-12 text-center">
                    <div className="mb-10">
                        <div className="inline-flex items-center gap-3 px-4 py-2 border border-white/10 bg-white/[0.02] mb-8">
                            <div className="w-1.5 h-1.5 bg-white rounded-full" />
                            <span className="text-[10px] font-mono text-white/60 tracking-[0.3em] uppercase">
                                Email Verification
                            </span>
                        </div>
                        <h1 className="text-[clamp(2.5rem,6vw,4rem)] font-black leading-[0.9] tracking-[-0.02em] text-white mb-4">
                            {isVerifying ? 'Verifying...' : isSuccess ? 'Email Verified' : 'Verification Failed'}
                        </h1>
                        <p className="text-white/60 font-light text-lg">
                            {isVerifying 
                                ? 'Please wait while we verify your email address.'
                                : isSuccess
                                ? 'Your email has been successfully verified. You can now log in.'
                                : 'The verification link is invalid or has expired.'}
                        </p>
                    </div>

                    {isVerifying ? (
                        <div className="w-12 h-12 border-2 border-white border-t-transparent rounded-full animate-spin mx-auto" />
                    ) : (
                        <Link to="/login">
                            <Button className="w-full">
                                Go to Login
                            </Button>
                        </Link>
                    )}
                </div>
            </motion.div>
        </div>
    );
};

export default EmailVerificationPage;

