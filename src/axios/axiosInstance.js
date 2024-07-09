import axios from "axios";

const API_KEY = import.meta.env.VITE_API_END_POINT;

const axiosInstance = axios.create({
  baseURL: API_KEY,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
axiosInstance.interceptors.request.use(
  (config) => {
    // You can modify the request configuration here if needed
    return config;
  },
  (error) => {
    // Handle request error here
    return Promise.reject(error);
  }
);

// Response interceptor
axiosInstance.interceptors.response.use(
  (response) => {
    // Handle the response data here if needed
    return response;
  },
  (error) => {
    // Handle response error here
    return Promise.reject(error);
  }
);

export default axiosInstance;
