import axios from 'axios';
import store from '../redux/store';

const API = axios.create({
  baseURL: 'http://localhost:5555/api',
});

API.interceptors.request.use((req) => {
  const token = store.getState().user.token;
  if (token) {
    req.headers.Authorization = `Bearer ${token}`;
  }
  return req;
});

export default API;
