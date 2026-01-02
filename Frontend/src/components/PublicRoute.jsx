import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

/**
 * PublicRoute component ensures that authenticated users are redirected 
 * away from public-only pages (like Login and Register) to the Dashboard.
 */
const PublicRoute = ({ children }) => {
    const { isAuthenticated, loading } = useContext(AppContext);

    if (loading) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center">
                <div className="w-12 h-12 border-2 border-white border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    if (isAuthenticated) {
        return <Navigate to="/dashboard" replace />;
    }

    return children;
};

export default PublicRoute;
