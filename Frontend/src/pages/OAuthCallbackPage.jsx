import React, { useEffect, useContext } from 'react';
import { useNavigate, useSearchParams } from 'react-router-dom';
import { authService } from '../services/auth.service';
import { AppContext } from '../context/AppContext';

const OAuthCallbackPage = () => {
    const navigate = useNavigate();
    const [searchParams] = useSearchParams();
    const { setUser, addNotification } = useContext(AppContext);
    const token = searchParams.get('token');

    useEffect(() => {
        const handleOAuthCallback = async () => {
            if (token) {
                try {
                    const response = await authService.handleOAuthCallback(token);
                    // API interceptor returns response.data, so check response.data or response.user
                    const userData = response?.data?.user || response?.user || response?.data;
                    if (userData) {
                        setUser(userData);
                        addNotification({
                            type: 'success',
                            message: 'Login successful'
                        });
                        navigate('/dashboard');
                    } else {
                        throw new Error('Failed to get user data');
                    }
                } catch {
                    addNotification({
                        type: 'error',
                        message: 'OAuth login failed. Please try again.'
                    });
                    navigate('/login');
                }
            } else {
                addNotification({
                    type: 'error',
                    message: 'Invalid OAuth callback'
                });
                navigate('/login');
            }
        };

        handleOAuthCallback();
    }, [token, navigate, setUser, addNotification]);

    return (
        <div className="min-h-screen bg-black flex items-center justify-center">
            <div className="text-center">
                <div className="w-12 h-12 border-2 border-white border-t-transparent rounded-full animate-spin mx-auto mb-4" />
                <p className="text-white/60 font-light">Completing authentication...</p>
            </div>
        </div>
    );
};

export default OAuthCallbackPage;

