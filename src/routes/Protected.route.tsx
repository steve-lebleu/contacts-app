import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../features/auth/Auth.context";

export const ProtectedRoute = ({ roles }: { roles: string[] }) => {
  const { token, user } = useAuth();
  const location = useLocation();

  if (!token) {
    return <Navigate to="/" state={{ from: location }} replace />;
  }

  if (roles.length > 0 && user && !roles.includes(user.role)) {
    return <Navigate to="/error/forbidden" state={{ from: location }} replace />;
  }

  return <Outlet />;
};