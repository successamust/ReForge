import cron from 'node-cron';
import { User, SuddenDeathSession } from '../models/index.js';
import * as progressService from './progress.service.js';
import { relapseService } from './relapse.service.js';
import { hasCalendarDayWindowExpired, hasInactivityWindowExpired } from '../utils/timezone.js';
import config from '../config/index.js';
import logger from '../utils/logger.js';

let isRunning = false;

/**
 * Mark old active Arena sessions as expired
 */
async function cleanupExpiredArenaSessions() {
    try {
        const twoHoursAgo = new Date(Date.now() - 2 * 60 * 60 * 1000);
        const expiredSessions = await SuddenDeathSession.find({
            status: 'active',
            startTime: { $lt: twoHoursAgo }
        });

        if (expiredSessions.length > 0) {
            await SuddenDeathSession.updateMany(
                { _id: { $in: expiredSessions.map(s => s._id) } },
                { status: 'expired', endTime: new Date() }
            );
            logger.info(`Scheduler: Cleaned up ${expiredSessions.length} expired Arena sessions`);
        }
    } catch (error) {
        logger.error('Scheduler: Arena cleanup failed:', error);
    }
}

/**
 * Find users with expired failure windows and apply rollback
 */
export async function processExpiredWindows() {
    if (isRunning) {
        logger.warn('Scheduler already running, skipping');
        return { skipped: true };
    }

    isRunning = true;

    // Clean up Arena sessions first
    await cleanupExpiredArenaSessions();

    const results = {
        processed: 0,
        rollbacks: 0,
        errors: 0,
        skipped: 0,
    };

    try {
        const usersToCheck = await User.find({
            isActive: true,
            'progress.completedAt': null,
        }).select('_id email timezone progress');

        logger.info(`Scheduler found ${usersToCheck.length} active users to check for rollbacks`);

        for (const user of usersToCheck) {
            for (const progress of user.progress) {
                // Skip if admin override is active or if there's no failedAt and no lastAdvancedAt (nothing to check)
                if (progress.adminOverride || (!progress.failedAt && !progress.lastAdvancedAt)) {
                    continue;
                }

                results.processed++;

                try {
                    let expired = false;
                    let reason = '';

                    if (progress.failedAt) {
                        expired = hasCalendarDayWindowExpired(
                            progress.failedAt,
                            user.timezone
                        );
                        reason = 'Calendar day window expired after failure';
                    } else if (progress.lastAdvancedAt) {
                        expired = hasInactivityWindowExpired(
                            progress.lastAdvancedAt,
                            user.timezone
                        );
                        reason = 'Inactivity: Missed a full calendar day';
                    }

                    if (!expired) {
                        results.skipped++;
                        continue;
                    }

                    const rollbackResult = await progressService.applyRollback(
                        user._id,
                        progress.language,
                        true
                    );

                    if (rollbackResult) {
                        results.rollbacks++;

                        // TRIGGER RELAPSE!
                        await relapseService.triggerRelapse(user._id, reason, 5);

                        logger.info(
                            `Scheduler: Rolled back user ${user.email} in ${progress.language} ` +
                            `from day ${rollbackResult.rollbackFrom} to day ${rollbackResult.rollbackTo}`
                        );
                    }
                } catch (error) {
                    results.errors++;
                    logger.error(
                        `Scheduler: Error processing user ${user._id} ${progress.language}:`,
                        error
                    );
                }
            }
        }

        logger.info(
            `Scheduler completed: ${results.processed} processed, ` +
            `${results.rollbacks} rollbacks, ${results.skipped} skipped, ` +
            `${results.errors} errors`
        );

        return results;
    } finally {
        isRunning = false;
    }
}

export function startScheduler() {
    const intervalMinutes = config.scheduler.intervalMinutes;

    const cronExpression = `*/${intervalMinutes} * * * *`;

    logger.info(`Starting rollback scheduler with interval: ${intervalMinutes} minutes`);

    const task = cron.schedule(cronExpression, async () => {
        logger.info('Scheduler: Running rollback check...');
        try {
            await processExpiredWindows();
        } catch (error) {
            logger.error('Scheduler: Fatal error:', error);
        }
    });

    // Run immediately on startup
    setTimeout(() => {
        logger.info('Scheduler: Running initial check...');
        processExpiredWindows().catch(err => {
            logger.error('Scheduler: Initial check failed:', err);
        });
    }, 5000);

    return task;
}

/**
 * Stop the scheduler
 */
export function stopScheduler(task) {
    if (task) {
        task.stop();
        logger.info('Scheduler stopped');
    }
}
