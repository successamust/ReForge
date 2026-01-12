import { SuddenDeathSession, Lesson, User, AuditLog } from '../models/index.js';
import { runCode as executeCode } from '../runners/index.js';
import { NotFoundError, AuthorizationError, ProgressionError } from '../utils/errors.js';
import * as progressService from '../services/progress.service.js';
import * as leaderboardService from '../services/leaderboard.service.js';
import logger from '../utils/logger.js';
import mongoose from 'mongoose';

/**
 * Start a new Sudden Death Arena session
 */
export async function startSession(req, res, next) {
    try {
        const { language } = req.body;
        const userId = req.userId;

        const user = await User.findById(userId);
        if (!user) throw new NotFoundError('User');

        const progress = user.getProgress(language);

        if (progress.lastPassedDay < 1) {
            throw new ProgressionError(`Must pass at least Day 1 to enter the Arena. Current ${language} mastery: Day ${progress.lastPassedDay}`);
        }

        // Check for Arena Lockout
        if (progress.arenaLockoutUntil && progress.arenaLockoutUntil > new Date()) {
            const minutesLeft = Math.ceil((progress.arenaLockoutUntil - new Date()) / 60000);
            throw new AuthorizationError(`ARENA BURNOUT: Systems cooling down. Try again in ${minutesLeft} minutes.`);
        }

        // Tiered Problem Selection - 5 Levels
        // Tier 1: 1-7 (Warmup), Tier 2: 8-15 (Midrange), Tier 3: 16-30 (Terminal)
        const getTierDays = (min, max) => {
            const limit = Math.min(progress.lastPassedDay, max);
            if (limit < min) return [];
            return Array.from({ length: limit - min + 1 }, (_, i) => min + i);
        };

        const tier1 = getTierDays(1, 7);
        const tier2 = getTierDays(8, 15);
        const tier3 = getTierDays(16, 30);

        const problemPool = [];

        // Ensure variety by including some locked lessons if the passed pool is too small
        // This provides a "Boss Challenge" feel
        const varietyPool = Array.from({ length: Math.min(30, progress.lastPassedDay + 5) }, (_, i) => i + 1);

        const selectionPool = [];
        const usedDays = new Set();

        const pickUnique = (pool, count) => {
            const shuffled = [...pool].sort(() => 0.5 - Math.random());
            const picked = [];
            for (const day of shuffled) {
                if (!usedDays.has(day)) {
                    picked.push(day);
                    usedDays.add(day);
                    if (picked.length >= count) break;
                }
            }
            return picked;
        };

        // Distribution: 4 Warmup, 4 Midrange, 2 Terminal
        // We attempt to pick unique ones, but fallback to varietyPool if needed
        selectionPool.push(...pickUnique(tier1, 4));
        if (selectionPool.length < 4) selectionPool.push(...pickUnique(varietyPool, 4 - selectionPool.length));

        selectionPool.push(...pickUnique(tier2, 4));
        if (selectionPool.length < 8) selectionPool.push(...pickUnique(varietyPool, 8 - selectionPool.length));

        selectionPool.push(...pickUnique(tier3, 2));
        if (selectionPool.length < 10) selectionPool.push(...pickUnique(varietyPool, 10 - selectionPool.length));

        // Final fallback if still empty (shouldn't happen with varietyPool)
        while (selectionPool.length < 10) {
            selectionPool.push(varietyPool[Math.floor(Math.random() * varietyPool.length)]);
        }

        const lessons = await Lesson.find({ language, day: { $in: selectionPool } });
        // Map back to the selection order to maintain difficulty curve
        const orderedLessons = selectionPool.map(day => lessons.find(l => l.day === day)).filter(Boolean);

        if (orderedLessons.length === 0) {
            throw new NotFoundError('No suitable lessons found for the Arena. Please ensure track is initialized.');
        }

        const timeLimits = orderedLessons.map(lesson => {
            const limit = (lesson.difficulty * 25) + (lesson.estimatedMinutes * 15);
            return Math.max(120, Math.floor(limit));
        });

        // Close any existing active sessions
        const activeSessions = await SuddenDeathSession.find({ userId, language, status: 'active' });

        if (activeSessions.length > 0) {
            const sessionsToFail = [];
            const sessionsToExpire = [];

            for (const sess of activeSessions) {
                if (sess.isExpired()) {
                    sessionsToExpire.push(sess._id);
                } else {
                    // Only apply penalty if they have actually made progress
                    // This prevents double-click/refresh at level 1 from locking them out
                    if (sess.currentProblemIndex === 0) {
                        sessionsToExpire.push(sess._id); // Map to expire (silent fail)
                    } else {
                        sessionsToFail.push(sess._id);
                    }
                }
            }

            // 1. Handle silent closures (expired or level 1 abandons)
            if (sessionsToExpire.length > 0) {
                await SuddenDeathSession.updateMany(
                    { _id: { $in: sessionsToExpire } },
                    { status: 'expired', endTime: new Date(), livesRemaining: 0 }
                );

                await AuditLog.log({
                    userId,
                    action: 'ARENA_TIMEOUT',
                    payload: {
                        sessionIds: sessionsToExpire,
                        language,
                        reason: 'cleared_on_new_start'
                    }
                });
            }

            // 2. Handle abandonment of active progress (Apply penalty)
            if (sessionsToFail.length > 0) {
                await SuddenDeathSession.updateMany(
                    { _id: { $in: sessionsToFail } },
                    { status: 'failed', endTime: new Date(), livesRemaining: 0 }
                );

                const lockoutUntil = new Date(Date.now() + 60 * 60 * 1000); // 1 hour
                const pointDeduction = -100;

                await User.updateOne(
                    { _id: userId, 'progress.language': language },
                    {
                        $set: { 'progress.$.arenaLockoutUntil': lockoutUntil },
                        $inc: {
                            'stats.totalPoints': pointDeduction,
                            'progress.$.points': pointDeduction
                        }
                    }
                );

                await AuditLog.log({
                    userId,
                    action: 'ARENA_ABANDONED',
                    payload: {
                        sessionId: sessionsToFail[0],
                        language,
                        lockoutUntil,
                        pointDeduction
                    }
                });

                throw new AuthorizationError(`ARENA PROTOCOL BREACH: System abandoned. Burnout lockout active for 60 minutes.`);
            }
        }

        const session = await SuddenDeathSession.create({
            userId,
            language,
            problemPool: orderedLessons.map(l => l._id),
            timeLimits,
            level: 1,
            status: 'active'
        });

        await AuditLog.log({
            userId,
            action: 'ARENA_START',
            payload: {
                sessionId: session._id,
                language,
                difficultyRange: '1-30'
            }
        });

        res.status(201).json({
            success: true,
            data: {
                sessionId: session._id,
                level: session.level,
                part: 1,
                totalParts: 2,
                totalLevels: 5,
                lesson: orderedLessons[0].toUserObject(),
                timeLimit: timeLimits[0]
            }
        });
    } catch (error) {
        next(error);
    }
}

