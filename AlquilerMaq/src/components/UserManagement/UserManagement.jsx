import React, { useState } from "react";
import { Button, Form, Table, Alert } from "react-bootstrap";

const initialUsers = [
  { id: 1, username: "admin", email: "admin@alquimaq.com", role: "admin" },
  {
    id: 2,
    username: "sysadmin",
    email: "sysadmin@alquimaq.com",
    role: "sysadmin",
  },
  { id: 3, username: "cliente1", email: "cliente1@mail.com", role: "customer" },
];

const UserManagement = ({ user }) => {
  const [users, setUsers] = useState(initialUsers);
  const [formUser, setFormUser] = useState({
    username: "",
    email: "",
    password: "",
    role: "customer",
  });
  const [message, setMessage] = useState(null);

  const handleChange = (e) => {
    setFormUser({ ...formUser, [e.target.name]: e.target.value });
  };

  const handleCreate = () => {
    if (!formUser.username || !formUser.email || !formUser.password) {
      setMessage("Todos los campos son obligatorios");
      return;
    }
    const newUser = {
      id: users.length ? users[users.length - 1].id + 1 : 1,
      username: formUser.username,
      email: formUser.email,
      role: formUser.role,
    };
    setUsers([...users, newUser]);
    setMessage("Usuario creado correctamente");
    setFormUser({
      username: "",
      email: "",
      password: "",
      role: "customer",
    });
  };

  const handleDelete = (id) => {
    if (!window.confirm("¿Seguro que deseas eliminar este usuario?")) return;
    setUsers(users.filter((u) => u.id !== id));
    setMessage("Usuario eliminado");
  };

  return (
    <div>
      <h4 className="mt-4">Gestión de Usuarios</h4>
      {message && <Alert variant="info">{message}</Alert>}
      {user.role === "sysadmin" && (
        <Form className="d-flex flex-wrap gap-2 mb-3">
          <Form.Control
            name="username"
            placeholder="Usuario"
            value={formUser.username}
            onChange={handleChange}
          />
          <Form.Control
            name="email"
            type="email"
            placeholder="Email"
            value={formUser.email}
            onChange={handleChange}
          />
          <Form.Control
            name="password"
            type="password"
            placeholder="Contraseña"
            value={formUser.password}
            onChange={handleChange}
          />
          <Form.Select
            name="role"
            value={formUser.role}
            onChange={handleChange}
          >
            <option value="customer">customer</option>
            <option value="admin">admin</option>
          </Form.Select>
          <Button variant="success" onClick={handleCreate}>
            Agregar
          </Button>
        </Form>
      )}
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>Usuario</th>
            <th>Email</th>
            {user.role === "sysadmin" && (
              <>
                <th>Rol</th>
                <th>Acción</th>
              </>
            )}
          </tr>
        </thead>
        <tbody>
          {users.map((u) => (
            <tr key={u.id}>
              <td>{u.username}</td>
              <td>{u.email}</td>
              {user.role === "sysadmin" && (
                <>
                  <td>{u.role}</td>
                  <td>
                    <Button
                      variant="danger"
                      size="sm"
                      onClick={() => handleDelete(u.id)}
                    >
                      Eliminar
                    </Button>
                  </td>
                </>
              )}
            </tr>
          ))}
        </tbody>
      </Table>
    </div>
  );
};

export default UserManagement;
