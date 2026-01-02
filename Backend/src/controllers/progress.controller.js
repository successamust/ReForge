import * as progressService from '../services/progress.service.js';
import * as certificateService from '../services/certificate.service.js';
import * as achievementService from '../services/achievement.service.js';

/**
 * Get progress for a specific language
 */
export async function getProgress(req, res, next) {
    try {
        const { language } = req.params;
        const userId = req.userId;

        const progress = await progressService.getProgress(userId, language);

        res.json({
            success: true,
            data: { progress },
        });
    } catch (error) {
        next(error);
    }
}

/**
 * Get all progress for user
 */
export async function getAllProgress(req, res, next) {
    try {
        const userId = req.userId;

        const progress = await progressService.getAllProgress(userId);

        res.json({
            success: true,
            data: { progress },
        });
    } catch (error) {
        next(error);
    }
}

/**
 * Get certificate info
 */
export async function getCertificateInfo(req, res, next) {
    try {
        const { language } = req.params;
        const userId = req.userId;

        const info = await certificateService.getCertificateInfo(userId, language);

        res.json({
            success: true,
            data: info,
        });
    } catch (error) {
        next(error);
    }
}

/**
 * Generate certificate
 */
export async function generateCertificate(req, res, next) {
    try {
        const { language } = req.params;
        const userId = req.userId;

        const certificate = await certificateService.generateCertificate(userId, language);

        // Send the PDF file
        res.download(certificate.path, `certificate-${language}.pdf`);
    } catch (error) {
        next(error);
    }
}

/**
 * Get user achievements
 */
export async function getUserAchievements(req, res, next) {
    try {
        const userId = req.userId;
        const achievements = await achievementService.getUserAchievements(userId);

        res.json({
            success: true,
            data: { achievements },
        });
    } catch (error) {
        next(error);
    }
}

/**
 * Get user stats (accuracy, streak, etc)
 */
export async function getStats(req, res, next) {
    try {
        const userId = req.userId;
        const stats = await progressService.getUserStats(userId);

        res.json({
            success: true,
            data: { stats },
        });
    } catch (error) {
        next(error);
    }
}
