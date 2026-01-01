import React, { useState, useEffect, useRef, useContext } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import Button from '../components/ui/Button';
import { authService } from '../services/auth.service';
import { AppContext } from '../context/AppContext';
import { validatePassword } from '../utils/passwordValidation';
import { Eye, EyeOff } from '../components/icons/CustomIcons';

const ResetPasswordPage = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const { addNotification } = useContext(AppContext);
    const [formData, setFormData] = useState({
        password: '',
        confirmPassword: ''
    });
    const [isLoading, setIsLoading] = useState(false);
    const [isSuccess, setIsSuccess] = useState(false);
    const [showPassword, setShowPassword] = useState(false);
    const [showConfirmPassword, setShowConfirmPassword] = useState(false);
    const token = searchParams.get('token');

    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    });
    const y = useTransform(scrollYProgress, [0, 1], [50, -50]);
    const opacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

    useEffect(() => {
        if (!token) {
            addNotification({
                type: 'error',
                message: 'Invalid reset token'
            });
            navigate('/forgot-password');
        }
    }, [token, navigate, addNotification]);

    const handleChange = (e) => {
        setFormData({
            ...formData,
            [e.target.name]: e.target.value
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        
        if (formData.password !== formData.confirmPassword) {
            addNotification({
                type: 'error',
                message: 'Passwords do not match'
            });
            return;
        }

        const passwordValidation = validatePassword(formData.password);
        if (!passwordValidation.isValid) {
            addNotification({
                type: 'error',
                message: passwordValidation.errors[0]
            });
            return;
        }

        setIsLoading(true);
        try {
            await authService.resetPassword(token, formData.password);
            setIsSuccess(true);
            addNotification({
                type: 'success',
                message: 'Password reset successfully'
            });
            setTimeout(() => {
                navigate('/login');
            }, 2000);
        } catch (error) {
            addNotification({
                type: 'error',
                message: error.response?.data?.message || 'Failed to reset password'
            });
        } finally {
            setIsLoading(false);
        }
    };

    if (!token) {
        return null;
    }

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
                                Reset Password
                            </span>
                        </div>
                        <h1 className="text-[clamp(2.5rem,6vw,4rem)] font-black leading-[0.9] tracking-[-0.02em] text-white mb-4">
                            {isSuccess ? 'Password Reset' : 'Set New Password'}
                        </h1>
                        <p className="text-white/60 font-light text-lg">
                            {isSuccess 
                                ? 'Your password has been reset successfully. Redirecting to login...'
                                : 'Enter your new password below.'}
                        </p>
                    </div>

                    {!isSuccess ? (
                        <form onSubmit={handleSubmit} className="space-y-6">
                            <div>
                                <label className="block text-xs font-bold uppercase tracking-widest text-white/40 mb-3">
                                    New Password
                                </label>
                                <div className="relative">
                                    <input
                                        type={showPassword ? "text" : "password"}
                                        name="password"
                                        value={formData.password}
                                        onChange={handleChange}
                                        required
                                        minLength={8}
                                        maxLength={128}
                                        className="w-full px-4 py-3 pr-12 bg-white/[0.02] border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-white/20 focus:bg-white/[0.04] transition-all font-light"
                                        placeholder="Min 8 chars, uppercase, lowercase, number, special char"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowPassword(!showPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white transition-colors"
                                    >
                                        {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                    </button>
                                </div>
                                <p className="text-[10px] text-white/40 font-light mt-2 leading-relaxed">
                                    Must contain: uppercase, lowercase, number, and special character (@$!%*?&)
                                </p>
                            </div>

                            <div>
                                <label className="block text-xs font-bold uppercase tracking-widest text-white/40 mb-3">
                                    Confirm Password
                                </label>
                                <div className="relative">
                                    <input
                                        type={showConfirmPassword ? "text" : "password"}
                                        name="confirmPassword"
                                        value={formData.confirmPassword}
                                        onChange={handleChange}
                                        required
                                        className="w-full px-4 py-3 pr-12 bg-white/[0.02] border border-white/10 text-white placeholder-white/30 focus:outline-none focus:border-white/20 focus:bg-white/[0.04] transition-all font-light"
                                        placeholder="Re-enter password"
                                    />
                                    <button
                                        type="button"
                                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                                        className="absolute right-3 top-1/2 -translate-y-1/2 text-white/40 hover:text-white transition-colors"
                                    >
                                        {showConfirmPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                    </button>
                                </div>
                            </div>

                            <Button
                                type="submit"
                                size="lg"
                                isLoading={isLoading}
                                className="w-full h-14 text-sm uppercase tracking-widest"
                            >
                                Reset Password
                            </Button>
                        </form>
                    ) : (
                        <div className="text-center">
                            <Link to="/login">
                                <Button className="w-full">
                                    Go to Login
                                </Button>
                            </Link>
                        </div>
                    )}
                </div>
            </motion.div>
        </div>
    );
};

export default ResetPasswordPage;

