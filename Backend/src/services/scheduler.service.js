import cron from 'node-cron';
import { User } from '../models/index.js';
import * as progressService from './progress.service.js';
import { hasCalendarDayWindowExpired } from '../utils/timezone.js';
import config from '../config/index.js';
import logger from '../utils/logger.js';

let isRunning = false;

/**
 * Find users with expired failure windows and apply rollback
 */
export async function processExpiredWindows() {
    if (isRunning) {
        logger.warn('Scheduler already running, skipping');
        return { skipped: true };
    }

    isRunning = true;
    const results = {
        processed: 0,
        rollbacks: 0,
        errors: 0,
        skipped: 0,
    };

    try {
        // Find users with active failure tracking
        // Use indexed query on progress.failedAt
        const usersWithFailures = await User.find({
            'progress.failedAt': { $ne: null },
            'progress.adminOverride': { $ne: true },
            isActive: true,
        }).select('_id email timezone progress');

        logger.info(`Scheduler found ${usersWithFailures.length} users with active failures`);

        for (const user of usersWithFailures) {
            for (const progress of user.progress) {
                if (!progress.failedAt || progress.adminOverride) {
                    continue;
                }

                results.processed++;

                try {
                    // Check if window has expired
                    const expired = hasCalendarDayWindowExpired(
                        progress.failedAt,
                        user.timezone
                    );

                    if (!expired) {
                        results.skipped++;
                        continue;
                    }

                    // Apply rollback
                    const rollbackResult = await progressService.applyRollback(
                        user._id,
                        progress.language,
                        true // isSystem
                    );

                    if (rollbackResult) {
                        results.rollbacks++;
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

/**
 * Start the scheduler
 */
export function startScheduler() {
    const intervalMinutes = config.scheduler.intervalMinutes;

    // Run every N minutes
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
