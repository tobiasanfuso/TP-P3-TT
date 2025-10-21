import { Navigate, Outlet } from "react-router-dom";
import { useContext } from "react";
import { AuthenticationContext } from "../service/auth/auth.context";
import { isTokenValid } from "../auth/auth.services";
const ProtectedRoute = () => {
  const { token } = useContext(AuthenticationContext);
  if (!isTokenValid(token)) {
    return <Navigate to="/login" replace />;
  }
  return <Outlet />;
};
export default ProtectedRoute;
