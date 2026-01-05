import * as leaderboardService from '../services/leaderboard.service.js';
import * as leaderboardRedis from '../utils/leaderboard.redis.js';

/**
 * Get global leaderboard
 */
export async function getLeaderboard(req, res, next) {
    try {
        const limit = parseInt(req.query.limit) || 100;
        const offset = parseInt(req.query.offset) || 0;
        const language = req.query.language || null;

        const leaderboard = await leaderboardService.getGlobalLeaderboard(limit, language, offset);

        res.json({
            success: true,
            data: leaderboard,
            pagination: {
                limit,
                offset,
                hasMore: leaderboard.length === limit,
            },
        });
    } catch (error) {
        next(error);
    }
}

/**
 * Get authenticated user's personal rank
 */
export async function getMyRank(req, res, next) {
    try {
        const userId = req.user._id.toString();
        const language = req.query.language || null;

        // Get user's rank from Redis
        const rankInfo = await leaderboardRedis.getUserRank(userId, language);

        if (!rankInfo) {
            return res.json({
                success: true,
                data: {
                    rank: null,
                    message: 'No progress yet. Start your journey!',
                },
            });
        }

        // Get total leaderboard size for percentile calculation
        const totalUsers = await leaderboardRedis.getLeaderboardSize(language);
        // Calculate "Top X%" (lower is better, e.g. Rank 1 is Top 1%)
        // We calculate precise percentage then round UP to nearest whole number
        // e.g. 0.2% -> Top 1%, 15.4% -> Top 16%
        const percentile = totalUsers > 0 ? Math.ceil((rankInfo.rank / totalUsers) * 100) : 0;

        // Get user details for additional context
        const user = req.user;
        const progress = language
            ? user.progress.find(p => p.language === language)
            : user.progress.reduce((max, p) => p.lastPassedDay > max.lastPassedDay ? p : max, { lastPassedDay: 0 });

        res.json({
            success: true,
            data: {
                userId,
                rank: rankInfo.rank,
                score: rankInfo.score,
                language: language || progress?.language || 'N/A',
                lastPassedDay: progress?.lastPassedDay || 0,
                currentDay: progress?.currentDay || 1,
                totalUsers,
                percentile: parseFloat(percentile),
            },
        });
    } catch (error) {
        next(error);
    }
}
