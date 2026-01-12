import api from './api';

export const adminService = {
    async getSystemStats() {
        return api.get('/admin/dashboard');
    },

    async getUsers(page = 1, limit = 20, email = '') {
        const params = new URLSearchParams({ page, limit });
        if (email) params.append('email', email);
        return api.get(`/admin/users?${params.toString()}`);
    },

    async getUser(id) {
        return api.get(`/admin/users/${id}`);
    },

    async updateUser(id, updates) {
        return api.put(`/admin/users/${id}`, updates);
    },

    async updateUserTier(id, tier, expiresAt) {
        return api.put(`/admin/users/${id}/tier`, { tier, expiresAt });
    },

    async getAuditLogs(params = {}) {
        const query = new URLSearchParams(params).toString();
        return api.get(`/admin/audit-logs?${query}`);
    },

    async createLesson(lessonData) {
        return api.post('/admin/lessons', lessonData);
    },

    async updateLesson(language, day, updates) {
        return api.put(`/admin/lessons/${language}/${day}`, updates);
    },

    async deleteLesson(language, day) {
        return api.delete(`/admin/lessons/${language}/${day}`);
    },

    async getSubmissionCode(id) {
        return api.get(`/admin/submissions/${id}/code`);
    },

    async resetArenaLockout(id) {
        return api.put(`/admin/users/${id}/reset-lockout`);
    }
};
