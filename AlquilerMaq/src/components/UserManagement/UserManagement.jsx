import React, { useEffect, useState } from "react";
import { Button, Form, Table, Alert, Spinner } from "react-bootstrap";

const UserManagement = () => {
  const [users, setUsers] = useState([]);
  const [formUser, setFormUser] = useState({
    username: "",
    email: "",
    password: "",
    role: "customer",
  });
  const [loading, setLoading] = useState(false);
  const [message, setMessage] = useState(null);

  const token = localStorage.getItem("token");

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const res = await fetch("http://localhost:5000/api/users", {
        headers: { Authorization: `Bearer ${token}` },
      });
      const data = await res.json();
      setUsers(data);
    } catch (err) {
      console.error("Error al obtener los usuarios:", err);
      setMessage("Error al obtener los usuarios");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchUsers();
  }, []);

  const handleChange = (e) => {
    setFormUser({ ...formUser, [e.target.name]: e.target.value });
  };

  const handleCreate = async () => {
    if (!formUser.username || !formUser.email || !formUser.password) {
      return setMessage("Todos los campos son obligatorios");
    }

    try {
      const res = await fetch("http://localhost:5000/api/users", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify(formUser),
      });

      const result = await res.json();
      if (res.ok) {
        setMessage("Usuario creado correctamente");
        setFormUser({
          username: "",
          email: "",
          password: "",
          role: "customer",
        });
        fetchUsers();
      } else {
        setMessage(result.message || "Error al crear usuario");
      }
    } catch (err) {
      console.error("Error de red al crear el usuario:", err);
      setMessage("Error de red al crear usuario");
    }
  };

  const handleDelete = async (id) => {
    if (!window.confirm("¿Seguro que deseas eliminar este usuario?")) return;

    try {
      const res = await fetch(`http://localhost:5000/api/users/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });

      const result = await res.json();

      if (res.ok) {
        setMessage("Usuario eliminado");
        fetchUsers();
      } else {
        setMessage(result.message || "Error al eliminar usuario");
      }
    } catch (err) {
      console.error("Error de red al eliminar el usuario:", err);
      setMessage("Error de red al eliminar usuario");
    } 
  };

  return (
    <div>
      <h4 className="mt-4">Gestión de Usuarios</h4>

      {message && <Alert variant="info">{message}</Alert>}

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
        <Form.Select name="role" value={formUser.role} onChange={handleChange}>
          <option value="customer">customer</option>
          <option value="admin">admin</option>
        </Form.Select>
        <Button variant="success" onClick={handleCreate}>
          Agregar
        </Button>
      </Form>

      {loading ? (
        <Spinner animation="border" />
      ) : (
        <Table striped bordered hover>
          <thead>
            <tr>
              <th>Usuario</th>
              <th>Email</th>
              <th>Rol</th>
              <th>Acción</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u) => (
              <tr key={u.id}>
                <td>{u.username}</td>
                <td>{u.email}</td>
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
              </tr>
            ))}
          </tbody>
        </Table>
      )}
    </div>
  );
};

export default UserManagement;