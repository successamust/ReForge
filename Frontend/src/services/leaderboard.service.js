import api from './api';

export const leaderboardService = {
  async getLeaderboard(language = null, limit = 100) {
    const params = new URLSearchParams();
    if (language) params.append('language', language);
    if (limit) params.append('limit', limit);
    const queryString = params.toString();
    return api.get(`/leaderboard${queryString ? `?${queryString}` : ''}`);
  }
};

