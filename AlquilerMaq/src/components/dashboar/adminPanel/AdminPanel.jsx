import React from "react";
import UserManagement from "../../UserManagement/UserManagement";
import { useContext } from "react";
import { AuthenticationContext } from "../../service/auth/auth.context";
import "./adminPanel.css"
const AdminPanel = () => {
  const { user } = useContext(AuthenticationContext);
  return (
    <div className="admin-panel container">
      <h2>Panel de Control ({user.role})</h2>
      <p>Bienvenido, {user?.username}</p>
      
      <div className="admin-inner">
      <UserManagement user={user} />
      </div>
    </div>
  );
};

export default AdminPanel;
