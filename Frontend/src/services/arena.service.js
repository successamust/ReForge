import api from './api';

const arenaService = {
    /**
     * Start a new Arena session
     */
    startSession: async (language) => {
        return api.post('/arena/start', { language });
    },

    /**
     * Submit code for the current Arena level
     */
    submitCode: async (sessionId, code) => {
        return api.post('/arena/submit', { sessionId, code });
    },

    /**
     * Get active Arena session status
     */
    getStatus: async () => {
        return api.get('/arena/status');
    },

    /**
     * Explicitly fail an Arena session
     */
    failSession: async (sessionId, reason = 'timeout') => {
        return api.post('/arena/fail', { sessionId, reason });
    },

    /**
     * Get lockout status for all languages
     */
    getLockouts: async () => {
        return api.get('/arena/lockouts');
    }
};

export default arenaService;
