import * as stripeService from '../services/stripe.service.js';
import logger from '../utils/logger.js';

/**
 * Create a checkout session
 */
export async function createCheckout(req, res, next) {
    try {
        const { priceId } = req.body;
        const userId = req.userId;

        if (!priceId) {
            return res.status(400).json({
                success: false,
                message: 'Price ID is required'
            });
        }

        const session = await stripeService.createCheckoutSession(userId, priceId);

        res.json({
            success: true,
            data: {
                sessionId: session.id,
                url: session.url
            }
        });
    } catch (error) {
        next(error);
    }
}

/**
 * Handle Stripe webhooks
 */
export async function handleWebhook(req, res, next) {
    try {
        const sig = req.headers['stripe-signature'];
        const result = await stripeService.handleWebhook(req.body, sig);

        res.json(result);
    } catch (error) {
        next(error);
    }
}
