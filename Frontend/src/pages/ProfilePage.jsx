import React, { useState, useEffect, useContext, useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import Button from '../components/ui/Button';
import { CodeTerminal, VerifiedCheck } from '../components/icons/CustomIcons';
import { authService } from '../services/auth.service';
import { AppContext } from '../context/AppContext';

const ProfilePage = () => {
    const { setUser, logout, addNotification } = useContext(AppContext);
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isEditing, setIsEditing] = useState(false);
    const [formData, setFormData] = useState({
        firstName: '',
        lastName: '',
        timezone: ''
    });

    useEffect(() => {
        const loadProfile = async () => {
            try {
                setLoading(true);
                const response = await authService.getProfile();
                // API interceptor returns response.data, so response is already { success, data }
                const profileData = response?.data || response;
                const userData = profileData?.user || profileData;
                setProfile(userData);
                setFormData({
                    firstName: userData?.firstName || '',
                    lastName: userData?.lastName || '',
                    timezone: userData?.timezone || Intl.DateTimeFormat().resolvedOptions().timeZone
                });
            } catch {
                addNotification({
                    type: 'error',
                    message: 'Failed to load profile'
                });
            } finally {
                setLoading(false);
            }
        };

        loadProfile();
    }, [addNotification]);

    const handleSave = async () => {
        try {
            setLoading(true);
            const response = await authService.updateProfile(formData);
            // API interceptor returns response.data, so response is already { success, data }
            const profileData = response?.data || response;
            const userData = profileData?.user || profileData;
            setProfile(userData);
            setUser(userData);
            setIsEditing(false);
            addNotification({
                type: 'success',
                message: 'Profile updated successfully'
            });
        } catch (error) {
            addNotification({
                type: 'error',
                message: error.response?.data?.message || 'Failed to update profile'
            });
        } finally {
            setLoading(false);
        }
    };

    const handleLogout = () => {
        logout();
    };

    const ref = useRef(null);
    const { scrollYProgress } = useScroll({
        target: ref,
        offset: ["start end", "end start"]
    });

    const headerY = useTransform(scrollYProgress, [0, 1], [50, -50]);
    const headerOpacity = useTransform(scrollYProgress, [0, 0.2, 0.8, 1], [0, 1, 1, 0]);
    const cardY = useTransform(scrollYProgress, [0, 1], [40, -40]);
    const cardOpacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);
    const settingsY = useTransform(scrollYProgress, [0, 1], [60, -60]);
    const settingsOpacity = useTransform(scrollYProgress, [0, 0.3, 0.7, 1], [0, 1, 1, 0]);

    return (
        <div ref={ref} className="relative min-h-screen bg-black py-40 px-6">
            {loading && !profile ? (
                <div className="flex items-center justify-center min-h-[60vh]">
                    <div className="w-12 h-12 border-2 border-white border-t-transparent rounded-full animate-spin" />
                </div>
            ) : (
                <div className="container mx-auto max-w-6xl">
                    <motion.div
                        style={{
                            y: headerY,
                            opacity: headerOpacity
                        }}
                        className="mb-16"
                    >
                        <div className="inline-flex items-center gap-3 px-4 py-2 border border-white/10 bg-white/[0.02] mb-8">
                            <div className="w-1.5 h-1.5 bg-white rounded-none" />
                            <span className="text-[10px] font-mono text-white/60 tracking-[0.3em] uppercase">
                                Profile
                            </span>
                        </div>
                        <h1 className="text-[clamp(3rem,8vw,6rem)] font-black leading-[0.9] tracking-[-0.02em] text-white mb-6">
                            Account Settings
                        </h1>
                    </motion.div>

                    <div className="grid grid-cols-1 md:grid-cols-3 gap-px bg-white/5">
                        {/* Profile Info */}
                        <motion.div
                            style={{
                                y: cardY,
                                opacity: cardOpacity
                            }}
                            className="bg-black p-8 border border-white/10 text-center"
                        >
                            <div className="w-20 h-20 border border-white/10 flex items-center justify-center mx-auto mb-6">
                                <CodeTerminal size={32} className="text-white" />
                            </div>
                            <h2 className="text-2xl font-black text-white mb-2 tracking-tight">
                                {profile?.firstName && profile?.lastName
                                    ? `${profile.firstName} ${profile.lastName}`
                                    : profile?.email?.split('@')[0] || 'User'}
                            </h2>
                            <p className="text-white/60 font-light mb-4">{profile?.email}</p>
                            <span className="inline-block px-3 py-1 border border-white/10 text-xs font-bold uppercase tracking-widest text-white/60">
                                {profile?.role?.toUpperCase() || 'USER'}
                            </span>
                        </motion.div>

                        {/* Settings */}
                        <motion.div
                            style={{
                                y: settingsY,
                                opacity: settingsOpacity
                            }}
                            className="md:col-span-2 bg-black p-8 border border-white/10"
                        >
                            <div className="flex items-center justify-between mb-8">
                                <h2 className="text-2xl font-black text-white tracking-tight">
                                    Settings
                                </h2>
                                {!isEditing && (
                                    <Button
                                        size="sm"
                                        variant="ghost"
                                        onClick={() => setIsEditing(true)}
                                    >
                                        Edit
                                    </Button>
                                )}
                            </div>

                            <div className="space-y-6">
                                <div className="grid grid-cols-2 gap-4">
                                    <div>
                                        <label className="block text-xs font-bold uppercase tracking-widest text-white/40 mb-3">
                                            First Name
                                        </label>
                                        {isEditing ? (
                                            <input
                                                type="text"
                                                value={formData.firstName}
                                                onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                                                className="w-full px-4 py-3 bg-white/[0.02] border border-white/10 text-white focus:outline-none focus:border-white/20 focus:bg-white/[0.04] transition-all font-light"
                                            />
                                        ) : (
                                            <input
                                                type="text"
                                                value={profile?.firstName || 'Not set'}
                                                disabled
                                                className="w-full px-4 py-3 bg-white/[0.02] border border-white/10 text-white/50 cursor-not-allowed font-light"
                                            />
                                        )}
                                    </div>
                                    <div>
                                        <label className="block text-xs font-bold uppercase tracking-widest text-white/40 mb-3">
                                            Last Name
                                        </label>
                                        {isEditing ? (
                                            <input
                                                type="text"
                                                value={formData.lastName}
                                                onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                                                className="w-full px-4 py-3 bg-white/[0.02] border border-white/10 text-white focus:outline-none focus:border-white/20 focus:bg-white/[0.04] transition-all font-light"
                                            />
                                        ) : (
                                            <input
                                                type="text"
                                                value={profile?.lastName || 'Not set'}
                                                disabled
                                                className="w-full px-4 py-3 bg-white/[0.02] border border-white/10 text-white/50 cursor-not-allowed font-light"
                                            />
                                        )}
                                    </div>
                                </div>

                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-widest text-white/40 mb-3">
                                        Email
                                    </label>
                                    <input
                                        type="email"
                                        value={profile?.email || ''}
                                        disabled
                                        className="w-full px-4 py-3 bg-white/[0.02] border border-white/10 text-white/50 cursor-not-allowed font-light"
                                    />
                                </div>

                                <div>
                                    <label className="block text-xs font-bold uppercase tracking-widest text-white/40 mb-3">
                                        Timezone
                                    </label>
                                    {isEditing ? (
                                        <select
                                            value={formData.timezone}
                                            onChange={(e) => setFormData({ ...formData, timezone: e.target.value })}
                                            className="w-full px-4 py-3 bg-white/[0.02] border border-white/10 text-white focus:outline-none focus:border-white/20 focus:bg-white/[0.04] transition-all font-light"
                                        >
                                            {Intl.supportedValuesOf('timeZone').map((tz) => (
                                                <option key={tz} value={tz} className="bg-black">
                                                    {tz}
                                                </option>
                                            ))}
                                        </select>
                                    ) : (
                                        <input
                                            type="text"
                                            value={profile?.timezone || 'Not set'}
                                            disabled
                                            className="w-full px-4 py-3 bg-white/[0.02] border border-white/10 text-white/50 cursor-not-allowed font-light"
                                        />
                                    )}
                                </div>

                                {isEditing && (
                                    <div className="flex gap-4">
                                        <Button
                                            onClick={handleSave}
                                            isLoading={loading}
                                            className="flex-1"
                                        >
                                            Save Changes
                                        </Button>
                                        <Button
                                            variant="ghost"
                                            onClick={() => {
                                                setIsEditing(false);
                                                setFormData({
                                                    firstName: profile?.firstName || '',
                                                    lastName: profile?.lastName || '',
                                                    timezone: profile?.timezone || Intl.DateTimeFormat().resolvedOptions().timeZone
                                                });
                                            }}
                                        >
                                            Cancel
                                        </Button>
                                    </div>
                                )}
                            </div>

                            <div className="bg-black border border-white/10 p-8 mt-8">
                                <h3 className="text-xl font-black text-white mb-4 tracking-tight">
                                    Danger Zone
                                </h3>
                                <p className="text-white/60 font-light mb-6">
                                    Sign out of your account. You'll need to log in again to continue.
                                </p>
                                <Button
                                    variant="ghost"
                                    onClick={handleLogout}
                                    className="border-white/10 text-white hover:bg-white/[0.02] hover:border-white/20"
                                >
                                    Sign Out
                                </Button>
                            </div>
                        </motion.div>
                    </div>
                </div>
            )}
        </div>
    );
};

export default ProfilePage;

