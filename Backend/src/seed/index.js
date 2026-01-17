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

        // Seed lessons for all languages (using upsert now, so no need to wipe)
        logger.info('Seeding lessons...');
        for (const language of config.supportedLanguages) {
            logger.info(`Seeding ${language} lessons...`);
            const lessons = getLessonsForLanguage(language);

            for (const lessonData of lessons) {
                // Use upsert to update existing lessons or create new ones
                await Lesson.findOneAndUpdate(
                    {
                        language: lessonData.language,
                        day: lessonData.day,
                    },
                    lessonData,
                    {
                        upsert: true,
                        new: true,
                        runValidators: true,
                    }
                );
                logger.debug(`Synced lesson: ${language} day ${lessonData.day}`);
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
