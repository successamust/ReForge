import React, { Component } from 'react';
import Button from './ui/Button';

class ErrorBoundary extends Component {
    constructor(props) {
        super(props);
        this.state = { hasError: false, error: null };
    }

    static getDerivedStateFromError(error) {
        return { hasError: true, error };
    }

    componentDidCatch(error, errorInfo) {
        console.error("Uncaught error:", error, errorInfo);
    }

    handleReload = () => {
        window.location.reload();
    };

    render() {
        if (this.state.hasError) {
            return (
                <div className="min-h-screen bg-black flex items-center justify-center p-6">
                    <div className="max-w-md w-full bg-white/5 border border-white/10 p-8 rounded-lg text-center">
                        <div className="w-16 h-16 bg-red-500/10 rounded-full flex items-center justify-center mx-auto mb-6">
                            <svg className="w-8 h-8 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                            </svg>
                        </div>
                        <h1 className="text-2xl font-black text-white mb-4 uppercase tracking-tight">System Failure</h1>
                        <p className="text-white/60 mb-8 font-light">
                            An unexpected error occurred in the ReForge visual interface. Attempting manual reboot...
                        </p>
                        <div className="bg-black/50 p-4 rounded text-left font-mono text-xs text-red-400 mb-8 overflow-auto max-h-32 border border-white/5">
                            {this.state.error?.toString()}
                        </div>
                        <Button onClick={this.handleReload} className="w-full">
                            Reboot System
                        </Button>
                    </div>
                </div>
            );
        }

        return this.props.children;
    }
}

export default ErrorBoundary;
