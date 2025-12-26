import { jest, describe, it, expect, beforeEach, afterAll, beforeAll } from '@jest/globals';
import * as progressService from '../../src/services/progress.service.js';
import * as achievementService from '../../src/services/achievement.service.js';
import { User, Lesson, Achievement } from '../../src/models/index.js';
import mongoose from 'mongoose';

describe('Progress Service - Streaks and Achievements', () => {
    let userId;

    beforeAll(async () => {
        await Lesson.deleteMany({});
        // Create a lesson
        const lesson = new Lesson({
            language: 'javascript',
            day: 1,
            title: 'Test Lesson',
            difficulty: 5,
            estimatedMinutes: 10,
            objectives: ['Obj1', 'Obj2', 'Obj3'],
            contentHtml: '<p>Test</p>',
            examples: [
                { title: 'Ex1', code: 'ex1', explanation: 'ex1' },
                { title: 'Ex2', code: 'ex2', explanation: 'ex2' }
            ],
            exercise: { description: 'Ex' },
            tests: [
                { id: '1', description: 't', input: '1', expectedOutput: '1' },
                { id: '2', description: 't', input: '1', expectedOutput: '1' },
                { id: '3', description: 't', input: '1', expectedOutput: '1' }
            ],
            solution: 'sol'
        });
        await lesson.save();
    });

    beforeEach(async () => {
        const user = new User({
            email: `streak-${Math.random()}@example.com`,
            firstName: 'Streak',
            lastName: 'Tester',
            passwordHash: 'hashed',
            timezone: 'UTC'
        });
        await user.save();
        userId = user._id;
    });

    it('should increment currentStreak if active yesterday', async () => {
        const yesterday = new Date();
        yesterday.setDate(yesterday.getDate() - 1);

        await User.updateOne({ _id: userId }, {
            $set: {
                'stats.lastActivityAt': yesterday,
                'stats.currentStreak': 5,
                'progress': [{ language: 'javascript', currentDay: 1, lastPassedDay: 0 }]
            }
        });

        await progressService.advanceProgress(userId, 'javascript', 1);

        const updatedUser = await User.findById(userId);
        expect(updatedUser.stats.currentStreak).toBe(6);
    });

    it('should reset currentStreak to 1 if day missed', async () => {
        const threeDaysAgo = new Date();
        threeDaysAgo.setDate(threeDaysAgo.getDate() - 3);

        await User.updateOne({ _id: userId }, {
            $set: {
                'stats.lastActivityAt': threeDaysAgo,
                'stats.currentStreak': 10,
                'progress': [{ language: 'javascript', currentDay: 1, lastPassedDay: 0 }]
            }
        });

        await progressService.advanceProgress(userId, 'javascript', 1);

        const updatedUser = await User.findById(userId);
        expect(updatedUser.stats.currentStreak).toBe(1);
    });

    it('should unlock POINTS_100 achievement', async () => {
        await User.updateOne({ _id: userId }, {
            $set: {
                'stats.totalPoints': 95,
                'progress': [{ language: 'javascript', currentDay: 1, lastPassedDay: 0 }]
            }
        });

        await progressService.advanceProgress(userId, 'javascript', 1);

        // Wait for async achievement check
        await new Promise(resolve => setTimeout(resolve, 100));

        const achievements = await Achievement.find({ userId, type: 'POINTS_100' });
        expect(achievements.length).toBe(1);
    });
});
