import api from './api';

export const leaderboardService = {
  getLeaderboard(language = null, limit = 100, offset = 0) {
    const params = new URLSearchParams();
    if (language) params.append('language', language);
    if (limit) params.append('limit', limit);
    if (offset) params.append('offset', offset);
    const queryString = params.toString();
    return api.get(`/leaderboard${queryString ? `?${queryString}` : ''}`);
  },

  getMyRank(language = null) {
    const params = new URLSearchParams();
    if (language) params.append('language', language);
    const queryString = params.toString();
    return api.get(`/leaderboard/me${queryString ? `?${queryString}` : ''}`);
  }
};

