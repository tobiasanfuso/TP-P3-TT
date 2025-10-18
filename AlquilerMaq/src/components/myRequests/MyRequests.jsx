import React, { useContext } from "react";
import RequestsList from "../requestsList/RequestsList";
import { AuthenticationContext } from "../service/auth/auth.context";

const MyRequests = () => {
  const { user } = useContext(AuthenticationContext);
  const endpoint =
    user.role === "customer"
      ? "http://localhost:5000/api/solicitudes/mis-solicitudes"
      : "http://localhost:5000/api/solicitudes";

  return (
    <RequestsList
      title="Mis Solicitudes"
      apiEndpoint={endpoint}
      allowEdit={user.role === "admin" || user.role === "sysadmin"}
    />
  );
};

export default MyRequests;
