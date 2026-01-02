import config from '../config/index.js';
import { runWithDocker } from './docker.runner.js';
import { runWithJudge0 } from './judge0.runner.js';
import { runWithMock } from './mock.runner.js';
import logger from '../utils/logger.js';

/**
 * Run code with appropriate runner based on configuration
 */
export async function runCode(language, code, tests, operation = 'test') {
    const mode = config.runner.mode;

    logger.debug(`Running code with ${mode} runner for ${language} (operation: ${operation})`);

    switch (mode) {
        case 'docker':
            return runWithDocker(language, code, tests, operation);
        case 'judge0':
            return runWithJudge0(language, code, tests); // Judge0 doesn't support 'lint' easily here
        case 'mock':
        default:
            return runWithMock(language, code, tests, operation);
    }
}

export { runWithDocker } from './docker.runner.js';
export { runWithJudge0 } from './judge0.runner.js';
export { runWithMock } from './mock.runner.js';
