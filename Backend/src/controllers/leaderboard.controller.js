import * as leaderboardService from '../services/leaderboard.service.js';

/**
 * Get global leaderboard
 */
export async function getLeaderboard(req, res, next) {
    try {
        const limit = parseInt(req.query.limit) || 20;
        const leaderboard = await leaderboardService.getGlobalLeaderboard(limit);

        res.json({
            success: true,
            data: leaderboard,
        });
    } catch (error) {
        next(error);
    }
}
