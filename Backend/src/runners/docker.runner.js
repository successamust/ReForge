import Docker from 'dockerode';
import { v4 as uuidv4 } from 'uuid';
import config from '../config/index.js';
import { GradingError } from '../utils/errors.js';
import logger from '../utils/logger.js';

const docker = new Docker({ socketPath: config.runner.dockerSocket });

// Language to Docker image mapping
const languageImages = {
    javascript: 'coding-challenge-runner-js:latest',
    python: 'coding-challenge-runner-python:latest',
    java: 'coding-challenge-runner-java:latest',
    go: 'coding-challenge-runner-go:latest',
    csharp: 'coding-challenge-runner-csharp:latest',
};

// Language to file extension mapping
const languageExtensions = {
    javascript: 'js',
    python: 'py',
    java: 'java',
    go: 'go',
    csharp: 'cs',
};

/**
 * Run code in a Docker container
 */
export async function runWithDocker(language, code, tests, operation = 'test') {
    const startTime = Date.now();
    const image = languageImages[language];
    const ext = languageExtensions[language];

    if (!image) {
        throw new GradingError(`Unsupported language: ${language}`);
    }

    const containerId = `runner-${uuidv4()}`;
    let container = null;

    try {
        // Prepare payload
        const payload = JSON.stringify({
            code,
            tests,
            language,
            operation,
        });

        // Create container
        container = await docker.createContainer({
            Image: image,
            name: containerId,
            Cmd: getExecutionCommand(language),
            Env: [`PAYLOAD=${Buffer.from(payload).toString('base64')}`],
            HostConfig: {
                Memory: parseMemoryLimit(config.runner.memoryLimit),
                MemorySwap: parseMemoryLimit(config.runner.memoryLimit),
                CpuPeriod: 100000,
                CpuQuota: 50000, // 50% of one CPU
                NetworkMode: 'none', // No network access
                AutoRemove: false, // Handle manually to avoid race condition with logs
                ReadonlyRootfs: true,
                SecurityOpt: ['no-new-privileges'],
            },
            Tty: false,
            OpenStdin: false,
        });

        // Start container
        await container.start();

        // Wait for container with timeout
        // Use a shorter timeout for lint operations (5s) to free resources faster
        const timeout = operation === 'lint' ? 5000 : config.runner.timeout;
        const result = await Promise.race([
            waitForContainer(container),
            timeoutPromise(timeout),
        ]);

        if (result === 'timeout') {
            await container.kill().catch(() => { });
            throw new GradingError('Execution timed out');
        }

        // Get logs
        const logs = await container.logs({
            stdout: true,
            stderr: true,
        });

        const output = parseContainerLogs(logs);

        try {
            // Try parsing the whole output first
            const parsed = JSON.parse(output.stdout.trim());
            parsed.executionTimeMs = Date.now() - startTime;
            return parsed;
        } catch (parseError) {
            // Fallback: Try to find the JSON object if there's extra noise (like console.logs)
            // We look for the last occurrence of '{' and matching '}' or similar simple heuristic
            // This is a naive heuristic but better than failing immediately
            try {
                const stdout = output.stdout.trim();
                const jsonStartIndex = stdout.lastIndexOf('{');
                const jsonEndIndex = stdout.lastIndexOf('}');

                if (jsonStartIndex !== -1 && jsonEndIndex !== -1 && jsonEndIndex > jsonStartIndex) {
                    const potentialJson = stdout.substring(jsonStartIndex, jsonEndIndex + 1);
                    const parsed = JSON.parse(potentialJson);

                    // VALIDATION CHECK: Ensure this looks like a real grading result
                    // This prevents accepting random JSON that a user might have printed
                    if (typeof parsed.passed === 'boolean' && parsed.summary && Array.isArray(parsed.tests)) {
                        parsed.executionTimeMs = Date.now() - startTime;
                        parsed.userOutput = stdout.substring(0, jsonStartIndex).trim();
                        return parsed;
                    }
                }
            } catch (fallbackError) {
                // Ignore fallback error and throw original
            }

            logger.error('Failed to parse container output:', output);
            throw new GradingError('Invalid runner output - could not parse result JSON');
        }
    } catch (error) {
        if (error instanceof GradingError) {
            throw error;
        }
        logger.error('Docker runner error:', error);
        throw new GradingError(`Execution failed: ${error.message}`);
    } finally {
        // Clean up container if still exists
        if (container) {
            try {
                await container.remove({ force: true });
            } catch (err) {
                // Container might be auto-removed
            }
        }
    }
}

/**
 * Wait for container to finish
 */
async function waitForContainer(container) {
    return new Promise((resolve, reject) => {
        container.wait((err, data) => {
            if (err) {
                reject(err);
            } else {
                resolve(data);
            }
        });
    });
}

/**
 * Timeout promise
 */
function timeoutPromise(ms) {
    return new Promise((resolve) => {
        setTimeout(() => resolve('timeout'), ms);
    });
}

/**
 * Parse container logs
 */
function parseContainerLogs(logs) {
    const buffer = Buffer.from(logs);
    let stdout = '';
    let stderr = '';
    let offset = 0;

    while (offset < buffer.length) {
        if (offset + 8 > buffer.length) {
            break;
        }

        const header = buffer.slice(offset, offset + 8);
        const streamType = header[0];
        const size = header.readUInt32BE(4);

        offset += 8;

        if (offset + size > buffer.length) {
            break;
        }

        const content = buffer.slice(offset, offset + size).toString();

        if (streamType === 1) {
            stdout += content;
        } else if (streamType === 2) {
            stderr += content;
        }

        offset += size;
    }

    return { stdout: stdout.trim(), stderr: stderr.trim() };
}

/**
 * Parse memory limit string (e.g., '256m' -> bytes)
 */
function parseMemoryLimit(limit) {
    const match = limit.match(/^(\d+)([kmg]?)$/i);
    if (!match) {
        return 256 * 1024 * 1024; // Default 256MB
    }

    const value = parseInt(match[1], 10);
    const unit = match[2].toLowerCase();

    switch (unit) {
        case 'k':
            return value * 1024;
        case 'm':
            return value * 1024 * 1024;
        case 'g':
            return value * 1024 * 1024 * 1024;
        default:
            return value;
    }
}

/**
 * Get execution command for language
 */
function getExecutionCommand(language) {
    switch (language) {
        case 'javascript':
            return ['node', '/runner/executor.js'];
        case 'python':
            return ['python', '/runner/executor.py'];
        case 'java':
        case 'go':
        case 'csharp':
            return ['/runner/executor.sh'];
        default:
            throw new GradingError(`Unsupported language: ${language}`);
    }
}
