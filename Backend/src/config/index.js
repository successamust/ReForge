import dotenv from 'dotenv';
import Joi from 'joi';

dotenv.config();

/**
 * Validate environment variables at startup
 */
const envSchema = Joi.object({
    NODE_ENV: Joi.string().valid('development', 'production', 'test').default('development'),
    PORT: Joi.number().port().default(3000),
    MONGODB_URI: Joi.string().required(),
    JWT_SECRET: process.env.NODE_ENV === 'production'
        ? Joi.string().min(32).required()
        : Joi.string().min(8).required(),
    REDIS_HOST: Joi.string().default('localhost'),
    REDIS_URL: Joi.string().uri().optional().allow(''),
}).unknown(true);

const { error, value: envVars } = envSchema.validate(process.env);
if (error) {
    throw new Error(`Config validation error: ${error.message}`);
}

const config = {
    env: process.env.NODE_ENV || 'development',
    port: parseInt(process.env.PORT, 10) || 3000,
    apiUrl: process.env.API_URL || 'http://localhost:3000',

    mongodb: {
        uri: process.env.MONGODB_URI || 'mongodb://localhost:27017/coding-challenge',
        testUri: process.env.MONGODB_TEST_URI || 'mongodb://localhost:27017/coding-challenge-test',
    },

    redis: {
        url: process.env.REDIS_URL,
        host: process.env.REDIS_HOST || 'localhost',
        port: parseInt(process.env.REDIS_PORT, 10) || 6379,
        password: process.env.REDIS_PASSWORD || undefined,
    },

    jwt: {
        secret: process.env.JWT_SECRET || 'dev-secret-change-in-production',
        expiresIn: process.env.JWT_EXPIRES_IN || '7d',
    },

    runner: {
        mode: process.env.RUNNER_MODE || 'mock', // docker, judge0, mock
        timeout: parseInt(process.env.RUNNER_TIMEOUT_MS, 10) || 30000,
        memoryLimit: process.env.RUNNER_MEMORY_LIMIT || '256m',
        dockerSocket: process.env.DOCKER_SOCKET || '/var/run/docker.sock',
    },

    judge0: {
        apiUrl: process.env.JUDGE0_API_URL || 'https://judge0-ce.p.rapidapi.com',
        apiKey: process.env.JUDGE0_API_KEY || '',
    },

    scheduler: {
        intervalMinutes: parseInt(process.env.SCHEDULER_INTERVAL_MINUTES, 10) || 10,
    },

    admin: {
        email: process.env.ADMIN_EMAIL || 'admin@example.com',
        password: process.env.ADMIN_PASSWORD || 'admin123',
    },

    email: {
        sendgridApiKey: process.env.SENDGRID_API_KEY,
        fromEmail: process.env.EMAIL_FROM || 'noreply@example.com',
    },

    oauth: {
        google: {
            clientId: process.env.GOOGLE_CLIENT_ID,
            clientSecret: process.env.GOOGLE_CLIENT_SECRET,
            callbackUrl: process.env.GOOGLE_CALLBACK_URL || `${process.env.API_URL || 'http://localhost:3000'}/v1/auth/google/callback`,
        },
        github: {
            clientId: process.env.GITHUB_CLIENT_ID,
            clientSecret: process.env.GITHUB_CLIENT_SECRET,
            callbackUrl: process.env.GITHUB_CALLBACK_URL || `${process.env.API_URL || 'http://localhost:3000'}/v1/auth/github/callback`,
        },
    },

    logging: {
        level: process.env.LOG_LEVEL || 'debug',
    },

    supportedLanguages: ['javascript', 'python', 'java', 'go', 'csharp'],
    maxDays: 30,
};

export default config;
