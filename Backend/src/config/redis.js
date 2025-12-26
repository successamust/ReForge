import { Redis } from 'ioredis';
import config from './index.js';
import logger from '../utils/logger.js';

let redisClient = null;

const createRedisClient = () => {
    if (redisClient) {
        return redisClient;
    }

    redisClient = new Redis({
        host: config.redis.host,
        port: config.redis.port,
        password: config.redis.password,
        maxRetriesPerRequest: null, // Required for BullMQ
        enableReadyCheck: false,
    });

    redisClient.on('connect', () => {
        logger.info('Redis connected');
    });

    redisClient.on('error', (err) => {
        logger.error('Redis connection error:', err);
    });

    redisClient.on('close', () => {
        logger.warn('Redis connection closed');
    });

    return redisClient;
};

export const getRedisConnection = () => {
    if (!redisClient) {
        return createRedisClient();
    }
    return redisClient;
};

export default createRedisClient;
