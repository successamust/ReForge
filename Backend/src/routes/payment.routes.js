import { Router } from 'express';
import * as paymentController from '../controllers/payment.controller.js';
import { authenticate } from '../middleware/auth.middleware.js';
import { validateBody, schemas } from '../utils/validation.js';
import express from 'express';

const router = Router();

// Webhook needs raw body (usually handled in app.js for /api/v1/payments/webhook)
// But for now we define it here.
router.post('/webhook', express.raw({ type: 'application/json' }), paymentController.handleWebhook);

// Protected routes
router.use(authenticate);
router.post('/checkout', validateBody(schemas.checkout), paymentController.createCheckout);

export default router;
