import axios from "axios";

const API_KEY = import.meta.env.VITE_API_END_POINT; // API_KEY

// Function to refresh access token
export const refreshAccessToken = async () => {
  try {
    const token = localStorage.getItem("authToken");
    const response = await axios.post(`${API_KEY}/api/token/refresh-token`, {
      token: token,
    });
    const { accessToken } = response.data;
    localStorage.setItem("New Token :", accessToken);
    return accessToken;
  } catch (error) {
    console.error("Error refreshing access token:", error);
    // Handle token refresh failure (e.g., redirect to login)
    return null;
  }
};
