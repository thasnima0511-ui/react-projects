import axios from 'axios';

const instance = axios.create({
  baseURL: 'http://localhost:3000/Login/',
  headers: {
    'Content-Type': 'application/json'
  }
});
instance.interceptors.request.use((config) => {
  const token = localStorage.getItem('token'); // Add tokenb
  if (token) {
    if (!config.headers) {
      config.headers = {} as typeof config.headers;
    }
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default instance;
