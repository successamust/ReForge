import { Lesson } from '../models/index.js';
import { NotFoundError } from '../utils/errors.js';

/**
 * Get lesson by language and day
 */
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

/**
 * Get all lessons for a language (overview only)
 */
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

/**
 * Get lesson content for current user's progress
 */
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
