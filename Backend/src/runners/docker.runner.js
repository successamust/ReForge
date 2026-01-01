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
export async function runWithDocker(language, code, tests) {
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
                AutoRemove: true,
                ReadonlyRootfs: true,
                SecurityOpt: ['no-new-privileges'],
            },
            Tty: false,
            OpenStdin: false,
        });

        // Start container
        await container.start();

        // Wait for container with timeout
        const timeout = config.runner.timeout;
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
            const parsed = JSON.parse(output.stdout);
            parsed.executionTimeMs = Date.now() - startTime;
            return parsed;
        } catch (parseError) {
            logger.error('Failed to parse container output:', output);
            throw new GradingError('Invalid runner output');
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
