import * as authService from '../services/auth.service.js';

/**
 * Register new user
 */
export async function register(req, res, next) {
    try {
        const { email, password, firstName, lastName, timezone } = req.body;
        const result = await authService.register(email, password, firstName, lastName, timezone);

        res.status(201).json({
            success: true,
            data: result,
        });
    } catch (error) {
        next(error);
    }
}

/**
 * Verify user email
 */
export async function verifyEmail(req, res, next) {
    try {
        const { token } = req.body;
        await authService.verifyEmail(token);
        res.json({ success: true, message: 'Email verified successfully' });
    } catch (error) {
        next(error);
    }
}

/**
 * Resend email verification link
 */
export async function resendVerification(req, res, next) {
    try {
        const { email } = req.body;
        await authService.resendVerification(email);
        res.json({ success: true, message: 'Verification email sent if account exists and is not verified.' });
    } catch (error) {
        next(error);
    }
}

/**
 * Forgot Password
 */
export async function forgotPassword(req, res, next) {
    try {
        const { email } = req.body;
        await authService.forgotPassword(email);
        res.json({ success: true, message: 'If an account exists, a reset email has been sent.' });
    } catch (error) {
        next(error);
    }
}

/**
 * Reset Password
 */
export async function resetPassword(req, res, next) {
    try {
        const { token, password } = req.body;
        await authService.resetPassword(token, password);
        res.json({ success: true, message: 'Password has been reset successfully' });
    } catch (error) {
        next(error);
    }
}

/**
 * Login user
 */
export async function login(req, res, next) {
    try {
        const { email, password } = req.body;
        const ipAddress = req.ip || req.connection.remoteAddress;
        const result = await authService.login(email, password, ipAddress);

        res.json({
            success: true,
            data: result,
        });
    } catch (error) {
        next(error);
    }
}

/**
 * Get current user profile
 */
export async function getProfile(req, res, next) {
    try {
        const user = req.user.toSafeObject();

        res.json({
            success: true,
            data: { user },
        });
    } catch (error) {
        next(error);
    }
}

/**
 * Update user profile
 */
export async function updateProfile(req, res, next) {
    try {
        const userId = req.userId;
        const updates = req.body;
        const user = await authService.updateProfile(userId, updates);

        res.json({
            success: true,
            data: { user },
        });
    } catch (error) {
        next(error);
    }
}

export async function socialLoginCallback(req, res, next) {
    try {
        // Passport attaches the result of the strategy to req.user
        const { user, token } = req.user;

        // Redirect to frontend with token
        const frontendUrl = process.env.FRONTEND_URL || 'http://localhost:5173';
        res.redirect(`${frontendUrl}/auth/success?token=${token}`);
    } catch (error) {
        next(error);
    }
}
