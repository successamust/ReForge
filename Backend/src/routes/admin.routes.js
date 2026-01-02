import { Router } from 'express';
import * as adminController from '../controllers/admin.controller.js';
import { validateBody, validateParams, schemas } from '../utils/validation.js';
import { authenticate, requireAdmin } from '../middleware/auth.middleware.js';

const router = Router();

// All admin routes require authentication and admin role
router.use(authenticate);
router.use(requireAdmin);

/**
 * @swagger
 * /v1/admin/dashboard:
 *   get:
 *     summary: Get system dashboard stats
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 */
router.get('/dashboard', adminController.getSystemStats);

/**
 * @swagger
 * /v1/admin/lessons:
 *   post:
 *     summary: Create a new lesson
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/Lesson'
 *     responses:
 *       201:
 *         description: Lesson created
 */
router.post('/lessons', validateBody(schemas.lesson), adminController.createLesson);

/**
 * @swagger
 * /v1/admin/lessons/{language}/{day}:
 *   get:
 *     summary: Get lesson with solution (admin only)
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 */
router.get(
    '/lessons/:language/:day',
    validateParams(schemas.lessonParams),
    adminController.getLessonWithSolution
);

/**
 * @swagger
 * /v1/admin/lessons/{language}/{day}:
 *   put:
 *     summary: Update a lesson
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 */
router.put(
    '/lessons/:language/:day',
    validateParams(schemas.lessonParams),
    adminController.updateLesson
);

/**
 * @swagger
 * /v1/admin/lessons/{language}/{day}:
 *   delete:
 *     summary: Delete a lesson
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 */
router.delete(
    '/lessons/:language/:day',
    validateParams(schemas.lessonParams),
    adminController.deleteLesson
);

/**
 * @swagger
 * /v1/admin/progress/override:
 *   post:
 *     summary: Override user progress
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             required:
 *               - userId
 *               - language
 *               - currentDay
 *               - reason
 *             properties:
 *               userId:
 *                 type: string
 *               language:
 *                 type: string
 *               currentDay:
 *                 type: integer
 *               reason:
 *                 type: string
 *     responses:
 *       200:
 *         description: Progress overridden
 */
router.post(
    '/progress/override',
    validateBody(schemas.overrideProgress),
    adminController.overrideProgress
);

/**
 * @swagger
 * /v1/admin/submissions/{id}/rerun:
 *   post:
 *     summary: Re-run a submission
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 */
router.post(
    '/submissions/:id/rerun',
    validateParams(schemas.submissionIdParam),
    adminController.rerunSubmission
);

/**
 * @swagger
 * /v1/admin/users:
 *   get:
 *     summary: Get all users (paginated)
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 */
router.get('/users', adminController.getUsers);

/**
 * @swagger
 * /v1/admin/users/{id}:
 *   get:
 *     summary: Get user by ID
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 */
router.get('/users/:id', validateParams(schemas.submissionIdParam), adminController.getUser);

/**
 * @swagger
 * /v1/admin/users/{id}:
 *   put:
 *     summary: Update user (role, status)
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 */
router.put(
    '/users/:id',
    validateParams(schemas.submissionIdParam),
    validateBody(schemas.updateUser),
    adminController.updateUser
);

/**
 * @swagger
 * /v1/admin/users/{id}/achievements:
 *   get:
 *     summary: Get user achievements (admin only)
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 */
router.get('/users/:id/achievements', adminController.getUserAchievements);

/**
 * @swagger
 * /v1/admin/users/{id}/tier:
 *   put:
 *     summary: Update user subscription tier
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 */
router.put(
    '/users/:id/tier',
    validateBody(schemas.updateUserTier),
    adminController.updateUserTier
);

/**
 * @swagger
 * /v1/admin/audit-logs:
 *   get:
 *     summary: Get audit logs
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 */
router.get('/audit-logs', adminController.getAuditLogs);

/**
 * @swagger
 * /v1/admin/reports/users:
 *   get:
 *     summary: Export user report
 *     tags: [Admin]
 *     security:
 *       - bearerAuth: []
 */
router.get('/reports/users', adminController.exportUserReport);

export default router;
