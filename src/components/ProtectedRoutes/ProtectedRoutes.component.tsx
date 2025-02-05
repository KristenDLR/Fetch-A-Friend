import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../../context/AuthContext";

const ProtectedRoute = () => {
  const { isAuthenticated } = useAuth();
  const location = useLocation();

  if (isAuthenticated && location.pathname === "/") {
    return <Navigate to="/search" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
