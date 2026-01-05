import api from './api';

export const submissionService = {
  async submitCode(language, day, code, telemetry = null) {
    return api.post('/submissions', { language, day, code, telemetry });
  },

  async getSubmission(id) {
    return api.get(`/submissions/${id}`);
  },

  async getHistory(language, day = null, limit = 10) {
    const params = new URLSearchParams({ limit });
    if (day) params.append('day', day);
    return api.get(`/submissions/history/${language}?${params.toString()}`);
  },

  async runCode(language, day, code) {
    return api.post('/submissions/run', { language, day, code });
  }
};