/**
 * Submit code for an Arena level
 */
export async function submitArenaCode(req, res, next) {
    try {
        const { sessionId, code } = req.body;
        const userId = req.userId;

        // 1. Initial validation (outside transaction to avoid long locks)
        const initialSession = await SuddenDeathSession.findOne({ _id: sessionId, userId, status: 'active' });
        if (!initialSession) throw new NotFoundError('Active Arena session');

        const currentLessonId = initialSession.problemPool[initialSession.currentProblemIndex];
        const lesson = await Lesson.findById(currentLessonId);
        if (!lesson) throw new NotFoundError('Lesson');

        // 2. Execute code (Long running - definitely outside transaction)
        const result = await executeCode(initialSession.language, code, lesson.getAllTests());

        // 3. Short-lived transaction for state update
        const dbSession = await mongoose.startSession();
        let finalResponseData = null;

        try {
            await dbSession.withTransaction(async () => {
                // RE-FETCH session inside transaction to ensure it's still active
                const session = await SuddenDeathSession.findOne({ _id: sessionId, userId, status: 'active' }).session(dbSession);

                if (!session) {
                    // Session likely timed out or was failed by another process while code was running
                    // We fetch the current status to return to the user
                    const currentSession = await SuddenDeathSession.findById(sessionId).session(dbSession);
                    const user = await User.findById(userId).session(dbSession);
                    const progress = user.getProgress(initialSession.language);

                    finalResponseData = {
                        success: true,
                        data: {
                            passed: false,
                            death: true,
                            sessionStatus: currentSession?.status || 'failed',
                            lockoutUntil: progress.arenaLockoutUntil,
                            pointDeduction: 0,
                            result: { error: 'SYSTEM INTERRUPT: Session state changed during execution.' }
                        }
                    };
                    return;
                }

                if (result.passed) {
                    // Success - Advance or Win
                    session.currentProblemIndex += 1;
                    const currentLevel = Math.floor(session.currentProblemIndex / 2) + 1;
                    session.level = currentLevel;
                    session.score += 200 * (session.level);

                    let completed = false;
                    let nextLesson = null;
                    let nextTimeLimit = null;

                    if (session.currentProblemIndex >= session.problemPool.length) {
                        session.status = 'completed';
                        session.endTime = new Date();
                        completed = true;

                        await User.updateOne(
                            { _id: userId, 'progress.language': session.language },
                            {
                                $inc: {
                                    'stats.totalPoints': 2500,
                                    'stats.totalArenaWins': 1,
                                    'progress.$.points': 2500
                                }
                            },
                            { session: dbSession }
                        );
                    } else {
                        nextLesson = await Lesson.findById(session.problemPool[session.currentProblemIndex]).session(dbSession);
                        nextTimeLimit = session.timeLimits[session.currentProblemIndex];
                    }

                    await session.save({ session: dbSession });

                    finalResponseData = {
                        success: true,
                        data: {
                            passed: true,
                            completed,
                            sessionStatus: session.status,
                            level: Math.floor((session.currentProblemIndex - 1) / 2) + 1,
                            part: ((session.currentProblemIndex - 1) % 2) + 1,
                            nextLevel: Math.floor(session.currentProblemIndex / 2) + 1,
                            nextPart: (session.currentProblemIndex % 2) + 1,
                            score: session.score,
                            nextLesson: nextLesson ? nextLesson.toUserObject() : null,
                            nextTimeLimit,
                            result
                        }
                    };
                } else {
                    // FAILURE - DEATH
                    session.status = 'failed';
                    session.endTime = new Date();
                    session.livesRemaining = 0;
                    await session.save({ session: dbSession });

                    const lockoutUntil = new Date(Date.now() + 60 * 60 * 1000); // 1 hour
                    const pointDeduction = -100;

                    await User.updateOne(
                        { _id: userId, 'progress.language': session.language },
                        {
                            $set: { 'progress.$.arenaLockoutUntil': lockoutUntil },
                            $inc: {
                                'stats.totalPoints': pointDeduction,
                                'progress.$.points': pointDeduction
                            }
                        },
                        { session: dbSession }
                    );

                    await AuditLog.log({
                        userId,
                        action: 'ARENA_DEATH',
                        payload: {
                            sessionId: session._id,
                            language: session.language,
                            levelReached: session.level,
                            lockoutUntil,
                            pointDeduction
                        }
                    }, { session: dbSession });

                    finalResponseData = {
                        success: true,
                        data: {
                            passed: false,
                            death: true,
                            sessionStatus: 'failed',
                            lockoutUntil,
                            pointDeduction,
                            result
                        }
                    };
                }
            });
        } finally {
            dbSession.endSession();
        }

        // Leaderboard sync after success commit
        if (finalResponseData?.data?.passed || finalResponseData?.data?.death) {
            leaderboardService.updateUserRank(userId).catch(err => logger.error('Leaderboard sync failed:', err));
        }

        res.json(finalResponseData);
    } catch (error) {
        next(error);
    }
}

