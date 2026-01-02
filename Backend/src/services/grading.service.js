import { Queue } from 'bullmq';
import { Submission, Lesson, User } from '../models/index.js';
import { getRedisConnection } from '../config/redis.js';
import { NotFoundError, ProgressionError, GradingError } from '../utils/errors.js';
import * as progressService from './progress.service.js';
import config from '../config/index.js';
import logger from '../utils/logger.js';

let submissionQueue = null;

export function getSubmissionQueue() {
    if (!submissionQueue) {
        submissionQueue = new Queue('submissions', {
            connection: getRedisConnection(),
            defaultJobOptions: {
                attempts: 3,
                backoff: {
                    type: 'exponential',
                    delay: 1000,
                },
                removeOnComplete: 100,
                removeOnFail: 100,
            },
        });
    }
    return submissionQueue;
}

/**
 * Create a new submission and queue it for grading
 */
export async function createSubmission(userId, language, day, code) {
    const user = await User.findById(userId);
    if (!user) {
        throw new NotFoundError('User');
    }

    const canAttempt = await progressService.canAttemptDay(userId, language, day);
    if (!canAttempt.allowed) {
        throw new ProgressionError(canAttempt.reason);
    }

    const lesson = await Lesson.findByLanguageAndDay(language, day);
    if (!lesson) {
        throw new NotFoundError(`Lesson for ${language} day ${day}`);
    }

    const submission = new Submission({
        userId,
        language,
        day,
        code,
        status: 'pending',
    });

    await submission.save();

    const queue = getSubmissionQueue();
    const job = await queue.add('grade', {
        submissionId: submission._id.toString(),
        userId,
        language,
        day,
        code,
        tests: lesson.getAllTests(),
    }, {
        jobId: `submission-${submission._id}`,
    });

    // Update submission with job ID
    submission.jobId = job.id;
    await submission.save();

    logger.info(`Created submission ${submission._id} for user ${userId}, ${language} day ${day}`);

    return submission.toUserObject();
}

/**
 * Get submission by ID
 */
export async function getSubmission(submissionId, userId = null) {
    const query = { _id: submissionId };
    if (userId) {
        query.userId = userId;
    }

    const submission = await Submission.findOne(query);
    if (!submission) {
        throw new NotFoundError('Submission');
    }

    return submission.toUserObject();
}

/**
 * Get submission history for a user
 */
export async function getSubmissionHistory(userId, language, options = {}) {
    return Submission.getHistory(userId, language, options);
}

/**
 * Process grading result (called by worker)
 */
export async function processGradingResult(submissionId, result) {
    const submission = await Submission.findById(submissionId);
    if (!submission) {
        throw new NotFoundError('Submission');
    }

    // Update submission with result
    submission.status = result.passed ? 'completed' : 'failed';
    submission.resultDetails = {
        passed: result.passed,
        details: result.details,
        summary: result.summary,
        executionTimeMs: result.executionTimeMs,
    };
    submission.finishedAt = new Date();

    await submission.save();

    // Update user progress based on result
    if (result.passed) {
        await progressService.advanceProgress(
            submission.userId,
            submission.language,
            submission.day
        );

        // Update leaderboard asynchronously
        import('./leaderboard.service.js')
            .then(m => m.updateUserRank(submission.userId))
            .catch(err => logger.error('Leaderboard update failed', err));

    } else {
        await progressService.recordFailure(
            submission.userId,
            submission.language,
            submission.day
        );
    }

    logger.info(
        `Graded submission ${submissionId}: ${result.passed ? 'PASSED' : 'FAILED'} ` +
        `(${result.summary.passedCount}/${result.summary.total})`
    );

    return submission.toUserObject();
}

/**
 * Mark submission as errored
 */
export async function markSubmissionError(submissionId, errorMessage) {
    const submission = await Submission.findById(submissionId);
    if (!submission) {
        throw new NotFoundError('Submission');
    }

    submission.status = 'error';
    submission.resultDetails = {
        passed: false,
        details: [],
        summary: { passedCount: 0, total: 0 },
        error: errorMessage,
    };
    submission.finishedAt = new Date();

    await submission.save();

    logger.error(`Submission ${submissionId} errored: ${errorMessage}`);

    return submission;
}

/**
 * Admin: Re-run a submission
 */
export async function rerunSubmission(submissionId, adminId) {
    const submission = await Submission.findById(submissionId);
    if (!submission) {
        throw new NotFoundError('Submission');
    }

    // Get lesson for tests
    const lesson = await Lesson.findByLanguageAndDay(submission.language, submission.day);
    if (!lesson) {
        throw new NotFoundError('Lesson');
    }

    // Reset submission status
    submission.status = 'pending';
    submission.resultDetails = null;
    submission.finishedAt = null;
    await submission.save();

    const queue = getSubmissionQueue();
    const job = await queue.add('grade', {
        submissionId: submission._id.toString(),
        userId: submission.userId.toString(),
        language: submission.language,
        day: submission.day,
        code: submission.code,
        tests: lesson.getAllTests(),
        isRerun: true,
    }, {
        jobId: `rerun-${submission._id}-${Date.now()}`,
    });

    submission.jobId = job.id;
    await submission.save();

    logger.info(`Admin ${adminId} re-running submission ${submissionId}`);

    return submission.toUserObject();
}
