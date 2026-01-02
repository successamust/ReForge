import express from 'express';
import cors from 'cors';
import helmet from 'helmet';
import morgan from 'morgan';
import * as Sentry from '@sentry/node';
import { nodeProfilingIntegration } from '@sentry/profiling-node';
import rateLimit from 'express-rate-limit';
import swaggerUi from 'swagger-ui-express';
import swaggerJsdoc from 'swagger-jsdoc';
import routes from './routes/index.js';
import { errorHandler, notFoundHandler } from './middleware/error.middleware.js';
import config from './config/index.js';
import logger from './utils/logger.js';
import { configurePassport } from './config/passport.js';
import passport from 'passport';

const app = express();

app.set('trust proxy', 1);

configurePassport();
app.use(passport.initialize());

if (process.env.SENTRY_DSN) {
    Sentry.init({
        dsn: process.env.SENTRY_DSN,
        integrations: [
            nodeProfilingIntegration(),
        ],
        tracesSampleRate: 1.0,
        profilesSampleRate: 1.0,
    });
}

app.use(helmet());
app.use(cors({
    origin: config.env === 'production'
        ? [process.env.FRONTEND_URL, 'https://reforge.app']
        : true,
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'stripe-signature'],
}));

const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per windowMs
    skip: () => config.env === 'development' || config.env === 'test', // Skip rate limiting in development/test
    message: {
        success: false,
        error: {
            code: 'RATE_LIMIT_EXCEEDED',
            message: 'Too many requests, please try again later',
        },
    },
});
app.use('/v1', limiter);

app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true }));

if (config.env !== 'test') {
    app.use(morgan('combined', {
        stream: { write: (message) => logger.info(message.trim()) },
    }));
}

const swaggerOptions = {
    definition: {
        openapi: '3.0.0',
        info: {
            title: '30-Day Coding Challenge API',
            version: '1.0.0',
            description: 'API for the 30-day progressive coding challenge platform',
        },
        servers: [
            {
                url: `${config.apiUrl}/v1`,
                description: config.env === 'production' ? 'Production' : 'Development',
            },
        ],
        components: {
            securitySchemes: {
                bearerAuth: {
                    type: 'http',
                    scheme: 'bearer',
                    bearerFormat: 'JWT',
                },
            },
            schemas: {
                Lesson: {
                    type: 'object',
                    properties: {
                        language: { type: 'string' },
                        day: { type: 'integer' },
                        title: { type: 'string' },
                        objectives: { type: 'array', items: { type: 'string' } },
                        contentHtml: { type: 'string' },
                        examples: { type: 'array' },
                        exercise: { type: 'object' },
                        tests: { type: 'array' },
                        solution: { type: 'string' },
                        difficulty: { type: 'integer' },
                        estimatedMinutes: { type: 'integer' },
                    },
                },
            },
        },
    },
    apis: ['./src/routes/*.js'],
};

const swaggerSpec = swaggerJsdoc(swaggerOptions);
app.use('/api-docs', swaggerUi.serve, swaggerUi.setup(swaggerSpec));

app.use('/v1', routes);

if (process.env.SENTRY_DSN) {
    Sentry.setupExpressErrorHandler(app);
}

app.use(notFoundHandler);
app.use(errorHandler);

export default app;
