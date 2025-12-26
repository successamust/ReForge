import { jest, describe, it, expect, beforeAll, afterAll, afterEach } from '@jest/globals';
import * as authService from '../../src/services/auth.service.js';
import { User } from '../../src/models/index.js';
import mongoose from 'mongoose';

describe('Auth Service - Social Login', () => {
    afterEach(async () => {
        await User.deleteMany({});
    });

    it('should create a new user if one does not exist', async () => {
        const profile = {
            id: 'google-123',
            emails: [{ value: 'new-google-user@example.com' }],
            displayName: 'Google User',
            name: { givenName: 'Google', familyName: 'User' }
        };

        const result = await authService.socialLogin('google', profile);

        expect(result.user.email).toBe('new-google-user@example.com');
        expect(result.user.firstName).toBe('Google');
        expect(result.user.googleId).toBe('google-123');
        expect(result.token).toBeDefined();

        const dbUser = await User.findOne({ email: 'new-google-user@example.com' });
        expect(dbUser).toBeDefined();
        expect(dbUser.googleId).toBe('google-123');
    });

    it('should link provider ID if user exists by email', async () => {
        const existingUser = new User({
            email: 'existing@example.com',
            firstName: 'Existing',
            lastName: 'User',
            passwordHash: 'hashed-pass',
        });
        await existingUser.save();

        const profile = {
            id: 'github-456',
            emails: [{ value: 'existing@example.com' }],
            displayName: 'GitHub Account',
        };

        const result = await authService.socialLogin('github', profile);

        expect(result.user.email).toBe('existing@example.com');
        expect(result.token).toBeDefined();

        const dbUser = await User.findOne({ email: 'existing@example.com' });
        expect(dbUser.githubId).toBe('github-456');
    });

    it('should throw error if email is not provided', async () => {
        const profile = {
            id: 'google-789',
            emails: [],
        };

        await expect(authService.socialLogin('google', profile))
            .rejects.toThrow(/Email address not provided/);
    });
});
