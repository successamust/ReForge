import * as gradingService from '../services/grading.service.js';
import { runCode as executeCode } from '../runners/index.js';
import { Lesson } from '../models/index.js';
import { NotFoundError, AuthorizationError } from '../utils/errors.js';

/**
 * Create new submission
 */
export async function createSubmission(req, res, next) {
    try {
        const { language, day, code, telemetry } = req.body;
        const userId = req.userId;

        if (req.user && req.user.status === 'relapsed') {
            throw new AuthorizationError('DETOX_REQUIRED: Complete detox protocol to resume training.');
        }

        const submission = await gradingService.createSubmission(userId, language, day, code, telemetry);

        res.status(201).json({
            success: true,
            data: { submission },
        });
    } catch (error) {
        next(error);
    }
}

/**
 * Get submission by ID
 */
export async function getSubmission(req, res, next) {
    try {
        const { id } = req.params;
        const userId = req.userId;

        const submission = await gradingService.getSubmission(id, userId);

        res.json({
            success: true,
            data: { submission },
        });
    } catch (error) {
        next(error);
    }
}

/**
 * Get submission history
 */
export async function getSubmissionHistory(req, res, next) {
    try {
        const { language } = req.params;
        const { day, limit } = req.query;
        const userId = req.userId;

        const submissions = await gradingService.getSubmissionHistory(userId, language, {
            day: day ? parseInt(day, 10) : undefined,
            limit: limit ? parseInt(limit, 10) : 50,
        });

        res.json({
            success: true,
            data: { submissions },
        });
    } catch (error) {
        next(error);
    }
}

/**
 * Poll submission status
 */
export async function pollSubmission(req, res, next) {
    try {
        const { id } = req.params;
        const userId = req.userId;

        const submission = await gradingService.getSubmission(id, userId);

        res.json({
            success: true,
            data: {
                id: submission._id,
                status: submission.status,
                resultDetails: submission.resultDetails,
                finishedAt: submission.finishedAt,
            },
        });
    } catch (error) {
        next(error);
    }
}
/**
 * Run code immediately without persistence (Scratchpad / Run button)
 */
export async function runCode(req, res, next) {
    try {
        const { language, day, code } = req.body;

        if (req.user && req.user.status === 'relapsed') {
            throw new AuthorizationError('DETOX_REQUIRED: Complete detox protocol to resume training.');
        }

        // Get lesson to get tests
        const lesson = await Lesson.findByLanguageAndDay(language, day);
        if (!lesson) {
            throw new NotFoundError(`Lesson for ${language} day ${day}`);
        }

        // Run code in sandbox (synchronous execution for Run button)
        const result = await executeCode(language, code, lesson.getAllTests());

        res.json({
            success: true,
            data: { result },
        });
    } catch (error) {
        next(error);
    }
}
