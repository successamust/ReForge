import { Router } from 'express';
import * as leaderboardController from '../controllers/leaderboard.controller.js';
import { authenticate } from '../middleware/auth.middleware.js';

const router = Router();

/**
 * @swagger
 * /api/v1/leaderboard:
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

export default router;
