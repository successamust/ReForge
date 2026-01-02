import api from './api';

export const authService = {
  async register(email, password, firstName, lastName, timezone = Intl.DateTimeFormat().resolvedOptions().timeZone) {
    return api.post('/auth/register', { email, password, firstName, lastName, timezone });
  },

  async login(email, password) {
    const response = await api.post('/auth/login', { email, password });
    // API interceptor returns response.data, so response is already { success, data }
    const loginData = response?.data || response;
    if (loginData?.token) {
      localStorage.setItem('token', loginData.token);
      localStorage.setItem('user', JSON.stringify(loginData.user));
    }
    return response;
  },

  async logout() {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  },

  async getProfile() {
    return api.get('/auth/profile');
  },

  async updateProfile(data) {
    return api.put('/auth/profile', data);
  },

  async verifyEmail(token) {
    return api.post('/auth/verify-email', { token });
  },

  async resendVerification(email) {
    return api.post('/auth/resend-verification', { email });
  },

  async forgotPassword(email) {
    return api.post('/auth/forgot-password', { email });
  },

  async resetPassword(token, password) {
    return api.post('/auth/reset-password', { token, password });
  },

  getCurrentUser() {
    const userStr = localStorage.getItem('user');
    return userStr ? JSON.parse(userStr) : null;
  },

  isAuthenticated() {
    return !!localStorage.getItem('token');
  },

  // OAuth methods
  getGoogleAuthUrl() {
    const baseURL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3088/v1';
    return `${baseURL}/auth/google`;
  },

  getGithubAuthUrl() {
    const baseURL = import.meta.env.VITE_API_BASE_URL || 'http://localhost:3088/v1';
    return `${baseURL}/auth/github`;
  },

  handleOAuthCallback(token) {
    if (token) {
      localStorage.setItem('token', token);
      // Fetch user profile after OAuth login
      return this.getProfile().then(response => {
        // API interceptor returns response.data, so response is already { success, data }
        const profileData = response?.data || response;
        const userData = profileData?.user || profileData;
        if (userData) {
          localStorage.setItem('user', JSON.stringify(userData));
        }
        return { data: { user: userData } };
      });
    }
  }
};
