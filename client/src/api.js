import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5000/api'
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem('token');
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Response interceptor to handle 401 Unauthorized globally
api.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response && error.response.status === 401) {
      console.warn('Unauthorized request - logging out...');
      localStorage.removeItem('token');
      localStorage.removeItem('user');
      // Redirect to login or reload page
      window.location.href = '/auth';
    }
    return Promise.reject(error);
  }
);

export default api;
