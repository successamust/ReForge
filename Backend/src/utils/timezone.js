/**
 * Timezone-aware date utilities for rollback logic
 * 
 * CRITICAL: The rollback rule is calendar-day based in user's timezone.
 * User has until midnight in their timezone to pass a failed day.
 */

/**
 * Get the end of the current calendar day in the user's timezone
 * @param {Date} date - The date to calculate from
 * @param {string} timezone - IANA timezone string (e.g., 'America/New_York')
 * @returns {Date} - The midnight that ends the current calendar day
 */
export function getEndOfCalendarDay(date, timezone = 'UTC') {
    try {
        // Format the date in the user's timezone to get the date parts
        const formatter = new Intl.DateTimeFormat('en-US', {
            timeZone: timezone,
            year: 'numeric',
            month: '2-digit',
            day: '2-digit',
            hour: '2-digit',
            minute: '2-digit',
            second: '2-digit',
            hour12: false,
        });

        const parts = formatter.formatToParts(date);
        const dateParts = {};
        for (const part of parts) {
            dateParts[part.type] = part.value;
        }

        // Create a date string for the start of the next day in the user's timezone
        const year = parseInt(dateParts.year, 10);
        const month = parseInt(dateParts.month, 10) - 1;
        const day = parseInt(dateParts.day, 10);

        // Create date at midnight of the next day in the user's timezone
        const nextDay = new Date(Date.UTC(year, month, day + 1));

        // Adjust for timezone offset
        const offsetMs = getTimezoneOffsetMs(timezone, nextDay);
        return new Date(nextDay.getTime() + offsetMs);
    } catch (error) {
        // Fallback to UTC if timezone is invalid
        const endOfDay = new Date(date);
        endOfDay.setUTCHours(23, 59, 59, 999);
        return endOfDay;
    }
}

/**
 * Get the timezone offset in milliseconds for a given timezone at a specific time
 * @param {string} timezone - IANA timezone string
 * @param {Date} date - The date to calculate offset for
 * @returns {number} - Offset in milliseconds
 */
function getTimezoneOffsetMs(timezone, date) {
    const utcDate = new Date(date.toLocaleString('en-US', { timeZone: 'UTC' }));
    const tzDate = new Date(date.toLocaleString('en-US', { timeZone: timezone }));
    return utcDate.getTime() - tzDate.getTime();
}

/**
 * Check if the calendar day window has expired
 * @param {Date} failedAt - The timestamp when the user first failed
 * @param {string} timezone - User's timezone
 * @param {Date} now - Current time (optional, for testing)
 * @returns {boolean} - True if the window has expired
 */
export function hasCalendarDayWindowExpired(failedAt, timezone = 'UTC', now = new Date()) {
    const windowEnd = getEndOfCalendarDay(failedAt, timezone);
    return now >= windowEnd;
}

/**
 * Get remaining time until window expires
 * @param {Date} failedAt - The timestamp when the user first failed
 * @param {string} timezone - User's timezone
 * @param {Date} now - Current time (optional, for testing)
 * @returns {number} - Remaining milliseconds, or 0 if expired
 */
export function getRemainingWindowTime(failedAt, timezone = 'UTC', now = new Date()) {
    const windowEnd = getEndOfCalendarDay(failedAt, timezone);
    const remaining = windowEnd.getTime() - now.getTime();
    return Math.max(0, remaining);
}

/**
 * Format remaining time as human-readable string
 * @param {number} ms - Milliseconds remaining
 * @returns {string} - Human-readable duration
 */
export function formatRemainingTime(ms) {
    if (ms <= 0) {
        return 'expired';
    }

    const hours = Math.floor(ms / (1000 * 60 * 60));
    const minutes = Math.floor((ms % (1000 * 60 * 60)) / (1000 * 60));

    if (hours > 0) {
        return `${hours}h ${minutes}m`;
    }
    return `${minutes}m`;
}

/**
 * Get the current calendar date in user's timezone as YYYY-MM-DD
 * @param {string} timezone - User's timezone
 * @param {Date} now - Current time (optional)
 * @returns {string} - Date string in YYYY-MM-DD format
 */
export function getCurrentCalendarDate(timezone = 'UTC', now = new Date()) {
    const formatter = new Intl.DateTimeFormat('en-CA', {
        timeZone: timezone,
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
    });
    return formatter.format(now);
}

/**
 * Validate that a timezone string is valid
 * @param {string} timezone - IANA timezone string
 * @returns {boolean} - True if valid
 */
export function isValidTimezone(timezone) {
    try {
        Intl.DateTimeFormat(undefined, { timeZone: timezone });
        return true;
    } catch (error) {
        return false;
    }
}
