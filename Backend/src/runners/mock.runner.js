import logger from '../utils/logger.js';

/**
 * Mock runner for development without Docker
 * Simulates code execution for testing purposes
 */
export async function runWithMock(language, code, tests, operation = 'test') {
    const startTime = Date.now();

    logger.debug(`Mock runner executing ${language} code (operation: ${operation})`);

    // Simulate execution delay
    await new Promise((resolve) => setTimeout(resolve, 300 + Math.random() * 200));

    if (operation === 'lint') {
        const hasFunction = /\b(function|def|func|class)\b|=>/.test(code);
        const hasReturn = /\breturn\b/.test(code);
        const hasTopLevelReturn = hasReturn && !hasFunction;

        const isRubbish = !code || code.trim().length < 5 ||
            (language === 'python' && /\bdef\b/.test(code) && !code.includes(':')) ||
            (language === 'javascript' && /\bfunction\b/.test(code) && !code.includes('{')) ||
            hasTopLevelReturn ||
            (/^[asdfghjkl;qwertyuiop\s\n\t]+$/i.test(code.trim()));

        if (isRubbish) {
            return {
                passed: false,
                error: `Syntax Error (Mock): Illegal Return or Invalid structure detected for ${language}.`,
                location: { line: 1, column: 1 },
                executionTimeMs: Date.now() - startTime,
            };
        }

        return {
            passed: true,
            result: {
                passed: true,
                message: 'Syntax analysis complete (Mock).',
                output: (code.includes('console.log') || code.includes('print')) ? '> Hello, Digital World.\n> Transmission received.' : ''
            },
            executionTimeMs: Date.now() - startTime,
        };
    }

    const results = [];
    let passedCount = 0;

    // Blindly pass if no tests provided for non-lint operations
    if (!tests || tests.length === 0) {
        return {
            passed: true,
            details: [],
            summary: { passedCount: 0, total: 0 },
            executionTimeMs: Date.now() - startTime,
        };
    }

    for (const test of tests) {
        const testStartTime = Date.now();
        // ... rest of the existing mock logic ...

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
