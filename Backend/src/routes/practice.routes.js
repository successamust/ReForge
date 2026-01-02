import { Router } from 'express';
import * as practiceController from '../controllers/practice.controller.js';
import { validateBody, schemas } from '../utils/validation.js';
import { authenticate } from '../middleware/auth.middleware.js';
import { executionLimiter } from '../middleware/rate-limit.middleware.js';

const router = Router();

router.use(authenticate);

/**
 * @swagger
 * /v1/practice/verify:
 *   post:
 *     summary: Verify code syntax without persistence
 *     tags: [Practice]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - language
 *               - code
 *             properties:
 *               language:
 *                 type: string
 *               code:
 *                 type: string
 */
router.post('/verify', executionLimiter, validateBody(schemas.practice), practiceController.verifySyntax);

export default router;
