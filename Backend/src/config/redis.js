import { Redis } from 'ioredis';
import config from './index.js';
import logger from '../utils/logger.js';

let redisClient = null;

const createRedisClient = () => {
    if (redisClient) {
        return redisClient;
    }

    const redisOptions = {
        maxRetriesPerRequest: null, // Required for BullMQ
        enableReadyCheck: false,
    };

    if (config.redis.url) {
        logger.info(`Initializing Redis client with URL: ${config.redis.url.replace(/:[^:]*@/, ':****@')}`);
        redisClient = new Redis(config.redis.url, redisOptions);
    } else {
        logger.info(`Initializing Redis client with Host: ${config.redis.host}, Port: ${config.redis.port}`);
        redisClient = new Redis({
            ...redisOptions,
            host: config.redis.host,
            port: config.redis.port,
            password: config.redis.password,
        });
    }

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
