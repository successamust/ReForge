import config from '../config/index.js';
import { runWithDocker } from './docker.runner.js';
import { runWithJudge0 } from './judge0.runner.js';
import { runWithMock } from './mock.runner.js';
import logger from '../utils/logger.js';

/**
 * Run code with appropriate runner based on configuration
 */
export async function runCode(language, code, tests) {
    const mode = config.runner.mode;

    logger.debug(`Running code with ${mode} runner for ${language}`);

    switch (mode) {
        case 'docker':
            return runWithDocker(language, code, tests);
        case 'judge0':
            return runWithJudge0(language, code, tests);
        case 'mock':
        default:
            return runWithMock(language, code, tests);
    }
}

export { runWithDocker } from './docker.runner.js';
export { runWithJudge0 } from './judge0.runner.js';
export { runWithMock } from './mock.runner.js';
