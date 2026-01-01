import api from './api';

export const progressService = {
  async getAllProgress() {
    return api.get('/progress');
  },

  async getProgressByLanguage(language) {
    return api.get(`/progress/${language}`);
  },

  async getAchievements() {
    return api.get('/progress/achievements');
  },

  async generateCertificate(language) {
    return api.post(`/progress/${language}/certificate/generate`);
  }
};

