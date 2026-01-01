import api from './api';

export const progressService = {
  async getAllProgress() {
    return api.get('/progress');
  },

  async getProgressByLanguage(language) {
    return api.get(`/progress/${language}`);
  }
};

