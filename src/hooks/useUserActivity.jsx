import { useState, useEffect } from 'react';

const useUserActivity = () => {
  const [isActive, setIsActive] = useState(true);

  useEffect(() => {
    const handleActivity = () => setIsActive(true);

    window.addEventListener('mousemove', handleActivity);
    window.addEventListener('keydown', handleActivity);

    const activityInterval = setInterval(() => {
      setIsActive(false);
    }, 60000); // Check every minute

    return () => {
      window.removeEventListener('mousemove', handleActivity);
      window.removeEventListener('keydown', handleActivity);
      clearInterval(activityInterval);
    };
  }, []);

  return isActive;
};

export default useUserActivity;
