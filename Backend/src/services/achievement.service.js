export async function checkAchievements(userId, context = {}) {
    const user = await User.findById(userId);
    if (!user) { return; }

    const achievements = [];

    if (user.stats.currentStreak >= 7) {
        achievements.push({ type: 'STREAK_7' });
    }
    if (user.stats.currentStreak >= 30) {
        achievements.push({ type: 'STREAK_30' });
    }

    if (user.stats.totalPoints >= 100) {
        achievements.push({ type: 'POINTS_100' });
    }
    if (user.stats.totalPoints >= 1000) {
        achievements.push({ type: 'POINTS_1000' });
    }

    if (context.language && context.completed) {
        achievements.push({
            type: 'LANGUAGE_COMPLETE',
            metadata: { language: context.language }
        });
    }

    if (user.stats.totalSubmissions === 1 || user.stats.totalPoints <= 150) {
        // A bit loose but covers the "new user" case
        achievements.push({ type: 'FIRST_BLOOD' });
    }

    if (context.language && context.day) {
        const langCode = context.language.toUpperCase(); // e.g., JAVASCRIPT
        const milestones = {
            1: '_INITIATE',
            7: '_7',
            15: '_15',
            30: '_30'
        };

        // Check current day milestone
        if (milestones[context.day]) {
            achievements.push({
                type: `${langCode}${milestones[context.day]}`,
                metadata: { language: context.language }
            });
        }
    }

    if (context.completionTimeMinutes && context.completionTimeMinutes < 5) {
        achievements.push({ type: 'SPEED_DEMON', metadata: { time: context.completionTimeMinutes } });
    }

    if (context.isFirstTry) {
        achievements.push({ type: 'SHARPSHOOTER' });
    }

    if (user.progress && user.progress.length >= 3) {
        achievements.push({ type: 'POLYGLOT' });
    }

    const requiredLangs = ['JAVASCRIPT', 'PYTHON', 'JAVA', 'GO', 'CSHARP'];
    const hasAll30 = async () => {
        // This is expensive, so maybe optimize if needed. For now it's fine.
        const userAchievements = await Achievement.find({ userId });
        const types = new Set(userAchievements.map(a => a.type));

        // Also include currently unlocked types in case they just got the last one
        achievements.forEach(a => types.add(a.type));

        return requiredLangs.every(l => types.has(`${l}_30`));
    };

    if (await hasAll30()) {
        achievements.push({ type: 'ALL_COMPLETE' });
    }

    if (context.sync) {
        for (const prog of user.progress) {
            await checkAchievements(userId, {
                language: prog.language,
                day: prog.lastPassedDay,
                isFirstTry: false, // Can't retroactively know this easily, assume false
                completionTimeMinutes: null
            });
        }
        // Also check general milestones
        if (user.stats.currentStreak >= 7) achievements.push({ type: 'STREAK_7' });
        if (user.stats.currentStreak >= 30) achievements.push({ type: 'STREAK_30' });
        if (user.stats.totalPoints >= 100) achievements.push({ type: 'POINTS_100' });
        if (user.stats.totalPoints >= 1000) achievements.push({ type: 'POINTS_1000' });
    }

    const unlockedThisCheck = [];

    for (const ach of achievements) {
        try {
            // Find if this specific achievement (including language context) exists
            const query = { userId, type: ach.type };
            if (ach.metadata?.language) {
                query['metadata.language'] = ach.metadata.language;
            }

            const existing = await Achievement.findOne(query);

            if (!existing) {
                const newAch = new Achievement({
                    userId,
                    ...ach
                });
                await newAch.save();

                unlockedThisCheck.push(newAch);

                await AuditLog.log({
                    action: 'ACCOUNT_UPDATE',
                    payload: { achievement: ach.type, metadata: ach.metadata },
                    isSystem: true
                });
            }
        } catch (error) {
            if (error.code !== 11000) {
                logger.error(`Error granting achievement ${ach.type} to user ${userId}:`, error);
            }
        }
    }

    return unlockedThisCheck;
}

export async function getUserAchievements(userId) {
    return Achievement.find({ userId }).sort({ unlockedAt: -1 });
}
