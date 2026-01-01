import { javascriptLessons } from './javascript.js';
import { pythonLessons } from './python.js';
import { javaLessons } from './java.js';
import { goLessons } from './go.js';
import { csharpLessons } from './csharp.js';

// Import complete lessons for later days
import { javascriptDays14to30 } from './javascript-complete.js';
import { pythonDays8to30Complete } from './python-complete.js';
import { javaDays8to30Complete } from './java-complete.js';
import { goDays8to30Complete } from './go-complete.js';
import { csharpDays8to30Complete } from './csharp-complete.js';

// Import REAL content replacing placeholder days
import { javascriptDays23to30Real } from './javascript-days23-30.js';
import { pythonDays11to30Real } from './python-days11-30.js';
import { javaDays10to30Real } from './java-days10-30.js';
import { goDays11to30Real } from './go-days11-30.js';
import { csharpDays10to30Real } from './csharp-days10-30.js';

// Import FINAL real content for remaining placeholder days
import { pythonDays16to30Real } from './python-days16-30.js';
import { javaDays12to30Real } from './java-days12-30.js';
import { goDays12to30Real } from './go-days12-30.js';
import { goDays1to7Real } from './go-days1-7.js';
import { csharpDays11to30Real } from './csharp-days11-30.js';
import { csharpDays1to7Real } from './csharp-days1-7.js';

/**
 * Merge lessons arrays, later lessons override earlier ones by day number
 */
function mergeLessons(...lessonArrays) {
    const merged = new Map();
    for (const lessons of lessonArrays) {
        if (!lessons) {continue;}
        for (const lesson of lessons) {
            merged.set(lesson.day, lesson);
        }
    }
    return Array.from(merged.values()).sort((a, b) => a.day - b.day);
}

// Build complete lesson sets for each language
// Order: base -> complete -> real (latest overrides earlier)
const allLessons = {
    javascript: mergeLessons(
        javascriptLessons,
        javascriptDays14to30,
        javascriptDays23to30Real
    ),
    python: mergeLessons(
        pythonLessons,
        pythonDays8to30Complete,
        pythonDays11to30Real,
        pythonDays16to30Real
    ),
    java: mergeLessons(
        javaLessons,
        javaDays8to30Complete,
        javaDays10to30Real,
        javaDays12to30Real
    ),
    go: mergeLessons(
        goLessons,
        goDays8to30Complete,
        goDays11to30Real,
        goDays12to30Real,
        goDays1to7Real
    ),
    csharp: mergeLessons(
        csharpLessons,
        csharpDays8to30Complete,
        csharpDays10to30Real,
        csharpDays11to30Real,
        csharpDays1to7Real
    ),
};

export function getLessonsForLanguage(language) {
    return allLessons[language] || [];
}

export function getAllLessons() {
    return Object.values(allLessons).flat();
}

export function getLessonCount() {
    return getAllLessons().length;
}

// Verify all 30 days for each language
export function verifyCompleteness() {
    const issues = [];
    for (const [lang, lessons] of Object.entries(allLessons)) {
        const days = new Set(lessons.map(l => l.day));
        for (let d = 1; d <= 30; d++) {
            if (!days.has(d)) {
                issues.push(`${lang}: Missing day ${d}`);
            }
        }
        if (lessons.length !== 30) {
            issues.push(`${lang}: Expected 30 lessons, got ${lessons.length}`);
        }
    }
    return issues;
}
