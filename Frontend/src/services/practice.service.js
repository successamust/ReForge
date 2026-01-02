import api from './api';

export const practiceService = {
    /**
     * Verify code syntax for practice mode
     * @param {string} language - The programming language
     * @param {string} code - The code to verify
     * @returns {Promise} - The verification result
     */
    verifySyntax: async (language, code) => {
        const response = await api.post('/practice/verify', { language, code });
        return response.data;
    }
};
