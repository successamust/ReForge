#!/usr/bin/env node

/**
 * Certificate Generation Script
 * Usage: node scripts/generate-certificate.js <userId> <language>
 */

import mongoose from 'mongoose';
import { program } from 'commander';
import connectDatabase from '../src/config/database.js';
import * as certificateService from '../src/services/certificate.service.js';
import logger from '../src/utils/logger.js';

program
    .name('generate-certificate')
    .description('Generate a certificate for a user who completed a course')
    .argument('<userId>', 'User ID')
    .argument('<language>', 'Language (javascript, python, java, go, csharp)')
    .action(async (userId, language) => {
        try {
            await connectDatabase();

            logger.info(`Generating certificate for user ${userId} (${language})`);

            const result = await certificateService.generateCertificate(userId, language);

            logger.info(`Certificate generated successfully!`);
            logger.info(`Certificate ID: ${result.certificateId}`);
            logger.info(`Path: ${result.path}`);

            await mongoose.disconnect();
            process.exit(0);
        } catch (error) {
            logger.error('Failed to generate certificate:', error);
            process.exit(1);
        }
    });

program.parse();
