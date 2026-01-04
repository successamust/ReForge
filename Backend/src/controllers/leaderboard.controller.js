import * as leaderboardService from '../services/leaderboard.service.js';

/**
 * Get global leaderboard
 */
export async function getLeaderboard(req, res, next) {
    try {
        const limit = parseInt(req.query.limit) || 100;
        const language = req.query.language || null;
        const leaderboard = await leaderboardService.getGlobalLeaderboard(limit, language);

        res.json({
            success: true,
            data: leaderboard,
        });
    } catch (error) {
        next(error);
    }
}
