import connectDatabase from '../config/database.js';
import createRedisClient from '../config/redis.js';
import { startScheduler } from '../services/scheduler.service.js';
import logger from '../utils/logger.js';

/**
 * Standalone scheduler runner
 * Can be run as a separate process
 */
const startSchedulerProcess = async () => {
    try {
        logger.info('Starting scheduler process...');

        // Connect to MongoDB
        await connectDatabase();

        // Initialize Redis
        createRedisClient();

        // Start the scheduler
        const task = startScheduler();

        // Graceful shutdown
        const shutdown = async (signal) => {
            logger.info(`${signal} received, stopping scheduler`);
            task.stop();
            process.exit(0);
        };

        process.on('SIGTERM', () => shutdown('SIGTERM'));
        process.on('SIGINT', () => shutdown('SIGINT'));

        logger.info('Scheduler process running');
    } catch (error) {
        logger.error('Failed to start scheduler:', error);
        process.exit(1);
    }
};

startSchedulerProcess();
