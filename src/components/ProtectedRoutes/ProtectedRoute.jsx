import { useSelector } from "react-redux";
import { Navigate } from "react-router-dom";

const ProtectedRoute = ({ element }) => {

    const isAuthenticated = useSelector((state) => state.user.isAuthenticate);
    return isAuthenticated ? element : <Navigate to="/auth/login" />;
  };

export default ProtectedRoute;