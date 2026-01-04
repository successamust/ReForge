import sgMail from '@sendgrid/mail';
import config from '../config/index.js';
import logger from '../utils/logger.js';

// Set API Key
if (config.email.sendgridApiKey && config.email.sendgridApiKey.startsWith('SG.')) {
    sgMail.setApiKey(config.email.sendgridApiKey);
} else {
    const reason = !config.email.sendgridApiKey ? 'not found' : 'invalid format (must start with "SG.")';
    logger.warn(`SendGrid API Key ${reason}. Email sending will be disabled.`);
}

/**
 * Send an email
 */
async function sendEmail(to, subject, html) {
    if (!config.email.sendgridApiKey) {
        logger.info(`[Email Mock] To: ${to}, Subject: ${subject}`);
        return;
    }

    const msg = {
        to,
        from: config.email.fromEmail,
        subject,
        html,
    };

    try {
        await sgMail.send(msg);
        logger.info(`Email sent to ${to}`);
    } catch (error) {
        logger.error('Error sending email:', error);
        if (error.response) {
            logger.error(error.response.body);
        }
        throw new Error('Email sending failed');
    }
}

/**
 * Send verification email
 */
export async function sendVerificationEmail(to, token) {
    const verificationUrl = `${config.frontendUrl}/verify-email?token=${token}`;
    const subject = 'Verify your email';
    const html = `
        <h1>Verify your email</h1>
        <p>Please click the link below to verify your email address:</p>
        <a href="${verificationUrl}">${verificationUrl}</a>
        <p>This link will expire in 24 hours.</p>
    `;
    await sendEmail(to, subject, html);
}

/**
 * Send password reset email
 */
export async function sendPasswordResetEmail(to, token) {
    const resetUrl = `${config.frontendUrl}/reset-password?token=${token}`;
    const subject = 'Reset your password';
    const html = `
        <h1>Reset your password</h1>
        <p>You requested a password reset. Click the link below to reset your password:</p>
        <a href="${resetUrl}">${resetUrl}</a>
        <p>This link will expire in 1 hour.</p>
        <p>If you didn't request this, please ignore this email.</p>
    `;
    await sendEmail(to, subject, html);
}
