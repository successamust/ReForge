
import { relapseService } from '../services/relapse.service.js';
import logger from '../utils/logger.js';

export const completeDetox = async (req, res, next) => {
    try {
        const userId = req.userId;

        logger.info(`User ${userId} attempting to complete detox`);

        const user = await relapseService.recoverUser(userId);

        res.json({
            success: true,
            message: 'Detox protocol complete. Access restored.',
            data: {
                user: user.toSafeObject()
            }
        });
    } catch (error) {
        next(error);
    }
};

export const getRelapseStatus = async (req, res, next) => {
    try {
        const user = req.user;
        res.json({
            success: true,
            data: {
                status: user.status,
                relapsedAt: user.relapsedAt,
                detoxRequired: user.detoxRequired
            }
        });
    } catch (error) {
        next(error);
    }
};
