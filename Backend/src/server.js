import app from './app.js';
import config from './config/index.js';
import connectDatabase from './config/database.js';
import createRedisClient from './config/redis.js';
import { startScheduler } from './services/scheduler.service.js';
import logger from './utils/logger.js';

const startServer = async () => {
    try {
        // Connect to MongoDB
        await connectDatabase();

        // Initialize Redis
        createRedisClient();

        // Start the scheduler for rollback enforcement
        if (config.env !== 'test') {
            startScheduler();
        }

        // Start Express server
        const server = app.listen(config.port, () => {
            logger.info(`Server running in ${config.env} mode on port ${config.port}`);
            logger.info(`API docs available at ${config.apiUrl}/api-docs`);
        });

        // Graceful shutdown
        const shutdown = async (signal) => {
            logger.info(`${signal} received, shutting down gracefully`);

            server.close(() => {
                logger.info('HTTP server closed');
                process.exit(0);
            });

            // Force exit after 30 seconds
            setTimeout(() => {
                logger.error('Could not close connections in time, forcefully shutting down');
                process.exit(1);
            }, 30000);
        };

        process.on('SIGTERM', () => shutdown('SIGTERM'));
        process.on('SIGINT', () => shutdown('SIGINT'));

    } catch (error) {
        logger.error('Failed to start server:', error);
        process.exit(1);
    }
};

startServer();
