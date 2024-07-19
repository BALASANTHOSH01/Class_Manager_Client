import axios from 'axios';

const API_KEY = import.meta.env.VITE_API_END_POINT;

export const refreshAccessToken = async () => {
  try {
    const response = await axios.post(`${API_KEY}/api/token/refresh-token`, {}, { withCredentials: true });
    const { accessToken } = response.data;
    document.cookie = `authToken=${accessToken}; path=/;`;
    return accessToken;
  } catch (error) {
    console.error('Error refreshing access token:', error);
    throw error;
  }
};
