import { Achievement, User, AuditLog } from '../models/index.js';
import logger from '../utils/logger.js';

/**
 * Check and grant achievements to a user
 */
export async function checkAchievements(userId, context = {}) {
    const user = await User.findById(userId);
    if (!user) return;

    const achievements = [];

    // 1. Streak Achievements
    if (user.stats.currentStreak >= 7) {
        achievements.push({ type: 'STREAK_7' });
    }
    if (user.stats.currentStreak >= 30) {
        achievements.push({ type: 'STREAK_30' });
    }

    // 2. Point Achievements
    if (user.stats.totalPoints >= 100) {
        achievements.push({ type: 'POINTS_100' });
    }
    if (user.stats.totalPoints >= 1000) {
        achievements.push({ type: 'POINTS_1000' });
    }

    // 3. Language specific achievements
    if (context.language && context.completed) {
        achievements.push({
            type: 'LANGUAGE_COMPLETE',
            metadata: { language: context.language }
        });
    }

    // Grant achievements that the user doesn't already have
    for (const ach of achievements) {
        try {
            const existing = await Achievement.findOne({
                userId,
                type: ach.type,
                'metadata.language': ach.metadata?.language
            });

            if (!existing) {
                const newAch = new Achievement({
                    userId,
                    ...ach
                });
                await newAch.save();

                logger.info(`User ${userId} unlocked achievement: ${ach.type}`);

                // Track in audit log
                await AuditLog.log({
                    userId,
                    action: 'ACCOUNT_UPDATE', // Or a custom ACHIEVEMENT_UNLOCKED action if preferred
                    payload: { achievement: ach.type, metadata: ach.metadata },
                    isSystem: true
                });
            }
        } catch (error) {
            // Ignore duplicate errors due to unique index competition
            if (error.code !== 11000) {
                logger.error(`Error granting achievement ${ach.type} to user ${userId}:`, error);
            }
        }
    }
}

/**
 * Get user achievements
 */
export async function getUserAchievements(userId) {
    return Achievement.find({ userId }).sort({ unlockedAt: -1 });
}
