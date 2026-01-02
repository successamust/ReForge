import rateLimit from 'express-rate-limit';

/**
 * Specialized rate limiter for expensive code execution/verification endpoints
 * Limits each user/IP to 10 requests per minute
 */
export const executionLimiter = rateLimit({
    windowMs: 60 * 1000, // 1 minute
    max: 10, // Limit each IP to 10 requests per windowMs
    standardHeaders: true, // Return rate limit info in the `RateLimit-*` headers
    legacyHeaders: false, // Disable the `X-RateLimit-*` headers
    message: {
        success: false,
        error: {
            code: 'EXECUTION_RATE_LIMIT_EXCEEDED',
            message: 'Execution limit reached. Please wait a minute before trying again.',
        },
    },
    // Use user ID for authenticated users, fallback to IP
    keyGenerator: (req) => {
        return req.user?.id || req.ip;
    },
});
