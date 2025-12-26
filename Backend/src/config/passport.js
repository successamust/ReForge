import passport from 'passport';
import { Strategy as GoogleStrategy } from 'passport-google-oauth20';
import { Strategy as GitHubStrategy } from 'passport-github2';
import config from './index.js';
import * as authService from '../services/auth.service.js';
import logger from '../utils/logger.js';

/**
 * Configure Passport strategies
 */
export function configurePassport() {
    // Google Strategy
    if (config.oauth.google.clientId && config.oauth.google.clientSecret) {
        passport.use(
            new GoogleStrategy(
                {
                    clientID: config.oauth.google.clientId,
                    clientSecret: config.oauth.google.clientSecret,
                    callbackURL: config.oauth.google.callbackUrl,
                },
                async (accessToken, refreshToken, profile, done) => {
                    try {
                        const user = await authService.socialLogin('google', profile);
                        return done(null, user);
                    } catch (error) {
                        logger.error('Google OAuth Error:', error);
                        return done(error, null);
                    }
                }
            )
        );
    } else {
        logger.warn('Google OAuth credentials not provided. Google login disabled.');
    }

    // GitHub Strategy
    if (config.oauth.github.clientId && config.oauth.github.clientSecret) {
        passport.use(
            new GitHubStrategy(
                {
                    clientID: config.oauth.github.clientId,
                    clientSecret: config.oauth.github.clientSecret,
                    callbackURL: config.oauth.github.callbackUrl,
                },
                async (accessToken, refreshToken, profile, done) => {
                    try {
                        const user = await authService.socialLogin('github', profile);
                        return done(null, user);
                    } catch (error) {
                        logger.error('GitHub OAuth Error:', error);
                        return done(error, null);
                    }
                }
            )
        );
    } else {
        logger.warn('GitHub OAuth credentials not provided. GitHub login disabled.');
    }

    // Since we are using JWT, we don't need serializeUser/deserializeUser for sessions
    // but Passport requires them if we don't disable session support in routes.
    // We will disable sessions in the routes, but let's provide stubs just in case.
    passport.serializeUser((user, done) => done(null, user));
    passport.deserializeUser((user, done) => done(null, user));
}

export default passport;
