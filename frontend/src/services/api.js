import axios from 'axios';

const api = axios.create({
  baseURL: '/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const authAPI = {
  login: (phone, password) => api.post('/auth/login', { phone, password }),
  verify: (name, idCard) => api.post('/user/verify', { name, idCard }),
};

export const itemAPI = {
  getAll: () => api.get('/items'),
  create: (data) => api.post('/items', data),
};

export const skillAPI = {
  getAll: () => api.get('/skills'),
  getNearby: (lat, lng) => api.get(`/skills/nearby?lat=${lat}&lng=${lng}`),
  create: (data) => api.post('/skills', data),
};

export const announcementAPI = {
  getAll: () => api.get('/announcements'),
  create: (data) => api.post('/announcements', data),
};

export default api;
