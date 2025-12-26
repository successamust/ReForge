import {
    getEndOfCalendarDay,
    hasCalendarDayWindowExpired,
    getRemainingWindowTime,
    isValidTimezone,
} from '../../src/utils/timezone.js';

describe('Timezone Utilities', () => {
    describe('getEndOfCalendarDay', () => {
        it('should return midnight of next day in UTC', () => {
            const date = new Date('2024-01-15T14:30:00Z');
            const end = getEndOfCalendarDay(date, 'UTC');

            expect(end.toISOString()).toBe('2024-01-16T00:00:00.000Z');
        });

        it('should handle timezone offset correctly', () => {
            // 2PM in NYC on Jan 15
            const date = new Date('2024-01-15T19:00:00Z'); // 2PM EST
            const end = getEndOfCalendarDay(date, 'America/New_York');

            // Should be midnight EST, which is 5AM UTC next day
            expect(end.getUTCHours()).toBe(5);
            expect(end.getUTCDate()).toBe(16);
        });
    });

    describe('hasCalendarDayWindowExpired', () => {
        it('should return false if same calendar day', () => {
            const failedAt = new Date('2024-01-15T10:00:00Z');
            const now = new Date('2024-01-15T23:00:00Z');

            expect(hasCalendarDayWindowExpired(failedAt, 'UTC', now)).toBe(false);
        });

        it('should return true if past midnight', () => {
            const failedAt = new Date('2024-01-15T23:00:00Z');
            const now = new Date('2024-01-16T00:01:00Z');

            expect(hasCalendarDayWindowExpired(failedAt, 'UTC', now)).toBe(true);
        });

        it('should respect user timezone', () => {
            // User fails at 11PM NYC time
            const failedAt = new Date('2024-01-16T04:00:00Z'); // 11PM EST on Jan 15

            // Before midnight NYC (4:30AM UTC on Jan 16)
            const beforeMidnight = new Date('2024-01-16T04:30:00Z');
            expect(hasCalendarDayWindowExpired(failedAt, 'America/New_York', beforeMidnight)).toBe(false);

            // After midnight NYC (5:30AM UTC on Jan 16)
            const afterMidnight = new Date('2024-01-16T05:30:00Z');
            expect(hasCalendarDayWindowExpired(failedAt, 'America/New_York', afterMidnight)).toBe(true);
        });

        it('should handle edge case: fail at 23:59, check at 00:00', () => {
            const failedAt = new Date('2024-01-15T23:59:00Z');
            const now = new Date('2024-01-16T00:00:00Z');

            expect(hasCalendarDayWindowExpired(failedAt, 'UTC', now)).toBe(true);
        });
    });

    describe('getRemainingWindowTime', () => {
        it('should return positive milliseconds if window open', () => {
            const failedAt = new Date('2024-01-15T12:00:00Z');
            const now = new Date('2024-01-15T20:00:00Z');

            const remaining = getRemainingWindowTime(failedAt, 'UTC', now);

            expect(remaining).toBeGreaterThan(0);
            expect(remaining).toBeLessThan(12 * 60 * 60 * 1000); // Less than 12 hours
        });

        it('should return 0 if window expired', () => {
            const failedAt = new Date('2024-01-15T23:00:00Z');
            const now = new Date('2024-01-16T01:00:00Z');

            const remaining = getRemainingWindowTime(failedAt, 'UTC', now);

            expect(remaining).toBe(0);
        });
    });

    describe('isValidTimezone', () => {
        it('should return true for valid timezone', () => {
            expect(isValidTimezone('America/New_York')).toBe(true);
            expect(isValidTimezone('Europe/London')).toBe(true);
            expect(isValidTimezone('Asia/Tokyo')).toBe(true);
            expect(isValidTimezone('UTC')).toBe(true);
        });

        it('should return false for invalid timezone', () => {
            expect(isValidTimezone('Invalid/Timezone')).toBe(false);
            expect(isValidTimezone('Foo')).toBe(false);
            expect(isValidTimezone('')).toBe(false);
        });
    });
});
