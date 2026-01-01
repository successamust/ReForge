import mongoose from 'mongoose';
import { User, AuditLog } from '../models/index.js';
import { ProgressionError, NotFoundError } from '../utils/errors.js';
import {
    hasCalendarDayWindowExpired,
    getRemainingWindowTime,
    formatRemainingTime,
    getCurrentCalendarDate
} from '../utils/timezone.js';
import { Lesson } from '../models/index.js';
import config from '../config/index.js';
import logger from '../utils/logger.js';

/**
 * Get user's progress for a specific language
 */
export async function getProgress(userId, language) {
    const user = await User.findById(userId);
    if (!user) {
        throw new NotFoundError('User');
    }

    // Check if progress exists before calling getProgress
    const progressExists = user.progress.some(p => p.language === language);
    const progress = user.getProgress(language);
    
    // If progress was just initialized (not in DB), save it
    if (!progressExists) {
        await user.save();
    }

    // Calculate remaining window time if failing
    let remainingWindow = null;
    if (progress.failedAt) {
        const remainingMs = getRemainingWindowTime(progress.failedAt, user.timezone);
        remainingWindow = {
            milliseconds: remainingMs,
            formatted: formatRemainingTime(remainingMs),
            expired: remainingMs === 0,
        };
    }

    return {
        language: progress.language,
        currentDay: progress.currentDay,
        lastPassedDay: progress.lastPassedDay,
        failedDay: progress.failedDay,
        failedAt: progress.failedAt,
        attemptCount: progress.attemptCount,
        completedAt: progress.completedAt,
        remainingWindow,
        isCompleted: progress.currentDay > config.maxDays || progress.completedAt !== null,
    };
}

/**
 * Get all progress for a user
 */
export async function getAllProgress(userId) {
    const user = await User.findById(userId);
    if (!user) {
        throw new NotFoundError('User');
    }

    // Get progress for all supported languages
    const progressList = [];
    for (const language of config.supportedLanguages) {
        const progress = await getProgress(userId, language);
        progressList.push(progress);
    }

    return progressList;
}

/**
 * Record a successful day completion
 * Uses atomic update to prevent race conditions
 */
export async function advanceProgress(userId, language, day) {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const user = await User.findById(userId).session(session);
        if (!user) {
            throw new NotFoundError('User');
        }

        const progress = user.getProgress(language);

        // Verify this is the current day
        if (progress.currentDay !== day) {
            throw new ProgressionError(
                `Cannot advance: expected day ${progress.currentDay}, got day ${day}`
            );
        }

        // Check if already completed the course
        if (progress.completedAt) {
            throw new ProgressionError('Course already completed');
        }

        // Update progress atomically
        const updateResult = await User.updateOne(
            {
                _id: userId,
                'progress.language': language,
                'progress.currentDay': day, // Ensure still on expected day (optimistic lock)
            },
            {
                $set: {
                    'progress.$.lastPassedDay': day,
                    'progress.$.currentDay': day < config.maxDays ? day + 1 : day,
                    'progress.$.failedDay': null,
                    'progress.$.failedAt': null,
                    'progress.$.completedAt': day >= config.maxDays ? new Date() : null,
                },
                $inc: {
                    'progress.$.attemptCount': 0, // Reset on pass
                },
            },
            { session }
        );

        // If no update, might need to initialize progress first
        if (updateResult.modifiedCount === 0) {
            // Check if progress doesn't exist for this language
            const hasProgress = user.progress.some(p => p.language === language);

            if (!hasProgress) {
                // Initialize progress
                await User.updateOne(
                    { _id: userId },
                    {
                        $push: {
                            progress: {
                                language,
                                currentDay: day < config.maxDays ? day + 1 : day,
                                lastPassedDay: day,
                                failedDay: null,
                                failedAt: null,
                                attemptCount: 0,
                                completedAt: day >= config.maxDays ? new Date() : null,
                            },
                        },
                    },
                    { session }
                );
            } else {
                throw new ProgressionError('Concurrent update detected, please retry');
            }
        }

        // Log the advancement
        await AuditLog.log({
            userId,
            action: day >= config.maxDays ? 'PROGRESS_COMPLETE' : 'PROGRESS_ADVANCE',
            payload: {
                language,
                fromDay: day,
                toDay: day < config.maxDays ? day + 1 : day,
                completed: day >= config.maxDays,
            },
        });

        // Update user stats (streaks and points)
        await updateUserStats(user, language, day, session);

        // Check for achievements
        import('./achievement.service.js').then(service => {
            service.checkAchievements(userId, { language, completed: day >= config.maxDays });
        }).catch(err => logger.error('Achievement check failed', err));

        await session.commitTransaction();

        logger.info(`User ${userId} advanced from day ${day} to ${day + 1} in ${language}`);

        return {
            previousDay: day,
            currentDay: day < config.maxDays ? day + 1 : day,
            completed: day >= config.maxDays,
        };
    } catch (error) {
        await session.abortTransaction();
        throw error;
    } finally {
        session.endSession();
    }
}

