import React from 'react';

const LoadingSpinner = () => {
    return (
        <div className="flex items-center justify-center min-h-screen bg-black">
            <div className="w-12 h-12 border-2 border-white border-t-transparent rounded-full animate-spin" />
        </div>
    );
};

export default LoadingSpinner;
