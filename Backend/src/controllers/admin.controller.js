import { Lesson, User, Submission, AuditLog, Achievement } from '../models/index.js';
import * as progressService from '../services/progress.service.js';
import * as gradingService from '../services/grading.service.js';
import { NotFoundError } from '../utils/errors.js';

/**
 * Create a new lesson
 */
export async function createLesson(req, res, next) {
    try {
        const lessonData = req.body;
        const adminId = req.userId;

        const lesson = new Lesson(lessonData);
        await lesson.save();

        await AuditLog.log({
            userId: adminId,
            action: 'ADMIN_LESSON_CREATE',
            payload: {
                lessonId: lesson._id,
                language: lesson.language,
                day: lesson.day,
                title: lesson.title,
            },
            createdBy: adminId,
        });

        res.status(201).json({
            success: true,
            data: { lesson },
        });
    } catch (error) {
        next(error);
    }
}

/**
 * Update a lesson
 */
export async function updateLesson(req, res, next) {
    try {
        const { language, day } = req.params;
        const updates = req.body;
        const adminId = req.userId;

        const lesson = await Lesson.findOneAndUpdate(
            { language, day: parseInt(day, 10) },
            { $set: updates },
            { new: true }
        );

        if (!lesson) {
            throw new NotFoundError('Lesson');
        }

        await AuditLog.log({
            userId: adminId,
            action: 'ADMIN_LESSON_UPDATE',
            payload: {
                lessonId: lesson._id,
                language: lesson.language,
                day: lesson.day,
                updates: Object.keys(updates),
            },
            createdBy: adminId,
        });

        res.json({
            success: true,
            data: { lesson },
        });
    } catch (error) {
        next(error);
    }
}

/**
 * Delete a lesson
 */
export async function deleteLesson(req, res, next) {
    try {
        const { language, day } = req.params;
        const adminId = req.userId;

        const lesson = await Lesson.findOneAndDelete({
            language,
            day: parseInt(day, 10),
        });

        if (!lesson) {
            throw new NotFoundError('Lesson');
        }

        await AuditLog.log({
            userId: adminId,
            action: 'ADMIN_LESSON_DELETE',
            payload: {
                lessonId: lesson._id,
                language: lesson.language,
                day: lesson.day,
                title: lesson.title,
            },
            createdBy: adminId,
        });

        res.json({
            success: true,
            message: 'Lesson deleted',
        });
    } catch (error) {
        next(error);
    }
}

/**
 * Get lesson with solution (admin only)
 */
export async function getLessonWithSolution(req, res, next) {
    try {
        const { language, day } = req.params;

        const lesson = await Lesson.findOne({
            language,
            day: parseInt(day, 10),
        });

        if (!lesson) {
            throw new NotFoundError('Lesson');
        }

        res.json({
            success: true,
            data: { lesson },
        });
    } catch (error) {
        next(error);
    }
}

/**
 * Override user progress
 */
export async function overrideProgress(req, res, next) {
    try {
        const { userId, language, currentDay, reason } = req.body;
        const adminId = req.userId;

        const result = await progressService.adminOverrideProgress(
            userId,
            language,
            currentDay,
            reason,
            adminId
        );

        res.json({
            success: true,
            data: result,
        });
    } catch (error) {
        next(error);
    }
}

/**
 * Re-run a submission
 */
export async function rerunSubmission(req, res, next) {
    try {
        const { id } = req.params;
        const adminId = req.userId;

        const submission = await gradingService.rerunSubmission(id, adminId);

        res.json({
            success: true,
            data: { submission },
        });
    } catch (error) {
        next(error);
    }
}

/**
 * Get all users (paginated)
 */
export async function getUsers(req, res, next) {
    try {
        const { page = 1, limit = 20, email } = req.query;

        const query = {};
        if (email) {
            query.email = { $regex: email, $options: 'i' };
        }

        const users = await User.find(query)
            .select('-passwordHash')
            .sort({ createdAt: -1 })
            .skip((page - 1) * limit)
            .limit(parseInt(limit, 10));

        const total = await User.countDocuments(query);

        res.json({
            success: true,
            data: {
                users,
                pagination: {
                    page: parseInt(page, 10),
                    limit: parseInt(limit, 10),
                    total,
                    pages: Math.ceil(total / limit),
                },
            },
        });
    } catch (error) {
        next(error);
    }
}

/**
 * Get user by ID
 */
export async function getUser(req, res, next) {
    try {
        const { id } = req.params;

        const user = await User.findById(id).select('-passwordHash');
        if (!user) {
            throw new NotFoundError('User');
        }

        res.json({
            success: true,
            data: { user },
        });
    } catch (error) {
        next(error);
    }
}

/**
 * Update user (role, status)
 */
