import { Lesson } from '../models/index.js';
import { NotFoundError } from '../utils/errors.js';

export async function getLesson(req, res, next) {
    try {
        const { language, day } = req.params;

        const lesson = await Lesson.findByLanguageAndDay(language, parseInt(day, 10));
        if (!lesson) {
            throw new NotFoundError(`Lesson for ${language} day ${day}`);
        }

        // Return user-facing version (without solution and hidden tests)
        res.json({
            success: true,
            data: { lesson: lesson.toUserObject() },
        });
    } catch (error) {
        next(error);
    }
}

export async function getLessonsByLanguage(req, res, next) {
    try {
        const { language } = req.params;

        const lessons = await Lesson.find({ language, isPublished: true })
            .select('day title difficulty estimatedMinutes')
            .sort({ day: 1 });

        res.json({
            success: true,
            data: {
                language,
                lessons,
                totalDays: lessons.length,
            },
        });
    } catch (error) {
        next(error);
    }
}

export async function getCurrentLesson(req, res, next) {
    try {
        const { language } = req.params;
        const user = req.user;

        const progress = user.getProgress(language);
        const currentDay = progress.currentDay;

        const lesson = await Lesson.findByLanguageAndDay(language, currentDay);
        if (!lesson) {
            throw new NotFoundError(`Lesson for ${language} day ${currentDay}`);
        }

        res.json({
            success: true,
            data: {
                lesson: lesson.toUserObject(),
                progress: {
                    currentDay: progress.currentDay,
                    lastPassedDay: progress.lastPassedDay,
                    failedDay: progress.failedDay,
                    attemptCount: progress.attemptCount,
                },
            },
        });
    } catch (error) {
        next(error);
    }
}

export async function getStats(req, res, next) {
    try {
        const { Submission } = await import('../models/index.js');
        const heatmap = await Submission.aggregate([
            {
                $group: {
                    _id: { language: "$language", day: "$day" },
                    total: { $sum: 1 },
                    success: {
                        $sum: { $cond: [{ $eq: ["$status", "completed"] }, 1, 0] }
                    }
                }
            },
            {
                $project: {
                    language: "$_id.language",
                    day: "$_id.day",
                    rate: {
                        $cond: [
                            { $gt: ["$total", 0] },
                            { $multiply: [{ $divide: ["$success", "$total"] }, 100] },
                            0
                        ]
                    },
                    total: 1
                }
            }
        ]);

        res.json({
            success: true,
            data: { heatmap },
        });
    } catch (error) {
        next(error);
    }
}
