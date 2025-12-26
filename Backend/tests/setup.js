import { MongoMemoryReplSet } from 'mongodb-memory-server';
import mongoose from 'mongoose';
import { jest, beforeAll, afterAll, afterEach } from '@jest/globals';

let mongoServer;

beforeAll(async () => {
    mongoServer = await MongoMemoryReplSet.create({
        replSet: { count: 1 }
    });
    const mongoUri = mongoServer.getUri();
    await mongoose.connect(mongoUri);
});

afterAll(async () => {
    await mongoose.disconnect();
    await mongoServer.stop();
});

afterEach(async () => {
    const collections = mongoose.connection.collections;
    for (const key in collections) {
        await collections[key].deleteMany({});
    }
});

// Mock Redis for tests
jest.mock('../src/config/redis.js', () => ({
    getRedisConnection: () => ({
        on: jest.fn(),
        disconnect: jest.fn(),
    }),
    default: () => ({
        on: jest.fn(),
        disconnect: jest.fn(),
    }),
}));

// Mock BullMQ
jest.mock('bullmq', () => ({
    Queue: jest.fn().mockImplementation(() => ({
        add: jest.fn().mockResolvedValue({ id: 'mock-job-id' }),
        close: jest.fn(),
    })),
    Worker: jest.fn().mockImplementation(() => ({
        on: jest.fn(),
        close: jest.fn(),
    })),
}));

// Mock Rate Limiter to allow all requests
jest.mock('../src/middleware/rateLimit.middleware.js', () => ({
    authLimiter: (req, res, next) => next(),
}));

// Mock Passport
jest.mock('passport', () => {
    return {
        use: jest.fn(),
        initialize: () => (req, res, next) => next(),
        authenticate: (strategy, options) => (req, res, next) => {
            // In tests, we can manually set req.user before calling the route
            if (req.query.mock_user) {
                req.user = JSON.parse(req.query.mock_user);
            }
            next();
        },
        serializeUser: jest.fn(),
        deserializeUser: jest.fn(),
    };
});
