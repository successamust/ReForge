import { Worker } from 'bullmq';
import { getRedisConnection } from '../config/redis.js';
import * as gradingService from '../services/grading.service.js';
import { runCode } from '../runners/index.js';
import config from '../config/index.js';
import logger from '../utils/logger.js';

let worker = null;

/**
 * Start the grading worker
 */
export function startWorker() {
    if (worker) {
        logger.warn('Worker already running');
        return worker;
    }

    worker = new Worker(
        'submissions',
        async (job) => {
            const { submissionId, language, code, tests, isRerun } = job.data;

            logger.info(
                `Processing submission ${submissionId} (${language})${isRerun ? ' [RERUN]' : ''}`
            );

            try {
                // Run code in sandbox
                const result = await runCode(language, code, tests);

                // Process result
                await gradingService.processGradingResult(submissionId, result);

                return result;
            } catch (error) {
                logger.error(`Grading error for submission ${submissionId}:`, error);

                // Mark as error
                await gradingService.markSubmissionError(submissionId, error.message);

                throw error;
            }
        },
        {
            connection: getRedisConnection(),
            concurrency: 5,
            limiter: {
                max: 10,
                duration: 1000,
            },
        }
    );

    worker.on('completed', (job) => {
        logger.info(`Job ${job.id} completed`);
    });

    worker.on('failed', (job, err) => {
        logger.error(`Job ${job?.id} failed:`, err);
    });

    worker.on('error', (err) => {
        logger.error('Worker error:', err);
    });

    logger.info('Grading worker started');

    return worker;
}

/**
 * Stop the worker
 */
export async function stopWorker() {
    if (worker) {
        await worker.close();
        worker = null;
        logger.info('Grading worker stopped');
    }
}

export default { startWorker, stopWorker };
