import { User, Leaderboard } from '../models/index.js';
import logger from '../utils/logger.js';

/**
 * Get global leaderboard
 */
export async function getGlobalLeaderboard(limit = 100) {
    // Return cached leaderboard
    return Leaderboard.find()
        .sort({ passedDays: -1, totalCompletionTimeMs: 1 })
        .limit(limit)
        .select('firstName lastName passedDays totalCompletionTimeMs userId')
        .lean();
}

/**
 * Update leaderboard for a specific user
 * Called when a submission is passed
 */
export async function updateUserRank(userId) {
    try {
        const user = await User.findById(userId);
        if (!user) return;

        // Calculate total stats from progress array
        let passedDays = 0;
        let totalCompletionTimeMs = 0; // This could be refined to track actual coding time

        for (const p of user.progress) {
            if (p.completedAt) {
                passedDays += p.currentDay > p.lastPassedDay ? p.lastPassedDay : p.currentDay - 1;
                // Note: Simple logic here. Ideally, we sum up 'lastPassedDay' across all languages if they are additive?
                // Actually, let's just count total passed days across all languages.
            }
            passedDays += p.lastPassedDay;
        }

        // Re-calculate strictly
        passedDays = user.progress.reduce((acc, curr) => acc + curr.lastPassedDay, 0);

        await Leaderboard.findOneAndUpdate(
            { userId },
            {
                userId,
                firstName: user.firstName,
                lastName: user.lastName,
                passedDays,
                totalCompletionTimeMs, // Placeholder for now
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
