import { Router } from 'express';
import * as lessonController from '../controllers/lesson.controller.js';
import { validateParams, schemas } from '../utils/validation.js';
import { authenticate, optionalAuth, requireVerified } from '../middleware/auth.middleware.js';

const router = Router();

/**
 * @swagger
 * /v1/lessons/{language}:
 *   get:
 *     summary: Get all lessons overview for a language
 *     tags: [Lessons]
 *     parameters:
 *       - in: path
 *         name: language
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: List of lessons
 */
router.get(
    '/:language',
    validateParams(schemas.languageParam),
    lessonController.getLessonsByLanguage
);

/**
 * @swagger
 * /v1/lessons/{language}/current:
 *   get:
 *     summary: Get current lesson based on user progress
 *     tags: [Lessons]
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
 *         description: Current lesson with progress
 */
router.get(
    '/:language/current',
    authenticate,
    requireVerified,
    validateParams(schemas.languageParam),
    lessonController.getCurrentLesson
);

/**
 * @swagger
 * /v1/lessons/{language}/{day}:
 *   get:
 *     summary: Get specific lesson
 *     tags: [Lessons]
 *     parameters:
 *       - in: path
 *         name: language
 *         required: true
 *         schema:
 *           type: string
 *       - in: path
 *         name: day
 *         required: true
 *         schema:
 *           type: integer
 *     responses:
 *       200:
 *         description: Lesson details
 */
router.get(
    '/:language/:day',
    authenticate,
    requireVerified,
    validateParams(schemas.lessonParams),
    lessonController.getLesson
);

export default router;
