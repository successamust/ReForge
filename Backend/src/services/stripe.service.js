import Stripe from 'stripe';
import config from '../config/index.js';
import logger from '../utils/logger.js';


let stripe = null;

if (process.env.STRIPE_SECRET_KEY) {
    stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
} else {
    logger.warn('Stripe Secret Key not found. Monetization features will be disabled.');
}

/**
 * Create a checkout session for a course/subscription
 */
export async function createCheckoutSession(userId, priceId) {
    if (!stripe) {
        throw new Error('Payment service unavailable');
    }

    try {
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            billing_address_collection: 'auto',
            customer_email: undefined, // Will be fetched from user in a real implementation
            line_items: [
                {
                    price: priceId,
                    quantity: 1,
                },
            ],
            mode: 'subscription',
            success_url: `${process.env.FRONTEND_URL}/payment/success?session_id={CHECKOUT_SESSION_ID}`,
            cancel_url: `${process.env.FRONTEND_URL}/payment/cancel`,
            metadata: {
                userId,
            },
        });

        return session;
    } catch (error) {
        logger.error('Stripe Checkout Error:', error);
        throw error;
    }
}

/**
 * Handle Stripe webhook
 */
export async function handleWebhook(body, signature) {
    if (!stripe || !process.env.STRIPE_WEBHOOK_SECRET) {
        return { received: true };
    }

    let event;
    try {
        event = stripe.webhooks.constructEvent(
            body,
            signature,
            process.env.STRIPE_WEBHOOK_SECRET
        );
    } catch (err) {
        logger.error('Webhook signature verification failed.', err.message);
        // Important: Return 400 to Stripe so it doesn't keep retrying a bad request
        throw new Error(`Webhook Error: ${err.message}`);
    }

    // Handle the event
    switch (event.type) {
        case 'checkout.session.completed':
            const session = event.data.object;
            // Grant access to user
            await grantAccess(session.metadata.userId, session.subscription);
            break;
        default:
            logger.debug(`Unhandled event type ${event.type}`);
    }

    return { received: true };
}

async function grantAccess(userId, subscriptionId) {
    // Payments are currently disabled/deferred.
    // This is a explicit placeholder for future implementation.
    logger.info(`[Placeholder] Would grant premium access to user ${userId} for subscription ${subscriptionId}`);
}