/**
 * Get active Arena session status
 */
export async function getSessionStatus(req, res, next) {
    try {
        const userId = req.userId;
        const session = await SuddenDeathSession.findOne({ userId, status: 'active' })
            .populate('problemPool');

        if (!session) {
            return res.json({ success: true, data: { active: false } });
        }

        const currentLesson = await Lesson.findById(session.problemPool[session.currentProblemIndex]);
        const user = await User.findById(userId);
        const progress = user.getProgress(session.language);

        res.json({
            success: true,
            data: {
                active: true,
                sessionId: session._id,
                level: Math.floor(session.currentProblemIndex / 2) + 1,
                part: (session.currentProblemIndex % 2) + 1,
                totalParts: 2,
                totalLevels: 5,
                language: session.language,
                lesson: currentLesson.toUserObject(),
                timeLimit: session.timeLimits[session.currentProblemIndex],
                lockoutUntil: progress.arenaLockoutUntil
            }
        });
    } catch (error) {
        next(error);
    }
}

/**
 * Explicitly fail an Arena session (e.g. timeout)
 */
export async function failSession(req, res, next) {
    try {
        const { sessionId, reason } = req.body;
        const userId = req.userId;

        const dbSession = await mongoose.startSession();
        let finalResponseData = null;

        try {
            await dbSession.withTransaction(async () => {
                const session = await SuddenDeathSession.findOne({ _id: sessionId, userId }).session(dbSession);
                if (!session) throw new NotFoundError('Active Arena session');

                // Idempotency check: If already failed or completed, return current state
                if (session.status !== 'active') {
                    const user = await User.findById(userId).session(dbSession);
                    const progress = user.getProgress(session.language);
                    finalResponseData = {
                        success: true,
                        data: {
                            status: session.status,
                            lockoutUntil: progress.arenaLockoutUntil,
                            pointDeduction: 0
                        }
                    };
                    return;
                }

                // MARK FAILED
                session.status = 'failed';
                session.endTime = new Date();
                session.livesRemaining = 0;
                await session.save({ session: dbSession });

                // APPLY PENALTY
                const lockoutUntil = new Date(Date.now() + 60 * 60 * 1000); // 1 hour
                const pointDeduction = -100;

                await User.updateOne(
                    { _id: userId, 'progress.language': session.language },
                    {
                        $set: { 'progress.$.arenaLockoutUntil': lockoutUntil },
                        $inc: {
                            'stats.totalPoints': pointDeduction,
                            'progress.$.points': pointDeduction
                        }
                    },
                    { session: dbSession }
                );

                await AuditLog.log({
                    userId,
                    action: 'ARENA_TIMEOUT',
                    payload: {
                        sessionId: session._id,
                        language: session.language,
                        reason: reason || 'timeout',
                        lockoutUntil,
                        pointDeduction
                    }
                }, { session: dbSession });

                finalResponseData = {
                    success: true,
                    data: {
                        status: 'failed',
                        lockoutUntil,
                        pointDeduction
                    }
                };
            });
        } finally {
            dbSession.endSession();
        }

        // Sync Leaderboard after success commit
        if (finalResponseData?.data?.status === 'failed') {
            leaderboardService.updateUserRank(userId).catch(err => logger.error('Leaderboard sync failed:', err));
        }

        res.json(finalResponseData);
    } catch (error) {
        next(error);
    }
}

/**
 * Get lockout status for all languages
 */
export async function getLockouts(req, res, next) {
    try {
        const userId = req.userId;
        const user = await User.findById(userId);
        if (!user) throw new NotFoundError('User');

        const lockouts = {};
        user.progress.forEach(p => {
            const isLocked = p.arenaLockoutUntil && p.arenaLockoutUntil > new Date();
            lockouts[p.language] = {
                isLocked,
                lockoutUntil: p.arenaLockoutUntil,
                remainingMinutes: isLocked ? Math.ceil((p.arenaLockoutUntil - new Date()) / 60000) : 0
            };
        });

        res.json({ success: true, data: lockouts });
    } catch (error) {
        next(error);
    }
}
