import { Router } from 'express';
import * as progressController from '../controllers/progress.controller.js';
import { validateParams, schemas } from '../utils/validation.js';
import { authenticate } from '../middleware/auth.middleware.js';

const router = Router();

// All progress routes require authentication
router.use(authenticate);

/**
 * @swagger
 * /v1/progress:
 *   get:
 *     summary: Get all progress for current user
 *     tags: [Progress]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: Progress for all languages
 */
router.get('/', progressController.getAllProgress);

/**
 * @swagger
 * /v1/progress/achievements:
 *   get:
 *     summary: Get all achievements for current user
 *     tags: [Progress]
 *     security:
 *       - bearerAuth: []
 *     responses:
 *       200:
 *         description: List of achievements
 */
router.get('/achievements', progressController.getUserAchievements);

/**
 * @swagger
 * /v1/progress/{language}:
 *   get:
 *     summary: Get progress for a specific language
 *     tags: [Progress]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: language
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Progress details
 */
router.get('/:language', validateParams(schemas.languageParam), progressController.getProgress);

/**
 * @swagger
 * /v1/progress/{language}/certificate:
 *   get:
 *     summary: Get certificate info
 *     tags: [Progress]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: language
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Certificate info
 */
router.get(
    '/:language/certificate',
    validateParams(schemas.languageParam),
    progressController.getCertificateInfo
);

/**
 * @swagger
 * /v1/progress/{language}/certificate/generate:
 *   post:
 *     summary: Generate certificate PDF
 *     tags: [Progress]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: language
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Certificate PDF
 */
router.post(
    '/:language/certificate/generate',
    validateParams(schemas.languageParam),
    progressController.generateCertificate
);

export default router;
