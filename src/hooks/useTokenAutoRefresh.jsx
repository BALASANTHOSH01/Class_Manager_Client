import { useEffect } from 'react';
import { useDispatch } from 'react-redux';
import { logout, setCurrentUser } from "../features/user/userSlice";
import { refreshAccessToken } from '../api/api';
import useUserActivity from './useUserActivity';
import { isTokenExpired } from '../utils/isTokenExpired';

const useTokenAutoRefresh = () => {
  const dispatch = useDispatch();
  const isActive = useUserActivity();

  useEffect(() => {
    const refreshToken = async () => {
      const authToken = localStorage.getItem('authToken');
      if (isTokenExpired(authToken)) {
        if (isActive) {
          const newToken = await refreshAccessToken();
          if (newToken) {
            const payload = JSON.parse(atob(newToken.split('.')[1])); // assuming user info is in token payload
            dispatch(setCurrentUser({
              userData: payload.user,
              userId: payload.userId,
              userType: payload.userType,
            }));
            localStorage.setItem('authToken', newToken);
          } else {
            dispatch(logout());
          }
        } else {
          dispatch(logout());
        }
      }
    };

    const interval = setInterval(refreshToken, 5 * 60 * 1000); // Refresh every 5 minutes

    return () => clearInterval(interval);
  }, [dispatch, isActive]);
};

export default useTokenAutoRefresh;
