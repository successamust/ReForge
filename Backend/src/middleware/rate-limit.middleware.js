import rateLimit from 'express-rate-limit';

export const executionLimiter = rateLimit({
    windowMs: 60 * 1000,
    max: 10,
    standardHeaders: true,
    legacyHeaders: false,
    message: {
        success: false,
        error: {
            code: 'EXECUTION_RATE_LIMIT_EXCEEDED',
            message: 'Execution limit reached. Please wait a minute before trying again.',
        },
    },
    keyGenerator: (req) => {
        return req.user?.id || req.ip;
    },
});
