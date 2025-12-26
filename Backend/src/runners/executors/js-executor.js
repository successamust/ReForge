/**
 * JavaScript code executor
 * Runs inside Docker container
 */

const payload = JSON.parse(
    Buffer.from(process.env.PAYLOAD, 'base64').toString()
);

const { code, tests } = payload;

async function runTests() {
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

    console.log(JSON.stringify(output));
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
        const passed = JSON.stringify(result) === JSON.stringify(expectedOutput);

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
    console.log(
        JSON.stringify({
            passed: false,
            details: [],
            summary: { passedCount: 0, total: tests.length },
            error: error.message,
        })
    );
    process.exit(1);
});
