import axios from "axios";
import {refreshAccessToken} from "./refreshToken.js";
import {jwtDecode} from "jwt-decode";

const API_KEY = import.meta.env.VITE_API_END_POINT; // API_KEY

// create axios connection
const axiosInstance = axios.create({
  baseURL: API_KEY,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
axiosInstance.interceptors.request.use(
  async (config) => {
    let token = localStorage.getItem("authToken");
    if (token) {
      const { exp } = jwtDecode(token);
      if (Date.now() >= exp * 1000) {
        // Token expired, attempt to refresh it
        token = await refreshAccessToken();
      }
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
    if (error.response.status === 401 && !originalRequest._retry) {
      originalRequest._retry = true;
      const token = await refreshAccessToken();
      axios.defaults.headers.common['Authorization'] = 'Bearer ' + token;
      return axiosInstance(originalRequest);
    } else if(error.response){
      return error.response
    }
    return Promise.reject(error);
  }
);

export default axiosInstance;
