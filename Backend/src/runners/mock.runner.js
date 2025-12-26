import logger from '../utils/logger.js';

/**
 * Mock runner for development without Docker
 * Simulates code execution for testing purposes
 */
export async function runWithMock(language, code, tests) {
    const startTime = Date.now();

    logger.debug(`Mock runner executing ${language} code with ${tests.length} tests`);

    // Simulate execution delay
    await new Promise((resolve) => setTimeout(resolve, 500 + Math.random() * 500));

    const results = [];
    let passedCount = 0;

    for (const test of tests) {
        const testStartTime = Date.now();

        // Simple mock logic:
        // - If code contains 'error' or 'throw', fail
        // - If code is empty, fail
        // - Otherwise, use a simple heuristic based on code length and structure

        let passed = false;
        let stdout = '';
        let stderr = '';

        if (!code || code.trim().length === 0) {
            stderr = 'No code provided';
            passed = false;
        } else if (code.toLowerCase().includes('syntax error') || code.includes('throw')) {
            stderr = 'Execution error';
            passed = false;
        } else {
            // Check for basic patterns that suggest correct implementation
            const hasFunction = /function|def|func|public\s+static|=>/.test(code);
            const hasReturn = /return|print|console\.log|fmt\.Print|Console\.Write/.test(code);
            const hasLogic = code.length > 20 && (hasFunction || hasReturn);

            // 80% pass rate for reasonable-looking code
            passed = hasLogic && Math.random() > 0.2;

            if (passed) {
                stdout = JSON.stringify(test.expectedOutput);
            } else {
                stdout = 'Incorrect output';
                stderr = test.hint || 'Check your implementation';
            }
        }

        if (passed) {
            passedCount++;
        }

        results.push({
            testId: test.id,
            passed,
            stdout,
            stderr,
            durationMs: Date.now() - testStartTime,
            isHidden: test.isHidden,
            hint: !passed && test.hint ? test.hint : undefined,
        });
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
}
