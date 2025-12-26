import { Router } from 'express';
import * as submissionController from '../controllers/submission.controller.js';
import { validateBody, validateParams, schemas } from '../utils/validation.js';
import { authenticate } from '../middleware/auth.middleware.js';

const router = Router();

// All submission routes require authentication
router.use(authenticate);

/**
 * @swagger
 * /api/v1/submissions:
 *   post:
 *     summary: Create a new submission
 *     tags: [Submissions]
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
 *               - day
 *               - code
 *             properties:
 *               language:
 *                 type: string
 *               day:
 *                 type: integer
 *               code:
 *                 type: string
 *     responses:
 *       201:
 *         description: Submission created
 */
router.post('/', validateBody(schemas.submission), submissionController.createSubmission);

/**
 * @swagger
 * /api/v1/submissions/{id}:
 *   get:
 *     summary: Get submission by ID
 *     tags: [Submissions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Submission details
 */
router.get('/:id', validateParams(schemas.submissionIdParam), submissionController.getSubmission);

/**
 * @swagger
 * /api/v1/submissions/{id}/poll:
 *   get:
 *     summary: Poll submission status
 *     tags: [Submissions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Submission status
 */
router.get(
    '/:id/poll',
    validateParams(schemas.submissionIdParam),
    submissionController.pollSubmission
);

/**
 * @swagger
 * /api/v1/submissions/history/{language}:
 *   get:
 *     summary: Get submission history for a language
 *     tags: [Submissions]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: language
 *         required: true
 *         schema:
 *           type: string
 *       - in: query
 *         name: day
 *         schema:
 *           type: integer
 *       - in: query
 *         name: limit
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Submission history
 */
router.get(
    '/history/:language',
    validateParams(schemas.languageParam),
    submissionController.getSubmissionHistory
);

export default router;
