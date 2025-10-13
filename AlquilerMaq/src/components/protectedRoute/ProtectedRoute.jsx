import { Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import { AuthenticationContext } from "../service/auth/auth.context";

const ProtectedRoute = () => {
  const { user } = useContext(AuthenticationContext);
  if (!user) {
    return <Navigate to="/login" replace />;
  }
  return <Outlet />;
};
export default ProtectedRoute;
