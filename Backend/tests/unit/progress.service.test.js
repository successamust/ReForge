import { User } from '../../src/models/index.js';
import * as progressService from '../../src/services/progress.service.js';

describe('Progress Service', () => {
    let testUser;

    beforeEach(async () => {
        testUser = await User.create({
            email: 'test@example.com',
            passwordHash: 'hashedpassword',
            firstName: 'Test',
            lastName: 'User',
            timezone: 'America/New_York',
            progress: [
                {
                    language: 'javascript',
                    currentDay: 1,
                    lastPassedDay: 0,
                    failedDay: null,
                    failedAt: null,
                    attemptCount: 0,
                },
            ],
        });
    });

    describe('getProgress', () => {
        it('should return progress for existing language', async () => {
            const progress = await progressService.getProgress(testUser._id, 'javascript');

            expect(progress.language).toBe('javascript');
            expect(progress.currentDay).toBe(1);
            expect(progress.lastPassedDay).toBe(0);
        });

        it('should initialize progress for new language', async () => {
            const progress = await progressService.getProgress(testUser._id, 'python');

            expect(progress.language).toBe('python');
            expect(progress.currentDay).toBe(1);
        });
    });

    describe('advanceProgress', () => {
        it('should advance to next day on success', async () => {
            const result = await progressService.advanceProgress(testUser._id, 'javascript', 1);

            expect(result.success).toBe(true);
            expect(result.dayAdvanced).toBe(2);
            expect(result.courseCompleted).toBe(false);
        });

        it('should throw error if attempting wrong day', async () => {
            await expect(
                progressService.advanceProgress(testUser._id, 'javascript', 5)
            ).rejects.toThrow(/Cannot advance/);
        });
    });

    describe('recordFailure', () => {
        it('should set failedAt on first failure', async () => {
            const result = await progressService.recordFailure(testUser._id, 'javascript', 1);

            expect(result.isFirstFailure).toBe(true);
            expect(result.attemptCount).toBe(1);

            const updatedUser = await User.findById(testUser._id);
            const progress = updatedUser.getProgress('javascript');
            expect(progress.failedDay).toBe(1);
            expect(progress.failedAt).toBeDefined();
        });

        it('should not reset failedAt on subsequent failures', async () => {
            // First failure
            await progressService.recordFailure(testUser._id, 'javascript', 1);
            const userAfterFirst = await User.findById(testUser._id);
            const firstFailedAt = userAfterFirst.getProgress('javascript').failedAt;

            // Wait a bit
            await new Promise(r => setTimeout(r, 100));

            // Second failure
            const result = await progressService.recordFailure(testUser._id, 'javascript', 1);

            expect(result.isFirstFailure).toBe(false);

            const updatedUser = await User.findById(testUser._id);
            const progress = updatedUser.getProgress('javascript');
            expect(progress.failedAt.getTime()).toBe(firstFailedAt.getTime());
        });
    });

    describe('applyRollback', () => {
        it('should rollback to lastPassedDay', async () => {
            // Setup: User on day 3, passed day 2
            await User.updateOne(
                { _id: testUser._id, 'progress.language': 'javascript' },
                {
                    $set: {
                        'progress.$.currentDay': 3,
                        'progress.$.lastPassedDay': 2,
                        'progress.$.failedDay': 3,
                        'progress.$.failedAt': new Date(Date.now() - 86400000), // Yesterday
                        firstName: 'Test',
                        lastName: 'User',
                    },
                }
            );

            const result = await progressService.applyRollback(testUser._id, 'javascript');

            expect(result.rollbackFrom).toBe(3);
            expect(result.rollbackTo).toBe(2);

            const updated = await User.findById(testUser._id);
            const progress = updated.getProgress('javascript');
            expect(progress.currentDay).toBe(2);
            expect(progress.lastPassedDay).toBe(1);
            expect(progress.lastAdvancedAt).toBeDefined();
            expect(progress.failedDay).toBeNull();
            expect(progress.failedAt).toBeNull();
        });

        it('should rollback to day 1 if lastPassedDay is 0', async () => {
            // Setup: User failed on day 1
            await User.updateOne(
                { _id: testUser._id, 'progress.language': 'javascript' },
                {
                    $set: {
                        'progress.$.failedDay': 1,
                        'progress.$.failedAt': new Date(Date.now() - 86400000),
                        firstName: 'Test',
                        lastName: 'User',
                    },
                }
            );

            const result = await progressService.applyRollback(testUser._id, 'javascript');

            expect(result.rollbackTo).toBe(1);
        });

        it('should skip rollback if adminOverride is set', async () => {
            await User.updateOne(
                { _id: testUser._id, 'progress.language': 'javascript' },
                {
                    $set: {
                        'progress.$.failedDay': 1,
                        'progress.$.failedAt': new Date(Date.now() - 86400000),
                        'progress.$.adminOverride': true,
                        firstName: 'Test',
                        lastName: 'User',
                    },
                }
            );

            const result = await progressService.applyRollback(testUser._id, 'javascript');

            expect(result).toBeNull();
        });
    });
});
