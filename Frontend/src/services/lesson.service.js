import api from './api';

export const lessonService = {
  async getLessonsByLanguage(language) {
    return api.get(`/lessons/${language}`);
  },

  async getCurrentLesson(language) {
    return api.get(`/lessons/${language}/current`);
  },

  async getLesson(language, day) {
    return api.get(`/lessons/${language}/${day}`);
  }
};

