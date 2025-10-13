import React from "react";
import UserManagement from "../../UserManagement/UserManagement";

const AdminPanel = ({ user }) => {
  return (
    <div className="container mt-4">
      <h2>Panel de Control ({user.role})</h2>
      <p>Bienvenido, {user?.username}</p>
      <UserManagement user={user} />
    </div>
  );
};

export default AdminPanel;
