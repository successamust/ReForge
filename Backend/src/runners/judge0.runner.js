import config from '../config/index.js';
import { GradingError } from '../utils/errors.js';
import logger from '../utils/logger.js';

// Judge0 language IDs
const languageIds = {
    javascript: 63, // Node.js
    python: 71, // Python 3
    java: 62, // Java
    go: 60, // Go
    csharp: 51, // C#
};

/**
 * Run code using Judge0 API
 */
export async function runWithJudge0(language, code, tests) {
    const startTime = Date.now();
    const languageId = languageIds[language];

    if (!languageId) {
        throw new GradingError(`Unsupported language: ${language}`);
    }

    try {
        const results = [];
        let passedCount = 0;

        // Process each test
        for (const test of tests) {
            const testResult = await runSingleTest(languageId, code, test);
            results.push(testResult);
            if (testResult.passed) {
                passedCount++;
            }
        }

        return {
            passed: passedCount === tests.length,
            details: results,
            summary: {
                passedCount,
                total: tests.length,
            },
            executionTimeMs: Date.now() - startTime,
        };
    } catch (error) {
        logger.error('Judge0 runner error:', error);
        throw new GradingError(`Judge0 execution failed: ${error.message}`);
    }
}

/**
 * Run a single test case
 */
async function runSingleTest(languageId, code, test) {
    const { id, input, expectedOutput, isHidden, hint } = test;
    const testStartTime = Date.now();

    try {
        // Create submission
        const createResponse = await fetch(
            `${config.judge0.apiUrl}/submissions?base64_encoded=true&wait=true`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-RapidAPI-Key': config.judge0.apiKey,
                    'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com',
                },
                body: JSON.stringify({
                    language_id: languageId,
                    source_code: Buffer.from(code).toString('base64'),
                    stdin: input ? Buffer.from(JSON.stringify(input)).toString('base64') : '',
                    expected_output: expectedOutput
                        ? Buffer.from(JSON.stringify(expectedOutput)).toString('base64')
                        : '',
                }),
            }
        );

        if (!createResponse.ok) {
            throw new Error(`Judge0 API error: ${createResponse.status}`);
        }

        const result = await createResponse.json();

        const stdout = result.stdout
            ? Buffer.from(result.stdout, 'base64').toString()
            : '';
        const stderr = result.stderr
            ? Buffer.from(result.stderr, 'base64').toString()
            : '';

        // Status ID 3 = Accepted
        const passed = result.status.id === 3;

        return {
            testId: id,
            passed,
            stdout: stdout.trim(),
            stderr: stderr.trim(),
            durationMs: Date.now() - testStartTime,
            isHidden,
            hint: !passed && hint ? hint : undefined,
        };
    } catch (error) {
        return {
            testId: id,
            passed: false,
            stdout: '',
            stderr: error.message,
            durationMs: Date.now() - testStartTime,
            isHidden,
            hint: hint || undefined,
        };
    }
}
