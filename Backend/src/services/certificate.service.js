import PDFDocument from 'pdfkit';
import { User, AuditLog } from '../models/index.js';
import { NotFoundError, ValidationError } from '../utils/errors.js';
import config from '../config/index.js';
import logger from '../utils/logger.js';
import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

const __dirname = path.dirname(fileURLToPath(import.meta.url));

/**
 * Generate a certificate for course completion
 */
export async function generateCertificate(userId, language) {
    const user = await User.findById(userId);
    if (!user) {
        throw new NotFoundError('User');
    }

    const progress = user.getProgress(language);

    // Verify course completion
    if (!progress.completedAt && progress.currentDay <= config.maxDays) {
        throw new ValidationError(
            `User has not completed the ${language} course (currently on day ${progress.currentDay})`
        );
    }

    const completedAt = progress.completedAt || new Date();
    const certificateId = `${userId}-${language}-${Date.now()}`;

    // Create PDF
    const doc = new PDFDocument({
        size: 'A4',
        layout: 'landscape',
        margin: 50,
    });

    // Certificate output path
    const outputDir = path.join(__dirname, '../../certificates');
    if (!fs.existsSync(outputDir)) {
        fs.mkdirSync(outputDir, { recursive: true });
    }

    const outputPath = path.join(outputDir, `${certificateId}.pdf`);
    const writeStream = fs.createWriteStream(outputPath);
    doc.pipe(writeStream);

    // Language display names
    const languageNames = {
        javascript: 'JavaScript',
        python: 'Python',
        java: 'Java',
        go: 'Go',
        csharp: 'C#',
    };

    // Certificate design
    const pageWidth = doc.page.width;
    const pageHeight = doc.page.height;

    // Border
    doc.rect(30, 30, pageWidth - 60, pageHeight - 60)
        .lineWidth(3)
        .stroke('#1a365d');

    doc.rect(40, 40, pageWidth - 80, pageHeight - 80)
        .lineWidth(1)
        .stroke('#2b6cb0');

    // Header
    doc.fontSize(16)
        .font('Helvetica')
        .fillColor('#4a5568')
        .text('30-DAY CODING CHALLENGE', 0, 80, { align: 'center' });

    doc.fontSize(40)
        .font('Helvetica-Bold')
        .fillColor('#1a365d')
        .text('CERTIFICATE', 0, 110, { align: 'center' });

    doc.fontSize(20)
        .font('Helvetica')
        .fillColor('#4a5568')
        .text('OF COMPLETION', 0, 160, { align: 'center' });

    // Recipient
    doc.fontSize(14)
        .font('Helvetica')
        .fillColor('#718096')
        .text('This is to certify that', 0, 220, { align: 'center' });

    doc.fontSize(28)
        .font('Helvetica-Bold')
        .fillColor('#2d3748')
        .text(`${user.firstName} ${user.lastName}`, 0, 250, { align: 'center' });

    // Achievement
    doc.fontSize(14)
        .font('Helvetica')
        .fillColor('#718096')
        .text('has successfully completed the', 0, 300, { align: 'center' });

    doc.fontSize(24)
        .font('Helvetica-Bold')
        .fillColor('#2b6cb0')
        .text(`30-Day ${languageNames[language] || language} Challenge`, 0, 330, { align: 'center' });

    // Date
    doc.fontSize(12)
        .font('Helvetica')
        .fillColor('#718096')
        .text(
            `Completed on ${completedAt.toLocaleDateString('en-US', {
                year: 'numeric',
                month: 'long',
                day: 'numeric'
            })}`,
            0,
            400,
            { align: 'center' }
        );

    // Certificate ID
    doc.fontSize(10)
        .font('Helvetica')
        .fillColor('#a0aec0')
        .text(`Certificate ID: ${certificateId}`, 0, pageHeight - 100, { align: 'center' });

    doc.end();

    // Wait for write to complete
    await new Promise((resolve, reject) => {
        writeStream.on('finish', resolve);
        writeStream.on('error', reject);
    });

    // Log certificate generation
    await AuditLog.log({
        userId,
        action: 'CERTIFICATE_GENERATE',
        payload: {
            language,
            certificateId,
            completedAt,
        },
    });

    logger.info(`Generated certificate ${certificateId} for user ${userId} (${language})`);

    return {
        certificateId,
        language,
        completedAt,
        path: outputPath,
    };
}

/**
 * Get certificate info for a user
 */
export async function getCertificateInfo(userId, language) {
    const user = await User.findById(userId);
    if (!user) {
        throw new NotFoundError('User');
    }

    const progress = user.getProgress(language);

    return {
        language,
        isCompleted: !!progress.completedAt || progress.currentDay > config.maxDays,
        completedAt: progress.completedAt,
        currentDay: progress.currentDay,
        canGenerate: !!progress.completedAt || progress.currentDay > config.maxDays,
    };
}
