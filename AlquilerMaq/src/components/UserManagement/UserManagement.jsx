import React, { useEffect, useState } from "react";

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [editingUser, setEditingUser] = useState(null);
  const [formData, setFormData] = useState({
    username: "",
    email: "",
    role: "",
  });

  // Cargar usuarios
  useEffect(() => {
    fetch("http://localhost:3000/api/users", {
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    })
      .then((res) => res.json())
      .then(setUsers)
      .catch(console.error);
  }, []);

  // Eliminar usuario
  const handleDelete = async (id) => {
    await fetch(`http://localhost:3000/api/users/${id}`, {
      method: "DELETE",
      headers: {
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
    });
    setUsers(users.filter((u) => u.id !== id));
  };

  // Editar usuario
  const handleEditClick = (u) => {
    setEditingUser(u);
    setFormData({ username: u.username, email: u.email, role: u.role });
  };

  const handleEditSubmit = async (e) => {
    e.preventDefault();
    await fetch(`http://localhost:3000/api/users/${editingUser.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("token")}`,
      },
      body: JSON.stringify(formData),
    });

    setEditingUser(null);
    const updated = await fetch("http://localhost:3000/api/users", {
      headers: { Authorization: `Bearer ${localStorage.getItem("token")}` },
    }).then((res) => res.json());
    setUsers(updated);
  };

  return (
    <div className="container mt-3">
      <h3>Gestión de Usuarios</h3>

      <table className="table table-striped">
        <thead>
          <tr>
            <th>ID</th>
            <th>Usuario</th>
            <th>Email</th>
            <th>Rol</th>
            <th>Acciones</th>
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id}>
              <td>{u.id}</td>
              <td>{u.username}</td>
              <td>{u.email}</td>
              <td>{u.role}</td>
              <td>
                <button
                  className="btn btn-warning btn-sm"
                  onClick={() => handleEditClick(u)}
                >
                  Editar
                </button>
                <button
                  className="btn btn-danger btn-sm ms-2"
                  onClick={() => handleDelete(u.id)}
                >
                  Eliminar
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {editingUser && (
        <div className="card p-3 mt-3">
          <h5>Editar usuario: {editingUser.username}</h5>
          <form onSubmit={handleEditSubmit}>
            <input
              className="form-control mb-2"
              placeholder="Nombre de usuario"
              value={formData.username}
              onChange={(e) =>
                setFormData({ ...formData, username: e.target.value })
              }
            />
            <input
              className="form-control mb-2"
              placeholder="Correo electrónico"
              value={formData.email}
              onChange={(e) =>
                setFormData({ ...formData, email: e.target.value })
              }
            />
            <select
              className="form-select mb-2"
              value={formData.role}
              onChange={(e) =>
                setFormData({ ...formData, role: e.target.value })
              }
            >
              <option value="customer">Customer</option>
              <option value="admin">Admin</option>
              <option value="sysadmin">Sysadmin</option>
            </select>

            <button className="btn btn-success me-2" type="submit">
              Guardar cambios
            </button>
            <button
              className="btn btn-secondary"
              onClick={() => setEditingUser(null)}
              type="button"
            >
              Cancelar
            </button>
          </form>
        </div>
      )}
    </div>
  );
};

export default UserManagement;
