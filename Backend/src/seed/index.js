import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import connectDatabase from '../config/database.js';
import { User, Lesson } from '../models/index.js';
import config from '../config/index.js';
import logger from '../utils/logger.js';
import { getLessonsForLanguage } from './lessons/index.js';

/**
 * Seed the database with initial data
 */
async function seed() {
    try {
        logger.info('Starting database seed...');

        // Connect to database
        await connectDatabase();

        // Clear existing data (only in development)
        if (config.env === 'development') {
            logger.info('Clearing existing data...');
            await User.deleteMany({});
            await Lesson.deleteMany({});
        }

        // Create admin user
        logger.info('Creating admin user...');
        const adminExists = await User.findByEmail(config.admin.email);
        if (!adminExists) {
            const admin = new User({
                email: config.admin.email,
                passwordHash: config.admin.password,
                firstName: 'Admin',
                lastName: 'Admin',
                role: 'admin',
                timezone: 'UTC',
            });
            await admin.save();
            logger.info(`Admin user created: ${config.admin.email}`);
        }

        // Create test user
        const testUserExists = await User.findByEmail('test@example.com');
        if (!testUserExists) {
            const testUser = new User({
                email: 'test@example.com',
                passwordHash: 'password123',
                firstName: 'Test',
                lastName: 'User',
                role: 'user',
                timezone: 'America/New_York',
            });
            await testUser.save();
            logger.info('Test user created: test@example.com');
        }

        // Seed lessons for all languages
        logger.info('Seeding lessons...');
        for (const language of config.supportedLanguages) {
            logger.info(`Seeding ${language} lessons...`);
            const lessons = getLessonsForLanguage(language);

            for (const lessonData of lessons) {
                const existingLesson = await Lesson.findOne({
                    language: lessonData.language,
                    day: lessonData.day,
                });

                if (!existingLesson) {
                    const lesson = new Lesson(lessonData);
                    await lesson.save();
                    logger.debug(`Created lesson: ${language} day ${lessonData.day}`);
                }
            }
            logger.info(`Seeded ${lessons.length} ${language} lessons`);
        }

        logger.info('Database seed completed successfully!');
        process.exit(0);
    } catch (error) {
        logger.error('Seed failed:', error);
        process.exit(1);
    }
}

seed();
