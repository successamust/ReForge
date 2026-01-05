
import { User, AuditLog } from '../models/index.js';
import logger from '../utils/logger.js';
import { NotFoundError } from '../utils/errors.js';

class RelapseService {

    /**
     * Trigger a relapse for a user
     * @param {string} userId 
     * @param {string} reason 
     * @param {number} drillsRequired 
     */
    async triggerRelapse(userId, reason = 'INACTIVITY', drillsRequired = 5) {
        const user = await User.findById(userId);
        if (!user) throw new NotFoundError('User');

        if (user.status === 'relapsed') {
            return; // Already relapsed
        }

        user.status = 'relapsed';
        user.relapsedAt = new Date();
        user.detoxRequired = drillsRequired;

        await user.save();

        await AuditLog.log({
            userId,
            action: 'RELAPSE_TRIGGERED',
            payload: { reason, drillsRequired }
        });

        logger.info(`User ${userId} relapsed due to ${reason}`);
    }

    /**
     * Restore user to active status
     * @param {string} userId 
     */
    async recoverUser(userId) {
        const user = await User.findById(userId);
        if (!user) throw new NotFoundError('User');

        user.status = 'active';
        user.relapsedAt = null;
        user.detoxRequired = 0;

        await user.save();

        await AuditLog.log({
            userId,
            action: 'RELAPSE_RECOVERED',
            payload: { recoveredAt: new Date() }
        });

        logger.info(`User ${userId} recovered from relapse`);
        return user;
    }
}

export const relapseService = new RelapseService();
