import React, { createContext, useContext, useState, useEffect } from 'react';
import { authService } from '../services/auth.service';

export const AppContext = createContext();

export const AppProvider = ({ children }) => {
    const [user, setUser] = useState(null);
    const [loading, setLoading] = useState(true);
    const [isSessionActive, setIsSessionActive] = useState(false);
    const [notifications, setNotifications] = useState([]);

    useEffect(() => {
        // Check if user is already logged in
        const currentUser = authService.getCurrentUser();
        if (currentUser && authService.isAuthenticated()) {
            setUser(currentUser);
            // Verify token is still valid
            authService.getProfile().catch(() => {
                authService.logout();
                setUser(null);
            });
        }
        setLoading(false);
    }, []);

    const addNotification = (notif) => {
        const id = Date.now();
        setNotifications(prev => [...prev, { ...notif, id, msg: notif.message || notif.title || notif.msg }]);
        setTimeout(() => {
            setNotifications(prev => prev.filter(n => n.id !== id));
        }, 5000);
    };

    const startSession = () => {
        setIsSessionActive(true);
        addNotification({
            type: 'success',
            title: 'Session Synchronized',
            message: 'Entering Manual Mode. AI assistance disabled.'
        });
    };

    const login = async (email, password) => {
        try {
            setLoading(true);
            const response = await authService.login(email, password);
            // User is already set in localStorage by authService.login
            const currentUser = authService.getCurrentUser();
            setUser(currentUser);
            addNotification({
                type: 'success',
                message: 'Login successful'
            });
            return response;
        } catch (error) {
            addNotification({
                type: 'error',
                message: error.response?.data?.message || 'Login failed'
            });
            throw error;
        } finally {
            setLoading(false);
        }
    };

    const logout = () => {
        authService.logout();
        setUser(null);
        setIsSessionActive(false);
        addNotification({
            type: 'success',
            message: 'Logged out successfully'
        });
    };

    return (
        <AppContext.Provider value={{
            user,
            loading,
            isSessionActive,
            notifications,
            setUser,
            setLoading,
            startSession,
            addNotification,
            login,
            logout,
            isAuthenticated: !!user
        }}>
            {children}
        </AppContext.Provider>
    );
};

export const useApp = () => {
    const context = useContext(AppContext);
    if (!context) throw new Error('useApp must be used within an AppProvider');
    return context;
};
