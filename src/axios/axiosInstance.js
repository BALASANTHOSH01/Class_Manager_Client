import axios from 'axios';
import { refreshAccessToken } from '../api/api';

// Create axios instance
const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_END_POINT, // Replace with your API endpoint
  withCredentials: true, // Include cookies in requests
});

// Request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    const token = document.cookie
      .split('; ')
      .find(row => row.startsWith('authToken='))
      ?.split('=')[1];

    if (token) {
      config.headers['Authorization'] = `Bearer ${token}`;
    }

    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  async (error) => {
    const originalRequest = error.config;

    if (error.response) {
      if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        try {
          const token = await refreshAccessToken(); // Refresh token
          axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
          return axiosInstance(originalRequest);
        } catch (refreshError) {
          console.error('Error refreshing token:', refreshError);
          return Promise.reject(refreshError);
        }
      } else {
        return Promise.reject(error.response);
      }
    } else {
      console.error('Error:', error);
      return Promise.reject(error);
    }
  }
);

export default axiosInstance;
