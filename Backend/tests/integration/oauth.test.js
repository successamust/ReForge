import request from 'supertest';
import mongoose from 'mongoose';
import { jest, describe, it, expect } from '@jest/globals';
import app from '../../src/app.js';

describe('OAuth API', () => {
    describe('GET /api/v1/auth/google/callback', () => {
        it('should handle successful google callback and redirect with token', async () => {
            const mockUser = {
                user: { email: 'oauth-user@example.com' },
                token: 'mock-jwt-token'
            };

            const res = await request(app)
                .get('/api/v1/auth/google/callback')
                .query({ mock_user: JSON.stringify(mockUser) });

            expect(res.status).toBe(302);
            expect(res.headers.location).toContain('mock-jwt-token');
            expect(res.headers.location).toContain('/auth/success');
        });
    });

    describe('GET /api/v1/auth/github/callback', () => {
        it('should handle successful github callback and redirect with token', async () => {
            const mockUser = {
                user: { email: 'github-user@example.com' },
                token: 'mock-github-token'
            };

            const res = await request(app)
                .get('/api/v1/auth/github/callback')
                .query({ mock_user: JSON.stringify(mockUser) });

            expect(res.status).toBe(302);
            expect(res.headers.location).toContain('mock-github-token');
            expect(res.headers.location).toContain('/auth/success');
        });
    });
});
