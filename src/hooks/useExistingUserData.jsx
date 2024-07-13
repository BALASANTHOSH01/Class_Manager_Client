import { useSelector } from "react-redux";

const useExistingUserData = () => {
  const existingUser = useSelector((state) => state.user.currentUser);
  const existingUserType = useSelector((state) => state.user.currentUserType);
  const existingUserID = useSelector((state) => state.user.currentUserId);
  const isAuthenticate = useSelector((state) => state.user.isAuthenticate);

  return {
    existingUser,
    existingUserType,
    existingUserID,
    isAuthenticate
  };
};

export default useExistingUserData;
