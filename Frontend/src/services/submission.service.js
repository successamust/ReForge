import api from './api';

export const submissionService = {
  async submitCode(language, day, code) {
    return api.post('/submissions', { language, day, code });
  },

  async getSubmission(id) {
    return api.get(`/submissions/${id}`);
  },

  async getHistory(language, day = null, limit = 10) {
    const params = new URLSearchParams({ limit });
    if (day) params.append('day', day);
    return api.get(`/submissions/history/${language}?${params.toString()}`);
  }
};

