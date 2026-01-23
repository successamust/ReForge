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
 * Run code using Judge0 API (Batch Mode)
 */
export async function runWithJudge0(language, code, tests) {
    const startTime = Date.now();
    const languageId = languageIds[language];

    if (!languageId) {
        throw new GradingError(`Unsupported language: ${language}`);
    }

    try {
        // 1. Prepare batch submissions
        // We wrap the user's "function" code in a full runner that parses stdin inputs
        // and prints outputs so Judge0 can compare with expected_output.
        const submissions = tests.map(test => {
            const wrappedCode = getWrappedCode(language, code, test.input);
            return {
                language_id: languageId,
                source_code: Buffer.from(wrappedCode).toString('base64'),
                stdin: test.input ? Buffer.from(JSON.stringify(test.input)).toString('base64') : '',
                expected_output: test.expectedOutput
                    ? Buffer.from(JSON.stringify(test.expectedOutput)).toString('base64')
                    : '',
            };
        });

        // 2. Submit batch
        const submitResponse = await fetch(
            `${config.judge0.apiUrl}/submissions/batch?base64_encoded=true`,
            {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                    'X-RapidAPI-Key': config.judge0.apiKey,
                    'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com',
                },
                body: JSON.stringify({ submissions }),
            }
        );

        if (!submitResponse.ok) {
            const errorBody = await submitResponse.text().catch(() => 'No error body');
            logger.error(`Judge0 Batch Submit Error (${submitResponse.status}):`, errorBody);
            throw new Error(`Judge0 API error: ${submitResponse.status}`);
        }

        const submissionTokens = await submitResponse.json();
        const tokens = submissionTokens.map(s => s.token).join(',');

        // 3. Poll for results
        let completedResults = null;
        let attempts = 0;
        const maxAttempts = 20; // Increased polling limit

        while (attempts < maxAttempts) {
            await new Promise(resolve => setTimeout(resolve, 1500)); // Wait before polling

            const pollResponse = await fetch(
                `${config.judge0.apiUrl}/submissions/batch?tokens=${tokens}&base64_encoded=true`,
                {
                    headers: {
                        'X-RapidAPI-Key': config.judge0.apiKey,
                        'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com',
                    }
                }
            );

            if (!pollResponse.ok) {
                throw new Error(`Judge0 Poll Error: ${pollResponse.status}`);
            }

            const data = await pollResponse.json();
            const allSubmissions = data.submissions;

            // Check if all are finished (status id > 2 means finished: 3=Accepted, 4=Wrong Answer, etc.)
            const allFinished = allSubmissions.every(s => s.status.id > 2);

            if (allFinished) {
                completedResults = allSubmissions;
                break;
            }

            attempts++;
        }

        if (!completedResults) {
            throw new Error('Judge0 batch execution timed out');
        }

        // 4. Process results
        const finalResults = tests.map((test, index) => {
            const result = completedResults[index];
            const stdout = result.stdout ? Buffer.from(result.stdout, 'base64').toString() : '';
            const stderr = result.stderr ? Buffer.from(result.stderr, 'base64').toString() : '';
            const compileOutput = result.compile_output ? Buffer.from(result.compile_output, 'base64').toString() : '';

            const passed = result.status.id === 3;

            return {
                testId: test.id,
                passed,
                stdout: stdout.trim(),
                stderr: (stderr || compileOutput).trim(),
                durationMs: Math.round((result.time || 0) * 1000),
                isHidden: test.isHidden,
                hint: !passed && test.hint ? test.hint : undefined,
            };
        });

        const passedCount = finalResults.filter(r => r.passed).length;

        return {
            passed: passedCount === tests.length,
            details: finalResults,
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
 * Wraps user code in a harness that reads stdin and prints the result.
 */
function getWrappedCode(language, code, input) {
    // For simplicity in Judge0 batch mode, we can hardcode the input in the source if we want, OR read from stdin.
    // Reading from stdin allows the compiled binary to be reused potentially, but Judge0 recompiles every submission anyway.
    // However, Judge0 has an 'stdin' field. Using stdin is cleaner.
    // But we need to inject the input parsing logic.

    switch (language) {
        case 'javascript':
            return `
${code}

// Harness
const chunks = [];
process.stdin.on('data', chunk => chunks.push(chunk));
process.stdin.on('end', () => {
    const input = JSON.parse(chunks.join(''));
    const args = Array.isArray(input) ? input : [input];
    let result;
    if (typeof solution === 'function') {
        result = solution(...args);
    } else if (typeof main === 'function') {
        result = main(...args);
    } else {
        throw new Error('No solution function');
    }
    console.log(JSON.stringify(result));
});
`;
        case 'python':
            return `
${code}

import sys, json

if __name__ == '__main__':
    try:
        input_str = sys.stdin.read()
        if not input_str: exit(0)
        args = json.loads(input_str)
        if not isinstance(args, list): args = [args]
        
        if 'solution' in globals():
            res = solution(*args)
        elif 'main' in globals():
            res = main(*args)
        else:
            raise Exception('No function found')
        
        print(json.dumps(res))
    except Exception as e:
        print(str(e))
        exit(1)
`;
        case 'java':
            // Assume code contains "class Solution { ... }"
            // Or "public int solution(...)".
            // If it's a snippet, we wrap it in class Solution.
            let fullCode = code;
            if (!code.includes('class Solution')) {
                fullCode = `class Solution { \n${code}\n}`;
            }
            return `
import java.util.*;
import java.io.*;

${fullCode}

public class Main {
    public static void main(String[] args) {
        try {
            Scanner s = new Scanner(System.in);
            if (!s.hasNext()) return;
            String input = s.useDelimiter("\\\\A").next();
            // Primitive parsing for simple inputs (ints, strings, arrays) needed for ReForge
            // Since we don't have GSON in standard Judge0 CE (unless added), we need a minimal parser
            // OR we expect simple inputs. 
            // For robustness, let's assume the user input is a JSON string of arguments.
            // CAUTION: Parsing arbitrary JSON in Java without libs is hard.
            // TRICK: We can pass the EXACT input values via code injection instead of stdin for compiled languages
            // to avoid parsing issues if we want.
            // BUT Judge0 verifies stdout vs expected_output.
            
            // Let's use the code injection method for inputs to avoid stdin parsing complexity in Java/Go/C#
            // Override stdin usage for Java/Go/C# below.
        } catch (Exception e) {
            e.printStackTrace();
        }
    }
}
`;
        case 'go':
        case 'csharp':
            // Logic handled by overridden injection below
            return code;
        default:
            return code;
    }
}

// Override function to inject input directly into source for compiled languages without JSON libs
function getWrappedCodeWithInjection(language, code, input) {
    const inputStr = JSON.stringify(input);
    // Ensure properly escaped for string literals
    const safeInput = inputStr;

    switch (language) {
        case 'java':
            let jCode = code;
            if (!code.includes('class Solution')) {
                jCode = `class Solution { \n${code}\n}`;
            }
            // Generate a call that prints the result
            // Using simple parsing or just injection of args if input is [1, 2]

            // Dynamic arg injection:
            // If input is [1, 2], we want solution(1, 2)
            let jArgs = "";
            if (Array.isArray(input)) {
                jArgs = input.map(v => JSON.stringify(v)).join(', ');
            } else {
                jArgs = JSON.stringify(input);
            }

            return `
import java.util.*;
${jCode}
public class Main {
    public static void main(String[] args) {
        try {
            Object res = new Solution().solution(${jArgs});
            System.out.print(res); // Print without newline to match exact output if needed, or println
            // Judge0 exact match often expects newline or not depending on config. 
            // Usually println is safer if expected output logic handles trim.
            // But JSON.stringify(3) is "3".
        } catch (Exception e) { e.printStackTrace(); }
    }
}
`;
        case 'go':
            let gArgs = "";
            if (Array.isArray(input)) {
                gArgs = input.map(v => JSON.stringify(v)).join(', ');
            } else {
                gArgs = JSON.stringify(input);
            }

            return `
package main
import "fmt"
${code}
func main() {
    res := solution(${gArgs})
    
    // Manual JSON serialization for basic types
    // Judge0 output comparison is text-based.
    // If output is 3, we print 3.
    fmt.Print(res)
}
`;
        case 'csharp':
            let cArgs = "";
            if (Array.isArray(input)) {
                cArgs = input.map(v => v.toString().toLowerCase()).join(', '); // C# params
                // Correction: JSON values need proper C# formatting.
                // This is complex for generic inputs.
            }
            // For now, assume simple int/string inputs for P0.
            // Relying on .toString() is risky for strings (need quotes).
            if (Array.isArray(input)) {
                cArgs = input.map(v => JSON.stringify(v)).join(', ');
            } else {
                cArgs = JSON.stringify(input);
            }

            return `
using System;
public class Solution {
    ${code}
}
public class Program {
    public static void Main() {
        var res = new Solution().Solution(${cArgs});
        // We need lower case "true"/"false" for JSON compatibility if boolean
        if (res is bool b) Console.Write(b.ToString().ToLower());
        else Console.Write(res);
    }
}
`;
        default:
            return getWrappedCode(language, code, input);
    }
}

// Redefine runWithJudge0 to use the injection method for compiled languages
export async function runWithJudge0_v2(language, code, tests) {
    // ... Copy of logic but using getWrappedCodeWithInjection for compiled ...
    // To keep it clean, let's just create a helper that decides.
}

// We need to patch the earlier `runWithJudge0` to use specific logic per language loop
// Because `submissions` map needs to know the input for INJECTION.
// The previous logic used `tests.map`.
// So we modify the `submissions` creation in `runWithJudge0`.

/**
 * RE-EXPORT of runWithJudge0 with improvements
 */
export async function runWithJudge0_Patched(language, code, tests) {
    const startTime = Date.now();
    const languageId = languageIds[language];
    if (!languageId) throw new GradingError(`Unsupported language: ${language}`);

    try {
        const submissions = tests.map(test => {
            // Decider: stdin vs injection
            const isCompiled = ['java', 'go', 'csharp'].includes(language);

            let finalCode;
            let stdin = '';

            if (isCompiled) {
                finalCode = getWrappedCodeWithInjection(language, code, test.input);
                stdin = ''; // No stdin needed if injected
            } else {
                finalCode = getWrappedCode(language, code, test.input);
                stdin = test.input ? Buffer.from(JSON.stringify(test.input)).toString('base64') : '';
            }

            return {
                language_id: languageId,
                source_code: Buffer.from(finalCode).toString('base64'),
                stdin: stdin,
                expected_output: test.expectedOutput
                    ? Buffer.from(JSON.stringify(test.expectedOutput)).toString('base64')
                    : '',
            };
        });

        // ... Rest of the logic is same as before ... 
        // Re-implementing the fetch/poll part here to be self-contained in the file replacement.

        const submitResponse = await fetch(`${config.judge0.apiUrl}/submissions/batch?base64_encoded=true`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
                'X-RapidAPI-Key': config.judge0.apiKey,
                'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com',
            },
            body: JSON.stringify({ submissions }),
        });

        if (!submitResponse.ok) {
            throw new Error(`Judge0 API error: ${submitResponse.status}`);
        }

        const tokens = (await submitResponse.json()).map(s => s.token).join(',');

        let completedResults = null;
        for (let i = 0; i < 20; i++) {
            await new Promise(r => setTimeout(r, 1000));
            const poll = await fetch(`${config.judge0.apiUrl}/submissions/batch?tokens=${tokens}&base64_encoded=true`, {
                headers: { 'X-RapidAPI-Key': config.judge0.apiKey, 'X-RapidAPI-Host': 'judge0-ce.p.rapidapi.com' }
            });
            const data = await poll.json();
            if (data.submissions.every(s => s.status.id > 2)) {
                completedResults = data.submissions;
                break;
            }
        }

        if (!completedResults) throw new Error('Timeout');

        const finalResults = tests.map((test, index) => {
            const res = completedResults[index];
            const passed = res.status.id === 3;
            const stdout = res.stdout ? Buffer.from(res.stdout, 'base64').toString() : '';
            const stderr = res.stderr ? Buffer.from(res.stderr, 'base64').toString() : '';
            const cmp = res.compile_output ? Buffer.from(res.compile_output, 'base64').toString() : '';

            return {
                testId: test.id,
                passed,
                stdout: stdout.trim(),
                stderr: (stderr || cmp).trim(),
                durationMs: Math.round((res.time || 0) * 1000),
            };
        });

        return {
            passed: finalResults.every(r => r.passed),
            details: finalResults,
            summary: { passedCount: finalResults.filter(r => r.passed).length, total: tests.length },
            executionTimeMs: Date.now() - startTime
        };

    } catch (error) {
        logger.error('Judge0 runner error:', error);
        throw new GradingError(`Judge0 execution failed: ${error.message}`);
    }
}
