import Joi from 'joi';
import { ValidationError } from './errors.js';
import logger from './logger.js';
import config from '../config/index.js';

/**
 * Validate request body against a Joi schema
 */
export const validateBody = (schema) => {
    return (req, res, next) => {
        const { error, value } = schema.validate(req.body, {
            abortEarly: false,
            stripUnknown: true,
        });

        if (error) {
            const details = error.details.map((d) => ({
                field: d.path.join('.'),
                message: d.message,
            }));
            throw new ValidationError('Validation failed', details);
        }

        req.body = value;
        next();
    };
};

/**
 * Validate request params against a Joi schema
 */
export const validateParams = (schema) => {
    return (req, res, next) => {
        const { error, value } = schema.validate(req.params, {
            abortEarly: false,
        });

        if (error) {
            const details = error.details.map((d) => ({
                field: d.path.join('.'),
                message: d.message,
            }));
            throw new ValidationError('Invalid parameters', details);
        }

        req.params = value;
        next();
    };
};

// Common validation schemas
export const schemas = {
    // Auth schemas
    register: Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().min(8).max(128).required(),
        firstName: Joi.string().trim().max(50).required(),
        lastName: Joi.string().trim().max(50).required(),
        timezone: Joi.string().default('UTC'),
    }),

    login: Joi.object({
        email: Joi.string().email().required(),
        password: Joi.string().required(),
    }),

    // Submission schemas
    submission: Joi.object({
        language: Joi.string()
            .valid(...config.supportedLanguages)
            .required(),
        day: Joi.number().integer().min(1).max(config.maxDays).required(),
        code: Joi.string().max(50000).required(),
    }),

    // Language param
    languageParam: Joi.object({
        language: Joi.string()
            .valid(...config.supportedLanguages)
            .required(),
    }),

    // Day param
    dayParam: Joi.object({
        day: Joi.number().integer().min(1).max(config.maxDays).required(),
    }),

    // Language and day params
    lessonParams: Joi.object({
        language: Joi.string()
            .valid(...config.supportedLanguages)
            .required(),
        day: Joi.number().integer().min(1).max(config.maxDays).required(),
    }),

    // Submission ID param
    submissionIdParam: Joi.object({
        id: Joi.string().hex().length(24).required(),
    }),

    // Admin: Create/Update lesson
    lesson: Joi.object({
        language: Joi.string()
            .valid(...config.supportedLanguages)
            .required(),
        day: Joi.number().integer().min(1).max(config.maxDays).required(),
        title: Joi.string().max(200).required(),
        objectives: Joi.array().items(Joi.string()).min(3).max(5).required(),
        contentHtml: Joi.string().required(),
        examples: Joi.array()
            .items(
                Joi.object({
                    title: Joi.string().required(),
                    code: Joi.string().required(),
                    explanation: Joi.string().required(),
                })
            )
            .min(2)
            .required(),
        exercise: Joi.object({
            description: Joi.string().required(),
            starterCode: Joi.string().allow('').default(''),
            hints: Joi.array().items(Joi.string()).max(3).default([]),
        }).required(),
        tests: Joi.array()
            .items(
                Joi.object({
                    id: Joi.string().required(),
                    description: Joi.string().required(),
                    input: Joi.any(),
                    expectedOutput: Joi.any(),
                    isHidden: Joi.boolean().default(false),
                    weight: Joi.number().default(1),
                })
            )
            .min(3)
            .required(),
        solution: Joi.string().required(),
        difficulty: Joi.number().integer().min(1).max(10).required(),
        estimatedMinutes: Joi.number().integer().min(5).max(180).required(),
    }),

    // Admin: Override progress
    overrideProgress: Joi.object({
        userId: Joi.string().hex().length(24).required(),
        language: Joi.string()
            .valid(...config.supportedLanguages)
            .required(),
        currentDay: Joi.number().integer().min(1).max(config.maxDays).required(),
        reason: Joi.string().max(500).required(),
    }),

    // Pagination
    pagination: Joi.object({
        page: Joi.number().integer().min(1).default(1),
        limit: Joi.number().integer().min(1).max(100).default(20),
    }),

    // Payment: Checkout
    checkout: Joi.object({
        priceId: Joi.string().required(),
    }),

    // Admin: Update user tier
    updateUserTier: Joi.object({
        tier: Joi.string().valid('free', 'premium').required(),
        expiresAt: Joi.date().iso().allow(null),
    }),

    // Startup: Environment variables
    env: Joi.object({
        NODE_ENV: Joi.string().valid('development', 'production', 'test').default('development'),
        PORT: Joi.number().port().default(3000),
        MONGODB_URI: Joi.string().required(),
        JWT_SECRET: Joi.string().min(32).required(),
        REDIS_HOST: Joi.string().required(),
        REDIS_PORT: Joi.number().port().default(6379),
    }).unknown(true),
};
