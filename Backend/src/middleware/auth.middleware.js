import * as authService from '../services/auth.service.js';
import { AuthenticationError, AuthorizationError } from '../utils/errors.js';

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

        // Get user from database
        const user = await authService.getUserById(decoded.userId);

        req.user = user;
        req.userId = user._id;

        next();
    } catch (error) {
        next(error);
    }
};

/**
 * Optional authentication - doesn't fail if no token
 */
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
        // Ignore auth errors for optional auth
        next();
    }
};

/**
 * Require admin role
 */
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
