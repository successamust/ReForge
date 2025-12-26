import * as gradingService from '../services/grading.service.js';

/**
 * Create new submission
 */
export async function createSubmission(req, res, next) {
    try {
        const { language, day, code } = req.body;
        const userId = req.userId;

        const submission = await gradingService.createSubmission(userId, language, day, code);

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
