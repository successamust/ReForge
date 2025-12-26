import connectDatabase from '../config/database.js';
import createRedisClient from '../config/redis.js';
import { startWorker, stopWorker } from './grading.worker.js';
import logger from '../utils/logger.js';

/**
 * Standalone worker runner
 * Can be run as a separate process
 */
const startWorkerProcess = async () => {
    try {
        logger.info('Starting worker process...');

        // Connect to MongoDB
        await connectDatabase();

        // Initialize Redis
        createRedisClient();

        // Start the worker
        startWorker();

        // Graceful shutdown
        const shutdown = async (signal) => {
            logger.info(`${signal} received, stopping worker`);
            await stopWorker();
            process.exit(0);
        };

        process.on('SIGTERM', () => shutdown('SIGTERM'));
        process.on('SIGINT', () => shutdown('SIGINT'));

        logger.info('Worker process running');
    } catch (error) {
        logger.error('Failed to start worker:', error);
        process.exit(1);
    }
};

startWorkerProcess();
