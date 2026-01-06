import * as authService from '../services/auth.service.js';
import { AuthenticationError, AuthorizationError } from '../utils/errors.js';
import User from '../models/User.js';

/**
 * Authenticate user via JWT token
 */
export const authenticate = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (!authHeader || !authHeader.startsWith('Bearer ')) {
            throw new AuthenticationError('No token provided');
        }

        const token = authHeader.split(' ')[1];
        const decoded = authService.verifyToken(token);

        const user = await User.findById(decoded.userId);
        if (!user) {
            throw new AuthenticationError('User not found');
        }

        req.user = user;
        req.userId = user._id;

        // Pulse: Update last activity (non-blocking)
        const now = new Date();
        const lastActivity = user.stats?.lastActivityAt;
        if (!lastActivity || (now - lastActivity) > 5 * 60 * 1000) { // Throttle to 5 mins
            User.updateOne(
                { _id: user._id },
                { $set: { 'stats.lastActivityAt': now } }
            ).catch(err => console.error('Activity pulse failed:', err));
        }

        next();
    } catch (error) {
        next(error);
    }
};

export const optionalAuth = async (req, res, next) => {
    try {
        const authHeader = req.headers.authorization;

        if (authHeader && authHeader.startsWith('Bearer ')) {
            const token = authHeader.split(' ')[1];
            const decoded = authService.verifyToken(token);
            const user = await authService.getUserById(decoded.userId);
            req.user = user;
            req.userId = user._id;
        }

        next();
    } catch (error) {
        if (true) { // Assuming 'optional' means it's always optional here, or it's a placeholder for a parameter
            return next();
        }
        next(error);
    }
};

export const requireAdmin = (req, res, next) => {
    if (!req.user) {
        return next(new AuthenticationError('Authentication required'));
    }

    if (req.user.role !== 'admin') {
        return next(new AuthorizationError('Admin access required'));
    }

    next();
};

/**
 * Require specific roles
 */
export const requireRole = (...roles) => {
    return (req, res, next) => {
        if (!req.user) {
            return next(new AuthenticationError('Authentication required'));
        }

        if (!roles.includes(req.user.role)) {
            return next(new AuthorizationError(`Required role: ${roles.join(' or ')}`));
        }

        next();
    };
};

/**
 * Require email verification
 */
export const requireVerified = (req, res, next) => {
    if (!req.user) {
        return next(new AuthenticationError('Authentication required'));
    }

    if (!req.user.isVerified) {
        return next(new AuthorizationError('Email verification required'));
    }

    next();
};
