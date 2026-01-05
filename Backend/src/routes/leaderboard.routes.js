import { Router } from 'express';
import * as leaderboardController from '../controllers/leaderboard.controller.js';
import { authenticate } from '../middleware/auth.middleware.js';

const router = Router();

/**
 * @swagger
 * /v1/leaderboard:
 *   get:
 *     summary: Get global leaderboard
 *     tags: [Leaderboard]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of top users
 */
router.get('/', authenticate, leaderboardController.getLeaderboard);

/**
 * @swagger
 * /v1/leaderboard/me:
 *   get:
 *     summary: Get authenticated user's personal rank
 *     tags: [Leaderboard]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: User's personal rank and stats
 */
router.get('/me', authenticate, leaderboardController.getMyRank);

export default router;
