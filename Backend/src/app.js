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

// Passport configuration
configurePassport();
app.use(passport.initialize());

// Sentry initialization
if (process.env.SENTRY_DSN) {
    Sentry.init({
        dsn: process.env.SENTRY_DSN,
        integrations: [
            nodeProfilingIntegration(),
        ],
        // Performance Monitoring
        tracesSampleRate: 1.0, //  Capture 100% of the transactions
        // Set sampling rate for profiling - this is relative to tracesSampleRate
        profilesSampleRate: 1.0,
    });
    // The request handler must be the first middleware on the app
    app.use(Sentry.Handlers.requestHandler());
    // TracingHandler creates a trace for every incoming request
    app.use(Sentry.Handlers.tracingHandler());
}

// Security middleware
app.use(helmet());
app.use(cors({
    origin: config.env === 'production'
        ? [process.env.FRONTEND_URL, 'https://reforge.app'] // Example production domains
        : true, // Allow all in dev
    credentials: true,
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    allowedHeaders: ['Content-Type', 'Authorization', 'stripe-signature'],
}));

// Rate limiting
const limiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 100, // Limit each IP to 100 requests per windowMs
    message: {
        success: false,
        error: {
            code: 'RATE_LIMIT_EXCEEDED',
            message: 'Too many requests, please try again later',
        },
    },
});
app.use('/api', limiter);
app.use('/api/v1', limiter);

// Request parsing
app.use(express.json({ limit: '1mb' }));
app.use(express.urlencoded({ extended: true }));

// Logging
if (config.env !== 'test') {
    app.use(morgan('combined', {
        stream: { write: (message) => logger.info(message.trim()) },
    }));
}

// Swagger documentation
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
                url: `${config.apiUrl}/api/v1`,
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

// API routes
app.use('/api/v1', routes);
// Temporary redirect or alias for base /api to /api/v1 if desired, but let's go clean v1
app.use('/api', routes); // Keeping both for compatibility during transition

// Sentry error handler (must be before custom error handlers)
if (process.env.SENTRY_DSN) {
    app.use(Sentry.Handlers.errorHandler());
}

// Error handlers
app.use(notFoundHandler);
app.use(errorHandler);

export default app;
