/**
 * JavaScript code executor
 * Runs inside Docker container
 */

const vm = require('vm');

const payload = JSON.parse(
    Buffer.from(process.env.PAYLOAD, 'base64').toString()
);

const { code, tests, operation } = payload;

/**
 * Deep equality helper that handles undefined, null, and objects
 */
function deepEqual(actual, expected) {
    if (actual === expected) return true;

    if (actual && expected && typeof actual === 'object' && typeof expected === 'object') {
        if (Array.isArray(actual) !== Array.isArray(expected)) return false;

        const actualKeys = Object.keys(actual);
        const expectedKeys = Object.keys(expected);

        // Include keys with undefined values in the check
        const allKeys = new Set([...actualKeys, ...expectedKeys]);

        for (const key of allKeys) {
            if (!deepEqual(actual[key], expected[key])) return false;
        }
        return true;
    }

    return false;
}

async function runTests() {
    if (operation === 'lint') {
        try {
            // Check syntax using vm.Script to catch top-level return
            new vm.Script(code);

            // If syntax is valid, run to capture console.log
            const logs = [];
            const context = vm.createContext({
                console: {
                    log: (...args) => logs.push(args.map(a =>
                        typeof a === 'object' ? JSON.stringify(a) : String(a)
                    ).join(' ')),
                    error: (...args) => logs.push(`Error: ${args.join(' ')}`),
                    warn: (...args) => logs.push(`Warn: ${args.join(' ')}`),
                },
                process: { env: {} },
                Buffer,
                setTimeout,
                clearTimeout,
                setInterval,
                clearInterval,
            });

            try {
                const script = new vm.Script(code);
                script.runInContext(context, { timeout: 2000 });

                let output = logs.join('\n');
                if (output.length > 10000) {
                    output = output.substring(0, 10000) + '\n... [Output Truncated for Security]';
                }

                process.stdout.write(JSON.stringify({
                    passed: true,
                    message: 'Syntax valid',
                    output: output
                }));
            } catch (runError) {
                // If it fails at runtime (e.g. ReferenceError), we still passed syntax check
                let output = logs.concat([`Runtime Error: ${runError.message}`]).join('\n');
                if (output.length > 10000) {
                    output = output.substring(0, 10000) + '\n... [Output Truncated for Security]';
                }

                process.stdout.write(JSON.stringify({
                    passed: true,
                    message: 'Syntax valid (Runtime error encountered)',
                    output: output
                }));
            }
        } catch (error) {
            // Extract location from stack trace if available (evalmachine.<anonymous>:line:column)
            const lineMatch = error.stack ? error.stack.match(/evalmachine\.<anonymous>:(\d+)(?::(\d+))?/) : null;

            process.stdout.write(JSON.stringify({
                passed: false,
                error: error.message,
                location: lineMatch ? {
                    line: parseInt(lineMatch[1], 10),
                    column: lineMatch[2] ? parseInt(lineMatch[2], 10) : 1
                } : (error.line ? {
                    line: error.line,
                    column: error.column || 1
                } : null)
            }));
        }
        return;
    }

    const results = [];
    let passedCount = 0;

    for (const test of tests) {
        const testResult = await runSingleTest(test);
        results.push(testResult);
        if (testResult.passed) {
            passedCount++;
        }
    }

    const output = {
        passed: passedCount === tests.length,
        details: results,
        summary: {
            passedCount,
            total: tests.length,
        },
    };

    process.stdout.write(JSON.stringify(output));
}

async function runSingleTest(test) {
    const { id, input, expectedOutput, isHidden, hint } = test;
    const startTime = Date.now();

    try {
        // Create a sandboxed function from the user's code
        const AsyncFunction = Object.getPrototypeOf(async function () { }).constructor;

        // Wrap user code in a function
        const wrappedCode = `
      ${code}
      
      // Call the main function with test input
      if (typeof solution === 'function') {
        return solution(${JSON.stringify(input)});
      } else if (typeof main === 'function') {
        return main(${JSON.stringify(input)});
      } else {
        throw new Error('No solution or main function found');
      }
    `;

        const fn = new AsyncFunction(wrappedCode);
        const result = await Promise.race([
            fn(),
            new Promise((_, reject) =>
                setTimeout(() => reject(new Error('Test timeout')), 5000)
            ),
        ]);

        // Compare result with expected output
        const passed = deepEqual(result, expectedOutput);

        return {
            testId: id,
            passed,
            stdout: JSON.stringify(result),
            stderr: '',
            durationMs: Date.now() - startTime,
            isHidden,
            hint: !passed && hint ? hint : undefined,
        };
    } catch (error) {
        return {
            testId: id,
            passed: false,
            stdout: '',
            stderr: error.message,
            durationMs: Date.now() - startTime,
            isHidden,
            hint: hint || undefined,
        };
    }
}

runTests().catch((error) => {
    process.stdout.write(
        JSON.stringify({
            passed: false,
            details: [],
            summary: { passedCount: 0, total: tests ? tests.length : 0 },
            error: error.message,
        })
    );
    process.exit(1);
});
