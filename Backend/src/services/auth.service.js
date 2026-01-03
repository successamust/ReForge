import jwt from 'jsonwebtoken';
import crypto from 'crypto';
import * as emailService from './email.service.js';
import config from '../config/index.js';
import { User, AuditLog } from '../models/index.js';
import { AuthenticationError, ConflictError, ValidationError } from '../utils/errors.js';
import { isValidTimezone } from '../utils/timezone.js';

/**
 * Register a new user
 */
export async function register(email, password, firstName, lastName, timezone = 'UTC') {
    if (!isValidTimezone(timezone)) {
        throw new ValidationError('Invalid timezone');
    }

    const existingUser = await User.findByEmail(email);
    if (existingUser) {
        throw new ConflictError('Email already registered');
    }

    const user = new User({
        email,
        passwordHash: password, // Will be hashed by pre-save hook
        firstName,
        lastName,
        timezone,
        progress: [], // Progress initialized empty, will be created on first access
    });

    await user.save();

    const verificationToken = crypto.randomUUID();
    user.verificationToken = verificationToken;

    await user.save();

    await AuditLog.log({
        userId: user._id,
        action: 'ACCOUNT_REGISTER',
        payload: { email, firstName, lastName, timezone },
    });

    // Send verification email
    try {
        await emailService.sendVerificationEmail(email, verificationToken);
    } catch (error) {
        console.error('Failed to send verification email:', error);
        // Don't fail registration if email fails
    }

    const token = generateToken(user);

    return {
        user: user.toSafeObject(),
        token,
    };
}

/**
 * Handle social login/registration
 */
export async function socialLogin(provider, profile) {
    const email = profile.emails && profile.emails[0] ? profile.emails[0].value : null;

    if (!email) {
        throw new ValidationError('Email address not provided by social provider');
    }

    const providerIdField = provider === 'google' ? 'googleId' : 'githubId';
    let user = await User.findOne({ [providerIdField]: profile.id });

    if (!user) {
        // Find by email to link accounts
        user = await User.findByEmail(email);

        if (user) {
            // Link existing account
            user[providerIdField] = profile.id;
            await user.save();
        } else {
            // Create new account
            const firstName = profile.name && profile.name.givenName ? profile.name.givenName : (profile.displayName ? profile.displayName.split(' ')[0] : 'Social');
            const lastName = profile.name && profile.name.familyName ? profile.name.familyName : (profile.displayName ? profile.displayName.split(' ').slice(1).join(' ') : 'User');

            user = new User({
                email,
                firstName,
                lastName,
                [providerIdField]: profile.id,
                isVerified: true, // Social accounts are considered verified
                progress: [],
            });

            await user.save();

            // Log registration
            await AuditLog.log({
                userId: user._id,
                action: 'ACCOUNT_REGISTER',
                payload: { email, firstName, lastName, provider },
            });
        }
    }

    // Log login
    await AuditLog.log({
        userId: user._id,
        action: 'ACCOUNT_LOGIN',
        payload: { email, provider },
    });

    const token = generateToken(user);

    return {
        user: user.toSafeObject(),
        token,
    };
}

/**
 * Verify user email
 */
export async function verifyEmail(token) {
    const user = await User.findOne({ verificationToken: token });

    if (!user) {
        throw new ValidationError('Invalid verification token');
    }

    user.isVerified = true;
    user.verificationToken = undefined; // Clear the token after verification

    await user.save();

    await AuditLog.log({
        userId: user._id,
        action: 'EMAIL_VERIFIED',
        payload: {},
    });

    return { success: true };
}

/**
 * Resend verification email
 */
export async function resendVerification(email) {
    const user = await User.findByEmail(email);

    if (!user) {
        // Don't reveal user existence
        return;
    }

    if (user.isVerified) {
        throw new ConflictError('Email already verified');
    }

    const verificationToken = crypto.randomUUID();
    user.verificationToken = verificationToken;

    await user.save();

    // Send verification email
    try {
        await emailService.sendVerificationEmail(email, verificationToken);
    } catch (error) {
        console.error('Failed to send verification email:', error);
        throw new Error('Failed to send verification email');
    }

    await AuditLog.log({
        userId: user._id,
        action: 'VERIFICATION_EMAIL_RESENT',
        payload: { email },
    });

    return { success: true };
}

