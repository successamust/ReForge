import { Router } from 'express';
import authRoutes from './auth.routes.js';
import lessonRoutes from './lesson.routes.js';
import submissionRoutes from './submission.routes.js';
import progressRoutes from './progress.routes.js';
import adminRoutes from './admin.routes.js';
import leaderboardRoutes from './leaderboard.routes.js';
import paymentRoutes from './payment.routes.js';
import practiceRoutes from './practice.routes.js';
import relapseRoutes from './relapse.routes.js';
import arenaRoutes from './arena.routes.js';

const router = Router();

// Health check
router.get('/health', (req, res) => {
    res.json({
        success: true,
        data: {
            status: 'healthy',
            timestamp: new Date().toISOString(),
        },
    });
});

// Mount routes
router.use('/auth', authRoutes);
router.use('/lessons', lessonRoutes);
router.use('/submissions', submissionRoutes);
router.use('/progress', progressRoutes);
router.use('/admin', adminRoutes);
router.use('/leaderboard', leaderboardRoutes);
router.use('/payments', paymentRoutes);
router.use('/practice', practiceRoutes);
router.use('/relapse', relapseRoutes);
router.use('/arena', arenaRoutes);

export default router;
