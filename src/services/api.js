import axios from 'axios';

const API = axios.create({
  baseURL: 'http://localhost:5555/api',
});

API.interceptors.request.use((config) => {
  const token = localStorage.getItem('accessToken');

  // 🛡 Məhsul siyahısı istəklərinə token göndərmə
  if (token && !(config.method === 'get' && config.url.includes('/products'))) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});


export default API;
