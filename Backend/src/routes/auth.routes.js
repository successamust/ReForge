import { Router } from 'express';
import passport from 'passport';
import * as authController from '../controllers/auth.controller.js';
import { validateBody, schemas } from '../utils/validation.js';
import { authenticate } from '../middleware/auth.middleware.js';
import { authLimiter } from '../middleware/rateLimit.middleware.js';

const router = Router();

/**
 * @swagger
 * /v1/auth/register:
 *   post:
 *     summary: Register a new user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *               timezone:
 *                 type: string
 *     responses:
 *       201:
 *         description: User registered successfully
 */
router.post('/register', authLimiter, validateBody(schemas.register), authController.register);

/**
 * @swagger
 * /v1/auth/login:
 *   post:
 *     summary: Login user
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - email
 *               - password
 *             properties:
 *               email:
 *                 type: string
 *               password:
 *                 type: string
 *     responses:
 *       200:
 *         description: Login successful
 */
router.post('/login', authLimiter, validateBody(schemas.login), authController.login);

// Google Auth
router.get('/google', passport.authenticate('google', { scope: ['profile', 'email'], session: false }));
router.get(
    '/google/callback',
    passport.authenticate('google', { failureRedirect: '/login', session: false }),
    authController.socialLoginCallback
);

// GitHub Auth
router.get('/github', passport.authenticate('github', { scope: ['user:email'], session: false }));
router.get(
    '/github/callback',
    passport.authenticate('github', { failureRedirect: '/login', session: false }),
    authController.socialLoginCallback
);

/**
 * @swagger
 * /v1/auth/verify-email:
 *   post:
 *     summary: Verify email address
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [token]
 *             properties:
 *               token: { type: string }
 *     responses:
 *       200: { description: Email verified }
 */
router.post('/verify-email', authLimiter, authController.verifyEmail);

/**
 * @swagger
 * /v1/auth/forgot-password:
 *   post:
 *     summary: Request password reset email
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [email]
 *             properties:
 *               email: { type: string }
 *     responses:
 *       200: { description: Reset email sent }
 */
router.post('/forgot-password', authLimiter, authController.forgotPassword);

/**
 * @swagger
 * /v1/auth/reset-password:
 *   post:
 *     summary: Reset password with token
 *     tags: [Auth]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required: [token, password]
 *             properties:
 *               token: { type: string }
 *               password: { type: string }
 *     responses:
 *       200: { description: Password reset successful }
 */
router.post('/reset-password', authLimiter, validateBody(schemas.resetPassword), authController.resetPassword);

/**
 * @swagger
 * /v1/auth/profile:
 *   get:
 *     summary: Get current user profile
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User profile
 */
router.get('/profile', authenticate, authController.getProfile);

/**
 * @swagger
 * /v1/auth/profile:
 *   put:
 *     summary: Update user profile
 *     tags: [Auth]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Profile updated
 */
router.put('/profile', authenticate, authController.updateProfile);

export default router;
