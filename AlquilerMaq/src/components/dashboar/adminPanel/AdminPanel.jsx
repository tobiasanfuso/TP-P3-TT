import React from "react";
import UserManagement from "../../UserManagement/UserManagement";

const AdminPanel = ({ user }) => {
  return (
    <div className="container mt-4">
      <h2>Panel de Control del SysAdmin</h2>
      <p>Bienvenido, {user?.username}</p>
      <UserManagement />
    </div>
  );
};

export default AdminPanel;
