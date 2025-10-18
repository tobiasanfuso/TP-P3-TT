import React, { useContext } from "react";
import RequestsList from "../requestsList/RequestsList";
import { AuthenticationContext } from "../service/auth/auth.context";

const HistoryRequests = () => {
  const { user } = useContext(AuthenticationContext);
  const endpoint =
    user.role === "customer"
      ? "http://localhost:5000/api/solicitudes/historial-solicitudes"
      : "http://localhost:5000/api/solicitudes/historial-solicitudes-admin";

  return (
    <RequestsList
      title="Historial de Solicitudes"
      apiEndpoint={endpoint}
      allowEdit={user.role === "admin" || user.role === "sysadmin"}
    />
  );
};

export default HistoryRequests;
