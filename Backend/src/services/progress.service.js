import mongoose from 'mongoose';
import { User, AuditLog, Submission } from '../models/index.js';
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
import * as leaderboardService from './leaderboard.service.js';

export async function getProgress(userId, language) {
    const user = await User.findById(userId);
    if (!user) {
        throw new NotFoundError('User');
    }

    // Check if progress exists before calling getProgress
    const progressExists = user.progress.some(p => p.language === language);
    const progress = user.getProgress(language);

    // If progress was just initialized (not in DB), save it ONLY if we want to start it
    // This function can be called by advanceProgress or by direct lesson access
    if (!progressExists) {
        await user.save();

        // Log the start of a new track
        await AuditLog.log({
            userId,
            action: 'PROGRESS_START',
            payload: { language },
        });

        // Check for achievements (e.g., Polyglot)
        import('./achievement.service.js').then(service => {
            service.checkAchievements(userId, {
                language,
                day: 1,
                event: 'enrollment'
            });
        }).catch(err => logger.error('Achievement check failed on enrollment', err));
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

export async function getAllProgress(userId) {
    const user = await User.findById(userId);
    if (!user) {
        throw new NotFoundError('User');
    }

    // Get progress only for languages where the user has actually started
    // We filter the config.supportedLanguages against user.progress
    const progressList = config.supportedLanguages.map(language => {
        const existingProgress = user.progress.find(p => p.language === language);

        if (!existingProgress) {
            return {
                language,
                currentDay: 0, // 0 indicates not started
                lastPassedDay: 0,
                failedDay: null,
                failedAt: null,
                attemptCount: 0,
                completedAt: null,
                remainingWindow: null,
                isCompleted: false,
                notStarted: true
            };
        }

        const progress = user.getProgress(language);

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
    });

    return progressList;
}

export async function advanceProgress(userId, language, day, submissionData = {}) {
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
                    'progress.$.lastAdvancedAt': new Date(),
                    'progress.$.completedAt': day >= config.maxDays ? new Date() : null,
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
                                lastAdvancedAt: new Date(),
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
        await updateUserStats(user, language, day, session, submissionData);

        // Check for achievements
        const achievementService = await import('./achievement.service.js');
        const newAchievements = await achievementService.checkAchievements(userId, {
            language,
            completed: day >= config.maxDays,
            day,
            completionTimeMinutes: submissionData.completionTimeMinutes,
            isFirstTry: submissionData.isFirstTry,
        });

        await session.commitTransaction();

        // Update leaderboard asynchronously
        leaderboardService.updateUserRank(userId).catch(err => {
            logger.error(`Failed to update leaderboard for user ${userId}:`, err);
        });

        return {
            success: true,
            dayAdvanced: day < config.maxDays ? day + 1 : day,
            courseCompleted: day >= config.maxDays,
            newAchievements,
        };
    } catch (error) {
        await session.abortTransaction();
        throw error;
    } finally {
        session.endSession();
    }
}

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

async function updateUserStats(user, language, day, session, submissionData = {}) {
    const todayStr = getCurrentCalendarDate(user.timezone);
    const yesterdayDate = new Date();
    yesterdayDate.setDate(yesterdayDate.getDate() - 1);
    const yesterdayStr = getCurrentCalendarDate(user.timezone, yesterdayDate);

    const lastActivityStr = user.stats.lastActivityAt
        ? getCurrentCalendarDate(user.timezone, user.stats.lastActivityAt)
        : null;

    // Calculate base points
    let points = 100;

    // Speed Bonus: +50 if completed under 30 minutes
    if (submissionData.completionTimeMinutes && submissionData.completionTimeMinutes < 30) {
        points += 50;
    }

    // First Try Bonus: +25 if no previous failed attempts for this day
    if (submissionData.isFirstTry) {
        points += 25;
    }

    // Calculate current streak for multiplier
    let currentStreak = user.stats.currentStreak || 0;
    if (lastActivityStr === yesterdayStr) {
        currentStreak += 1;
    } else if (lastActivityStr !== todayStr) {
        currentStreak = 1;
    }

    // Apply Streak Multiplier
    let streakMultiplier = 1.0;
    if (currentStreak >= 30) {
        streakMultiplier = 1.5;
    } else if (currentStreak >= 14) {
        streakMultiplier = 1.2;
    } else if (currentStreak >= 7) {
        streakMultiplier = 1.1;
    }

    // Apply multiplier and round
    const finalPoints = Math.round(points * streakMultiplier);

    const updateStats = {
        $inc: { 'stats.totalPoints': finalPoints },
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

    // Update user object directly for subsequent checks in the same session
    if (lastActivityStr === yesterdayStr) {
        user.stats.currentStreak += 1;
    } else if (lastActivityStr !== todayStr) {
        user.stats.currentStreak = 1;
    }

    if (user.stats.currentStreak > user.stats.maxStreak) {
        updateStats.$set['stats.maxStreak'] = user.stats.currentStreak;
    }

    // Also update language-specific points
    updateStats.$inc['progress.$.points'] = finalPoints;

    await User.updateOne(
        {
            _id: user._id,
            'progress.language': language
        },
        updateStats,
        { session }
    );

    logger.info(`User ${user._id} earned ${finalPoints} points (base: ${points}, multiplier: ${streakMultiplier}x)`);
}

export async function getUserStats(userId) {
    const user = await User.findById(userId);
    if (!user) {
        throw new NotFoundError('User');
    }

    // Aggregate submissions to get accuracy
    const stats = await Submission.aggregate([
        { $match: { userId: new mongoose.Types.ObjectId(userId) } },
        {
            $group: {
                _id: null,
                total: { $sum: 1 },
                completed: {
                    $sum: {
                        $cond: [{ $eq: ["$status", "completed"] }, 1, 0]
                    }
                }
            }
        }
    ]);

    const submissionStats = stats[0] || { total: 0, completed: 0 };
    const accuracy = submissionStats.total > 0
        ? Math.round((submissionStats.completed / submissionStats.total) * 1000) / 10
        : 0; // 1 decimal place

    return {
        streak: user.stats.currentStreak || 0,
        maxStreak: user.stats.maxStreak || 0,
        totalPoints: user.stats.totalPoints || 0,
        accuracy: accuracy,
        totalSubmissions: submissionStats.total,
        successfulSubmissions: submissionStats.completed
    };
}
