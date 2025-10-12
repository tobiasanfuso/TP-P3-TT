import React from "react";
import UserManagement from "../../UserManagement/UserManagement";
import { useContext } from "react";
import { AuthenticationContext } from "../../service/auth/auth.context";
const AdminPanel = () => {
  const { user } = useContext(AuthenticationContext);
  return (
    <div className="container mt-4">
      <h2>Panel de Control {user.role}</h2>
      <p>Bienvenido, {user?.username}</p>
      <UserManagement user={user} />
    </div>
  );
};

export default AdminPanel;