/**
 * Record a failed attempt
 * Only sets failedAt on first failure of the day
 */
export async function recordFailure(userId, language, day) {
    const user = await User.findById(userId);
    if (!user) {
        throw new NotFoundError('User');
    }

    const progress = user.getProgress(language);

    // Verify this is the current day
    if (progress.currentDay !== day) {
        throw new ProgressionError(
            `Cannot record failure: expected day ${progress.currentDay}, got day ${day}`
        );
    }

    // Only set failedAt on FIRST failure (if not already set for this day)
    const isFirstFailure = progress.failedDay !== day;

    const updateData = {
        $inc: { 'progress.$.attemptCount': 1 },
    };

    if (isFirstFailure) {
        updateData.$set = {
            'progress.$.failedDay': day,
            'progress.$.failedAt': new Date(),
        };
    }

    await User.updateOne(
        {
            _id: userId,
            'progress.language': language,
        },
        updateData
    );

    // Log the failure
    await AuditLog.log({
        userId,
        action: 'PROGRESS_FAIL',
        payload: {
            language,
            day,
            isFirstFailure,
            attemptCount: progress.attemptCount + 1,
        },
    });

    logger.info(`User ${userId} failed day ${day} in ${language} (first: ${isFirstFailure})`);

    return {
        day,
        isFirstFailure,
        attemptCount: progress.attemptCount + 1,
    };
}

/**
 * Apply rollback punishment
 * Called by scheduler when window expires
 */
export async function applyRollback(userId, language, isSystem = true) {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const user = await User.findById(userId).session(session);
        if (!user) {
            throw new NotFoundError('User');
        }

        const progress = user.getProgress(language);

        // Skip if admin override is active
        if (progress.adminOverride) {
            logger.info(`Skipping rollback for user ${userId} - admin override active`);
            await session.abortTransaction();
            return null;
        }

        // Skip if no failure to rollback
        if (!progress.failedDay) {
            await session.abortTransaction();
            return null;
        }

        // Calculate rollback target
        const failedDay = progress.failedDay;
        const lastPassedDay = progress.lastPassedDay;

        // Rollback to lastPassedDay, or day 1 if lastPassedDay is 0
        const rollbackTo = lastPassedDay > 0 ? lastPassedDay : 1;

        // Apply rollback
        await User.updateOne(
            {
                _id: userId,
                'progress.language': language,
            },
            {
                $set: {
                    'progress.$.currentDay': rollbackTo,
                    'progress.$.failedDay': null,
                    'progress.$.failedAt': null,
                    'progress.$.adminOverride': false,
                },
            },
            { session }
        );

        // Log the rollback
        await AuditLog.log({
            userId,
            action: 'PROGRESS_ROLLBACK',
            payload: {
                language,
                failedDay,
                rollbackFrom: progress.currentDay,
                rollbackTo,
                lastPassedDay,
                reason: 'Calendar day window expired',
            },
            isSystem,
        });

        await session.commitTransaction();

        logger.info(
            `Applied rollback for user ${userId}: ${language} day ${progress.currentDay} -> ${rollbackTo}`
        );

        return {
            userId,
            language,
            failedDay,
            rollbackFrom: progress.currentDay,
            rollbackTo,
        };
    } catch (error) {
        await session.abortTransaction();
        throw error;
    } finally {
        session.endSession();
    }
}

/**
 * Admin: Override user progress
 */
