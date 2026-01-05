import { getRedisConnection } from '../config/redis.js';
import logger from './logger.js';

/**
 * Redis-backed leaderboard using Sorted Sets (ZSET)
 * Provides O(log N) updates and range queries for millions of users
 */

const LEADERBOARD_PREFIX = 'leaderboard';
const GLOBAL_KEY = `${LEADERBOARD_PREFIX}:global`;

/**
 * Get language-specific leaderboard key
 */
function getLanguageKey(language) {
    return `${LEADERBOARD_PREFIX}:${language}`;
}



/**
 * Update user's rank in the leaderboard
 * @param {string} userId - User ID
 * @param {string} language - Programming language
 * @param {number} score - Total points (or calculated score)
 */
export async function updateUserRank(userId, language, score) {
    try {
        const redis = getRedisConnection();
        // Score is passed directly now (allows for points-based ranking)
        const languageKey = getLanguageKey(language);

        // Update both global and language-specific leaderboards
        await Promise.all([
            redis.zadd(GLOBAL_KEY, score, userId),
            redis.zadd(languageKey, score, userId),
        ]);

        logger.debug(`Updated leaderboard for user ${userId} in ${language}: score=${score}`);
    } catch (error) {
        logger.error(`Failed to update leaderboard for user ${userId}:`, error);
        throw error;
    }
}

/**
 * Get top users from the leaderboard
 * @param {string|null} language - Language filter (null for global)
 * @param {number} limit - Number of users to return
 * @param {number} offset - Number of users to skip
 * @returns {Promise<Array>} Array of {userId, score, rank}
 */
export async function getTopUsers(language = null, limit = 100, offset = 0) {
    try {
        const redis = getRedisConnection();
        const key = language ? getLanguageKey(language) : GLOBAL_KEY;

        // Get top users with scores (ZREVRANGE returns highest to lowest)
        // Range is inclusive, so we need start and stop indices
        const start = offset;
        const stop = offset + limit - 1;
        const results = await redis.zrevrange(key, start, stop, 'WITHSCORES');

        // Parse results into structured format
        const leaderboard = [];
        for (let i = 0; i < results.length; i += 2) {
            leaderboard.push({
                userId: results[i],
                score: parseFloat(results[i + 1]),
                rank: offset + Math.floor(i / 2) + 1,
            });
        }

        return leaderboard;
    } catch (error) {
        logger.error(`Failed to get top users for ${language || 'global'}:`, error);
        return [];
    }
}

/**
 * Get user's rank in the leaderboard
 * @param {string} userId - User ID
 * @param {string|null} language - Language filter (null for global)
 * @returns {Promise<{rank: number, score: number}|null>}
 */
export async function getUserRank(userId, language = null) {
    try {
        const redis = getRedisConnection();
        const key = language ? getLanguageKey(language) : GLOBAL_KEY;

        const [rank, score] = await Promise.all([
            redis.zrevrank(key, userId),
            redis.zscore(key, userId),
        ]);

        if (rank === null || score === null) {
            return null;
        }

        return {
            rank: rank + 1, // Redis ranks are 0-indexed
            score: parseFloat(score),
        };
    } catch (error) {
        logger.error(`Failed to get rank for user ${userId}:`, error);
        return null;
    }
}

/**
 * Remove user from leaderboard
 * @param {string} userId - User ID
 * @param {string|null} language - Language filter (null for all)
 */
export async function removeUser(userId, language = null) {
    try {
        const redis = getRedisConnection();

        if (language) {
            await redis.zrem(getLanguageKey(language), userId);
        } else {
            // Remove from all leaderboards
            const keys = await redis.keys(`${LEADERBOARD_PREFIX}:*`);
            await Promise.all(keys.map(key => redis.zrem(key, userId)));
        }

        logger.debug(`Removed user ${userId} from leaderboard`);
    } catch (error) {
        logger.error(`Failed to remove user ${userId} from leaderboard:`, error);
        throw error;
    }
}

/**
 * Get total number of users in leaderboard
 * @param {string|null} language - Language filter (null for global)
 */
export async function getLeaderboardSize(language = null) {
    try {
        const redis = getRedisConnection();
        const key = language ? getLanguageKey(language) : GLOBAL_KEY;
        return await redis.zcard(key);
    } catch (error) {
        logger.error(`Failed to get leaderboard size:`, error);
        return 0;
    }
}

/**
 * Clear entire leaderboard (admin only)
 * @param {string|null} language - Language filter (null for all)
 */
export async function clearLeaderboard(language = null) {
    try {
        const redis = getRedisConnection();

        if (language) {
            await redis.del(getLanguageKey(language));
        } else {
            const keys = await redis.keys(`${LEADERBOARD_PREFIX}:*`);
            if (keys.length > 0) {
                await redis.del(...keys);
            }
        }

        logger.info(`Cleared leaderboard for ${language || 'all languages'}`);
    } catch (error) {
        logger.error(`Failed to clear leaderboard:`, error);
        throw error;
    }
}
