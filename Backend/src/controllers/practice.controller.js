import { runCode } from '../runners/index.js';

/**
 * Verify code syntax for practice mode
 */
export async function verifySyntax(req, res, next) {
    try {
        const { language, code } = req.body;

        const result = await runCode(language, code, [], 'lint');

        res.json({
            success: true,
            data: { result },
        });
    } catch (error) {
        next(error);
    }
}
