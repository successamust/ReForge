import React, { useContext } from 'react';
import { Navigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';

const ProtectedRoute = ({ children }) => {
    const { isAuthenticated, loading } = useContext(AppContext);

    if (loading) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center">
                <div className="w-12 h-12 border-2 border-white border-t-transparent rounded-full animate-spin" />
            </div>
        );
    }

    return isAuthenticated ? children : <Navigate to="/login" replace />;
};

export default ProtectedRoute;

