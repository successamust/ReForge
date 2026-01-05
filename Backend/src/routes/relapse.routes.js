
import express from 'express';
import * as relapseController from '../controllers/relapse.controller.js';
import { authenticate } from '../middleware/auth.middleware.js';

const router = express.Router();

// All relapse routes require authentication
router.use(authenticate);

router.get('/status', relapseController.getRelapseStatus);
router.post('/detox/complete', relapseController.completeDetox);

export default router;