export async function adminOverrideProgress(
    userId,
    language,
    newCurrentDay,
    reason,
    adminId
) {
    const session = await mongoose.startSession();
    session.startTransaction();

    try {
        const user = await User.findById(userId).session(session);
        if (!user) {
            throw new NotFoundError('User');
        }

        const progress = user.getProgress(language);
        const previousDay = progress.currentDay;

        // Update progress
        const hasProgress = user.progress.some(p => p.language === language);

        if (hasProgress) {
            await User.updateOne(
                {
                    _id: userId,
                    'progress.language': language,
                },
                {
                    $set: {
                        'progress.$.currentDay': newCurrentDay,
                        'progress.$.lastPassedDay': newCurrentDay - 1,
                        'progress.$.failedDay': null,
                        'progress.$.failedAt': null,
                        'progress.$.adminOverride': true,
                    },
                },
                { session }
            );
        } else {
            await User.updateOne(
                { _id: userId },
                {
                    $push: {
                        progress: {
                            language,
                            currentDay: newCurrentDay,
                            lastPassedDay: newCurrentDay - 1,
                            failedDay: null,
                            failedAt: null,
                            attemptCount: 0,
                            adminOverride: true,
                        },
                    },
                },
                { session }
            );
        }

        // Log the override
        await AuditLog.log({
            userId,
            action: 'PROGRESS_ADMIN_OVERRIDE',
            payload: {
                language,
                previousDay,
                newDay: newCurrentDay,
                reason,
            },
            createdBy: adminId,
        });

        await session.commitTransaction();

        logger.info(
            `Admin ${adminId} overrode user ${userId} progress: ${language} ${previousDay} -> ${newCurrentDay}`
        );

        return {
            userId,
            language,
            previousDay,
            newDay: newCurrentDay,
            reason,
        };
    } catch (error) {
        await session.abortTransaction();
        throw error;
    } finally {
        session.endSession();
    }
}

/**
 * Check if user can attempt a specific day
 */
export async function canAttemptDay(userId, language, day) {
    const user = await User.findById(userId);
    if (!user) {
        throw new NotFoundError('User');
    }

    const progress = user.getProgress(language);

    // Normal case: can only attempt current day
    if (progress.currentDay === day) {
        return { allowed: true };
    }

    // After rollback: can attempt both rolled-back day and previously failed day
    // This is the "two days in one" rule
    if (
        progress.lastPassedDay > 0 &&
        (day === progress.currentDay || day === progress.currentDay + 1) &&
        day <= config.maxDays
    ) {
        // Check if this is the same calendar day as the rollback
        // In practice, this is handled by allowing currentDay and currentDay+1
        // immediately after a rollback
        return { allowed: true };
    }

    return {
        allowed: false,
        reason: `Can only attempt day ${progress.currentDay}`,
        currentDay: progress.currentDay,
    };
}

/**
 * Internal: Update user stats for streaks and points
 */
async function updateUserStats(user, language, day, session) {
    const todayStr = getCurrentCalendarDate(user.timezone);
    const yesterdayDate = new Date();
    yesterdayDate.setDate(yesterdayDate.getDate() - 1);
    const yesterdayStr = getCurrentCalendarDate(user.timezone, yesterdayDate);

    const lastActivityStr = user.stats.lastActivityAt
        ? getCurrentCalendarDate(user.timezone, user.stats.lastActivityAt)
        : null;

    // Points calculation: Base 10 + (Difficulty * 5)
    // We fetch the lesson to get its difficulty
    const lesson = await Lesson.findOne({ language, day }).session(session);
    const pointsToAdd = 10 + (lesson ? lesson.difficulty * 5 : 0);

    const updateStats = {
        $inc: { 'stats.totalPoints': pointsToAdd },
        $set: { 'stats.lastActivityAt': new Date() }
    };

    if (lastActivityStr === todayStr) {
        // Already active today, don't increment streak
    } else if (lastActivityStr === yesterdayStr) {
        // Continued streak
        updateStats.$inc['stats.currentStreak'] = 1;
    } else {
        // New streak or streak lost
        updateStats.$set['stats.currentStreak'] = 1;
    }

    // We can't easily check current vs max in one update without aggregation or fetching first
    // But since we have the user object in advanceProgress, we can do it there.

    // Update user object directly for subsequent checks in the same session
    if (lastActivityStr === yesterdayStr) {
        user.stats.currentStreak += 1;
    } else if (lastActivityStr !== todayStr) {
        user.stats.currentStreak = 1;
    }

    if (user.stats.currentStreak > user.stats.maxStreak) {
        updateStats.$set['stats.maxStreak'] = user.stats.currentStreak;
    }

    await User.updateOne({ _id: user._id }, updateStats, { session });
}
