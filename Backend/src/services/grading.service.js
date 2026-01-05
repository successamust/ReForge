import { Queue } from 'bullmq';
import { Submission, Lesson, User } from '../models/index.js';
import { getRedisConnection } from '../config/redis.js';
import { NotFoundError, ProgressionError, GradingError } from '../utils/errors.js';
import * as progressService from './progress.service.js';
import config from '../config/index.js';
import logger from '../utils/logger.js';

import { telemetryVerifier } from './telemetry.verifier.js';

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

export async function createSubmission(userId, language, day, code, telemetry = null) {
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

    // Run Telemetry Verification
    if (telemetry) {
        try {
            const verificationResult = await telemetryVerifier.analyzeAndSave(
                telemetry,
                submission._id,
                userId
            );

            submission.verification = {
                verified: verificationResult.verified,
                warning: verificationResult.flags.join(',') || null
            };
            await submission.save();
        } catch (err) {
            logger.error('Verification failed', err);
        }
    }

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

export async function getSubmissionHistory(userId, language, options = {}) {
    return Submission.getHistory(userId, language, options);
}

export async function processGradingResult(submissionId, result) {
    const submission = await Submission.findById(submissionId);
    if (!submission) {
        throw new NotFoundError('Submission');
    }

    // Update submission with result
    submission.status = result.passed ? 'completed' : 'failed';
    submission.resultDetails = {
        passed: result.passed,
        details: result.details.map(t => ({
            testId: t.testId,
            passed: t.passed,
            stdout: t.stdout,
            stderr: t.stderr,
            durationMs: t.durationMs,
            hint: t.hint,
            expected: t.expected,
            actual: t.actual,
            isHidden: t.isHidden
        })),
        summary: result.summary,
        executionTimeMs: result.executionTimeMs,
    };
    submission.finishedAt = new Date();

    await submission.save();

    // Update user progress based on result
    if (result.passed) {
        // Calculate completion time in minutes
        const completionTimeMs = submission.finishedAt - submission.createdAt;
        const completionTimeMinutes = completionTimeMs / (1000 * 60);

        // Check if this is the first try (no previous failed submissions for this day)
        const previousFailedCount = await Submission.countDocuments({
            userId: submission.userId,
            language: submission.language,
            day: submission.day,
            status: 'failed',
            createdAt: { $lt: submission.createdAt }
        });

        const isFirstTry = previousFailedCount === 0;

        // Pass scoring data to advanceProgress
        const progressResult = await progressService.advanceProgress(
            submission.userId,
            submission.language,
            submission.day,
            {
                completionTimeMinutes,
                isFirstTry
            }
        );

        // Store new achievements if any
        if (progressResult.newAchievements?.length > 0) {
            submission.newAchievements = progressResult.newAchievements;
            await submission.save();
        }

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
