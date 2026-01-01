import api from './api';

export const submissionService = {
  async submitCode(language, day, code) {
    return api.post('/submissions', { language, day, code });
  },

  async getSubmission(id) {
    return api.get(`/submissions/${id}`);
  }
};

