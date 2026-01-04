import { User, Leaderboard } from '../models/index.js';
import logger from '../utils/logger.js';

/**
 * Get global leaderboard with optional language filter
 * @param {number} limit - Maximum number of entries to return
 * @param {string|null} language - Optional language filter (e.g., 'javascript', 'python')
 */
export async function getGlobalLeaderboard(limit = 100, language = null) {
    try {
        // Query users with progress
        const users = await User.find({ isActive: true })
            .select('email firstName lastName progress')
            .lean();

        // Build leaderboard entries
        const entries = [];

        for (const user of users) {
            if (!user.progress || user.progress.length === 0) continue;

            if (language) {
                // Language-specific leaderboard
                const langProgress = user.progress.find(p => p.language === language);
                if (!langProgress || langProgress.lastPassedDay === 0) continue;

                entries.push({
                    _id: `${user._id}_${language}`,
                    user: {
                        _id: user._id,
                        email: user.email,
                        firstName: user.firstName,
                        lastName: user.lastName,
                    },
                    language: language,
                    lastPassedDay: langProgress.lastPassedDay,
                    currentDay: langProgress.currentDay,
                    // Score: days passed * 100, with bonus for completion
                    score: langProgress.lastPassedDay * 100 + (langProgress.lastPassedDay === 30 ? 1000 : 0),
                    completedAt: langProgress.completedAt,
                });
            } else {
                // All languages - create entry for each language the user has progress in
                for (const prog of user.progress) {
                    if (prog.lastPassedDay === 0) continue;

                    entries.push({
                        _id: `${user._id}_${prog.language}`,
                        user: {
                            _id: user._id,
                            email: user.email,
                            firstName: user.firstName,
                            lastName: user.lastName,
                        },
                        language: prog.language,
                        lastPassedDay: prog.lastPassedDay,
                        currentDay: prog.currentDay,
                        // Score: days passed * 100, with bonus for completion
                        score: prog.lastPassedDay * 100 + (prog.lastPassedDay === 30 ? 1000 : 0),
                        completedAt: prog.completedAt,
                    });
                }
            }
        }

        // Sort by score (descending), then by lastPassedDay (descending), then by completedAt (ascending - earlier is better)
        entries.sort((a, b) => {
            if (b.score !== a.score) return b.score - a.score;
            if (b.lastPassedDay !== a.lastPassedDay) return b.lastPassedDay - a.lastPassedDay;
            if (a.completedAt && b.completedAt) return new Date(a.completedAt) - new Date(b.completedAt);
            return 0;
        });

        // Return top entries
        return entries.slice(0, limit);
    } catch (error) {
        logger.error('Error fetching leaderboard:', error);
        return [];
    }
}

/**
 * Update leaderboard for a specific user
 * Called when a submission is passed
 */
export async function updateUserRank(userId) {
    try {
        const user = await User.findById(userId);
        if (!user) { return; }

        // Calculate total stats from progress array
        let passedDays = 0;
        const totalCompletionTimeMs = 0; // This could be refined to track actual coding time

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
