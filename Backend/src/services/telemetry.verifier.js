
import SubmissionTelemetry from '../models/SubmissionTelemetry.js';
import logger from '../utils/logger.js';

/**
 * Service to analyze telemetry data for anti-cheat verification.
 */
class TelemetryVerifier {

    /**
     * Analyze telemetry data and save to database
     * @param {string} telemetryData - Base64 compressed string
     * @param {string} submissionId - ID of submission
     * @param {string} userId - ID of user
     * @returns {Promise<object>} Analysis result
     */
    async analyzeAndSave(telemetryData, submissionId, userId) {
        if (!telemetryData) {
            return { verified: false, reason: 'NO_TELEMETRY' };
        }

        try {
            // 1. Decompress
            const jsonString = atob(telemetryData);
            const data = JSON.parse(jsonString);

            // data schema: { start: timestamp, pastes: count, log: [[t, e, k], ...] }

            const pasteCount = data.pastes || 0;
            const events = data.log || [];

            const keydownEvents = events.filter(e => e[1] === 'keydown');

            // 2. Variance Analysis
            let variance = 0;
            if (keydownEvents.length > 5) {
                const intervals = [];
                for (let i = 1; i < keydownEvents.length; i++) {
                    const t1 = keydownEvents[i][0];
                    const t0 = keydownEvents[i - 1][0];
                    intervals.push(t1 - t0);
                }

                // Calculate Variance
                const mean = intervals.reduce((a, b) => a + b, 0) / intervals.length;
                variance = intervals.reduce((a, b) => a + Math.pow(b - mean, 2), 0) / intervals.length;
            }

            // 3. Flags
            const flags = [];
            let isSuspicious = false;

            if (pasteCount > 0) {
                flags.push('PASTE_DETECTED');
                isSuspicious = true;
            }

            // AI/Bot typing usually has near-zero variance if simply injected, 
            // or very specific fixed intervals. Humans vary wildly (e.g. > 500-1000 variance typically)
            // This threshold requires tuning, but < 10ms variance is definitely a bot/script.
            if (keydownEvents.length > 10 && variance < 20) {
                flags.push('LOW_VARIANCE_BOT');
                isSuspicious = true;
            }

            // 4. Save to DB
            await SubmissionTelemetry.create({
                submissionId,
                userId,
                raw: telemetryData,
                pasteCount,
                variance,
                isSuspicious,
                flags
            });

            return {
                verified: !isSuspicious,
                flags,
                variance
            };

        } catch (err) {
            logger.error('Telemetry Analysis Failed:', err);
            return { verified: false, reason: 'ANALYSIS_ERROR' };
        }
    }
}

export const telemetryVerifier = new TelemetryVerifier();