/**
 * Forgot Password
 */
export async function forgotPassword(email) {
    const user = await User.findByEmail(email);
    if (!user) {
        // Don't reveal user existence
        return;
    }

    const resetToken = crypto.randomUUID();
    user.resetPasswordToken = resetToken;
    user.resetPasswordExpires = Date.now() + 3600000; // 1 hour

    await user.save();

    await emailService.sendPasswordResetEmail(email, resetToken);

    await AuditLog.log({
        userId: user._id,
        action: 'PASSWORD_RESET_REQUESTED',
        payload: {},
    });
}

/**
 * Reset Password
 */
export async function resetPassword(token, newPassword) {
    const user = await User.findOne({
        resetPasswordToken: token,
        resetPasswordExpires: { $gt: Date.now() },
    });

    if (!user) {
        throw new ValidationError('Invalid or expired password reset token');
    }

    user.passwordHash = newPassword; // Will be hashed by pre-save
    user.resetPasswordToken = undefined;
    user.resetPasswordExpires = undefined;

    await user.save();

    await AuditLog.log({
        userId: user._id,
        action: 'PASSWORD_RESET',
        payload: {},
    });

    return { success: true };
}

/**
 * Login user
 */
export async function login(email, password, ipAddress = null) {
    const user = await User.findByEmail(email);
    if (!user) {
        throw new AuthenticationError('Invalid email or password');
    }

    if (!user.isActive) {
        throw new AuthenticationError('Account is deactivated');
    }

    const isValid = await user.comparePassword(password);
    if (!isValid) {
        throw new AuthenticationError('Invalid email or password');
    }

    // Log login
    await AuditLog.log({
        userId: user._id,
        action: 'ACCOUNT_LOGIN',
        payload: { email },
        ipAddress,
    });

    // Generate token
    const token = generateToken(user);

    return {
        user: user.toSafeObject(),
        token,
    };
}

/**
 * Generate JWT token
 */
export function generateToken(user) {
    return jwt.sign(
        {
            userId: user._id,
            email: user.email,
            role: user.role,
        },
        config.jwt.secret,
        {
            expiresIn: config.jwt.expiresIn,
        }
    );
}

/**
 * Verify JWT token
 */
export function verifyToken(token) {
    try {
        return jwt.verify(token, config.jwt.secret);
    } catch (error) {
        if (error.name === 'TokenExpiredError') {
            throw new AuthenticationError('Token expired');
        }
        throw new AuthenticationError('Invalid token');
    }
}

/**
 * Get user by ID
 */
export async function getUserById(userId) {
    const user = await User.findById(userId);
    if (!user) {
        throw new AuthenticationError('User not found');
    }
    if (!user.isActive) {
        throw new AuthenticationError('Account is deactivated');
    }
    return user;
}

/**
 * Update user profile
 */
export async function updateProfile(userId, updates) {
    const allowedUpdates = ['timezone', 'firstName', 'lastName'];
    const filteredUpdates = {};

    for (const key of allowedUpdates) {
        if (updates[key] !== undefined) {
            filteredUpdates[key] = updates[key];
        }
    }

    if (filteredUpdates.timezone && !isValidTimezone(filteredUpdates.timezone)) {
        throw new ValidationError('Invalid timezone');
    }

    const user = await User.findByIdAndUpdate(
        userId,
        { $set: filteredUpdates },
        { new: true }
    );

    if (!user) {
        throw new AuthenticationError('User not found');
    }

    await AuditLog.log({
        userId: user._id,
        action: 'ACCOUNT_UPDATE',
        payload: filteredUpdates,
        createdBy: userId,
    });

    return user.toSafeObject();
}