export async function updateUser(req, res, next) {
    try {
        const { id } = req.params;
        const { role, isActive } = req.body;
        const adminId = req.userId;

        const user = await User.findById(id);
        if (!user) {
            throw new NotFoundError('User');
        }

        // Update allowed fields
        if (role !== undefined) user.role = role;
        if (isActive !== undefined) user.isActive = isActive;

        await user.save();

        await AuditLog.log({
            userId: adminId,
            action: 'ADMIN_USER_UPDATE',
            payload: {
                targetUserId: id,
                updates: { role, isActive },
            },
            createdBy: adminId,
        });

        res.json({
            success: true,
            data: { user: user.toSafeObject() },
        });
    } catch (error) {
        next(error);
    }
}

/**
 * Get audit logs
 */
export async function getAuditLogs(req, res, next) {
    try {
        const { userId, action, page = 1, limit = 50 } = req.query;

        const query = {};
        if (userId) {
            query.userId = userId;
        }
        if (action) {
            query.action = action;
        }

        const logs = await AuditLog.find(query)
            .populate('userId', 'email')
            .populate('createdBy', 'email')
            .sort({ createdAt: -1 })
            .skip((page - 1) * limit)
            .limit(parseInt(limit, 10));

        const total = await AuditLog.countDocuments(query);

        res.json({
            success: true,
            data: {
                logs,
                pagination: {
                    page: parseInt(page, 10),
                    limit: parseInt(limit, 10),
                    total,
                    pages: Math.ceil(total / limit),
                },
            },
        });
    } catch (error) {
        next(error);
    }
}

/**
 * Export user report
 */
export async function exportUserReport(req, res, next) {
    try {
        const users = await User.find({ isActive: true })
            .select('-passwordHash')
            .lean();

        const report = users.map(user => ({
            email: user.email,
            createdAt: user.createdAt,
            progress: user.progress.map(p => ({
                language: p.language,
                currentDay: p.currentDay,
                lastPassedDay: p.lastPassedDay,
                completedAt: p.completedAt,
            })),
        }));

        res.json({
            success: true,
            data: {
                exportedAt: new Date(),
                totalUsers: report.length,
                users: report,
            },
        });
    } catch (error) {
        next(error);
    }
}

/**
 * Get system stats for admin dashboard
 */
export async function getSystemStats(req, res, next) {
    try {
        const totalUsers = await User.countDocuments();
        const premiumUsers = await User.countDocuments({ 'subscription.tier': 'premium' });

        const today = new Date();
        today.setHours(0, 0, 0, 0);

        const newUsersToday = await User.countDocuments({ createdAt: { $gte: today } });

        const activeToday = await User.countDocuments({
            'stats.lastActivityAt': { $gte: today }
        });

        const totalPoints = await User.aggregate([
            { $group: { _id: null, total: { $sum: '$stats.totalPoints' } } }
        ]);

        const lessonCount = await Lesson.countDocuments();

        res.json({
            success: true,
            data: {
                users: {
                    total: totalUsers,
                    premium: premiumUsers,
                    free: totalUsers - premiumUsers,
                    newToday: newUsersToday,
                },
                engagement: {
                    activeToday,
                    totalPoints: totalPoints[0]?.total || 0,
                },
                content: {
                    totalLessons: lessonCount,
                },
                system: {
                    nodeVersion: process.version,
                    memoryUsage: process.memoryUsage(),
                    uptime: process.uptime(),
                }
            }
        });
    } catch (error) {
        next(error);
    }
}

/**
 * Get user achievements for admin
 */
export async function getUserAchievements(req, res, next) {
    try {
        const { id } = req.params;
        const achievements = await Achievement.find({ userId: id }).sort({ unlockedAt: -1 });

        res.json({
            success: true,
            data: { achievements },
        });
    } catch (error) {
        next(error);
    }
}

/**
 * Manually update a user's subscription tier
 */
export async function updateUserTier(req, res, next) {
    try {
        const { id } = req.params;
        const { tier, expiresAt } = req.body;
        const adminId = req.userId;

        if (!['free', 'premium'].includes(tier)) {
            return res.status(400).json({
                success: false,
                message: 'Invalid tier. Must be "free" or "premium"'
            });
        }

        const user = await User.findByIdAndUpdate(
            id,
            {
                $set: {
                    'subscription.tier': tier,
                    'subscription.expiresAt': expiresAt ? new Date(expiresAt) : null
                }
            },
            { new: true }
        ).select('-passwordHash');

        if (!user) {
            throw new NotFoundError('User');
        }

        await AuditLog.log({
            userId: adminId,
            action: 'ADMIN_USER_UPDATE',
            payload: {
                targetUserId: id,
                updates: { tier, expiresAt }
            },
            createdBy: adminId
        });

        res.json({
            success: true,
            data: { user }
        });
    } catch (error) {
        next(error);
    }
}
