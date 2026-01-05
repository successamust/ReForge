import { User, Leaderboard } from '../models/index.js';
import * as leaderboardRedis from '../utils/leaderboard.redis.js';
import logger from '../utils/logger.js';

/**
 * Get global leaderboard with optional language filter
 * Now uses Redis Sorted Sets for O(log N + M) performance
 * @param {number} limit - Maximum number of entries to return
 * @param {string|null} language - Optional language filter (e.g., 'javascript', 'python')
 */
export async function getGlobalLeaderboard(limit = 100, language = null, offset = 0) {
    try {
        // Get top users from Redis
        const topUsers = await leaderboardRedis.getTopUsers(language, limit, offset);

        if (topUsers.length === 0) {
            return [];
        }

        // Fetch user details from MongoDB
        const userIds = topUsers.map(u => u.userId);
        const users = await User.find({ _id: { $in: userIds } })
            .select('email firstName lastName progress')
            .lean();

        // Create a map for quick lookup
        const userMap = new Map(users.map(u => [u._id.toString(), u]));

        // Build leaderboard entries with user details
        const entries = [];
        for (const { userId, score, rank } of topUsers) {
            const user = userMap.get(userId);
            if (!user) continue;

            // Extract progress info
            const langProgress = language
                ? user.progress.find(p => p.language === language)
                : user.progress.reduce((max, p) => p.lastPassedDay > max.lastPassedDay ? p : max, { lastPassedDay: 0 });

            if (!langProgress || langProgress.lastPassedDay === 0) continue;

            entries.push({
                _id: `${userId}_${language || 'global'}`,
                user: {
                    _id: user._id,
                    email: user.email,
                    firstName: user.firstName,
                    lastName: user.lastName,
                },
                language: language || langProgress.language,
                lastPassedDay: langProgress.lastPassedDay,
                currentDay: langProgress.currentDay,
                currentDay: langProgress.currentDay,
                currentDay: langProgress.currentDay,
                // If filtering by language, show that language's points. If global, show total points.
                score: language ? (langProgress.points || 0) : (user.stats?.totalPoints || 0),
                rank,
                completedAt: langProgress.completedAt,
            });
        }

        return entries;
    } catch (error) {
        logger.error('Error fetching leaderboard:', error);
        return [];
    }
}

/**
 * Update leaderboard for a specific user
 * Called when a submission is passed
 * Now updates both Redis (for fast queries) and MongoDB (for backup/audit)
 */
export async function updateUserRank(userId) {
    try {
        const user = await User.findById(userId);
        if (!user) { return; }

        // Update Redis leaderboard for each language the user has progress in
        // We use totalPoints as the score for all leaderboards (Per user request: Points based everywhere)
        const totalPoints = user.stats?.totalPoints || 0;

        // Update global leaderboard
        await leaderboardRedis.updateUserRank(userId.toString(), 'global', totalPoints);

        for (const progress of user.progress) {
            if (progress.lastPassedDay > 0) {
                // Update Redis language specific leaderboards
                // Using Language-Specific Points as the sorting metric
                await leaderboardRedis.updateUserRank(
                    userId.toString(),
                    progress.language,
                    progress.points || 0 // Use specific language points
                );
            }
        }

        // Also update MongoDB for backup/audit trail
        const passedDays = user.progress.reduce((acc, curr) => acc + curr.lastPassedDay, 0);
        await Leaderboard.findOneAndUpdate(
            { userId },
            {
                userId,
                firstName: user.firstName,
                lastName: user.lastName,
                passedDays,
                totalCompletionTimeMs: 0,
                lastUpdated: new Date()
            },
            { upsert: true, new: true }
        );

    } catch (error) {
        logger.error(`Error updating leaderboard for user ${userId}:`, error);
    }
}

/**
 * Full Refresh (Admin/Cron)
 */
export async function refreshLeaderboard() {
    logger.info('Refreshing full leaderboard...');
    const users = await User.find({ isActive: true });
    for (const user of users) {
        await updateUserRank(user._id);
    }
    logger.info('Leaderboard refreshed.');
}

export async function clearLeaderboard(language = null) {
    return leaderboardRedis.clearLeaderboard(language);
}
