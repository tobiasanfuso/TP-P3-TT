import React, { useState, useEffect, useRef } from "react";
import { Button, Form, Table, Alert } from "react-bootstrap";
import LoadingUsers from "../loadingUsers/LoadingUsers";
const UserManagement = ({ user }) => {
  const [users, setUsers] = useState([]);
  const [reload, setReload] = useState(0);
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    const token = localStorage.getItem("book-champions-token");
    fetch("http://localhost:5000/api/users", {
      headers: { Authorization: `Bearer ${token}` },
    })
      .then((res) => {
        if (!res.ok) throw new Error("Error al cargar usuarios");
        return res.json();
      })
      .then((data) => {
        setUsers(data);
        setLoading(false);
      })
      .catch(() => setMessage("No se pudieron cargar los usuarios"));
  }, [reload]);
  const [formUser, setFormUser] = useState({
    username: "",
    email: "",
    password: "",
    role: "customer",
  });
  const [errors, setErrors] = useState({
    username: "",
    email: "",
    password: "",
    backend: "",
  });
  const usernameRef = useRef(null);
  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const [message, setMessage] = useState(null);

  const handleChange = (e) => {
    setFormUser({ ...formUser, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "", backend: "" });
  };
  const validateForm = () => {
    let valid = true;
    const newErrors = { username: "", email: "", password: "", backend: "" };

    if (!formUser.username) {
      newErrors.username = "El nombre de usuario es obligatorio";
      valid = false;
    } else if (formUser.username.length < 3) {
      newErrors.username = "Debe tener al menos 3 caracteres";
      valid = false;
    } else if (!/^[a-zA-Z0-9_]+$/.test(formUser.username)) {
      newErrors.username = "Solo se permiten letras, números y guiones bajos";
      valid = false;
    }

    if (!formUser.email) {
      newErrors.email = "El email es obligatorio";
      valid = false;
    } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/i.test(formUser.email)) {
      newErrors.email = "Ingrese un email válido";
      valid = false;
    }

    if (!formUser.password) {
      newErrors.password = "La contraseña es obligatoria";
      valid = false;
    } else if (formUser.password.length < 7) {
      newErrors.password = "Debe tener al menos 7 caracteres";
      valid = false;
    }

    setErrors(newErrors);

    if (newErrors.username) usernameRef.current.focus();
    else if (newErrors.email) emailRef.current.focus();
    else if (newErrors.password) passwordRef.current.focus();

    return valid;
  };
  const handleCreate = () => {
    if (!validateForm()) return;
    fetch("http://localhost:5000/api/users", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("book-champions-token")}`,
      },
      body: JSON.stringify(formUser),
    })
      .then((res) => {
        if (!res.ok) return res.json().then((data) => Promise.reject(data));
        return res.json();
      })
      .then(() => {
        setFormUser({
          username: "",
          email: "",
          password: "",
          role: "customer",
        });
        setMessage("Usuario creado correctamente");
        setReload((prev) => prev + 1); // recargar la lista de usuarios
      })
      .catch((err) => {
        setMessage(err.message || "Error al crear usuario");
      });
  };

  const handleDelete = (id) => {
    fetch(`http://localhost:5000/api/users/${id}`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${localStorage.getItem("book-champions-token")}`,
      },
    })
      .then((res) => {
        if (!res.ok) return res.json().then((data) => Promise.reject(data));
        return res.json();
      })
      .then(() => {
        setReload((prev) => prev + 1); // recargar la lista de usuarios
      })
      .catch((err) => {
        setMessage(err.message || "Error al eliminar usuario");
      });
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
            ref={usernameRef}
            isInvalid={errors.username}
          />
          {errors.username && <p className="text-danger">{errors.username}</p>}
          <Form.Control
            name="email"
            type="email"
            placeholder="Email"
            value={formUser.email}
            onChange={handleChange}
            ref={emailRef}
            isInvalid={errors.email}
          />
          {errors.email && <p className="text-danger">{errors.email}</p>}
          <Form.Control
            name="password"
            type="password"
            placeholder="Contraseña"
            value={formUser.password}
            onChange={handleChange}
            ref={passwordRef}
            isInvalid={errors.password}
          />
          {errors.password && <p className="text-danger">{errors.password}</p>}
          <Form.Select
            name="role"
            value={formUser.role}
            onChange={handleChange}
          >
            <option value="customer">customer</option>
            <option value="admin">admin</option>
            <option value="sysadmin">sysadmin</option>
          </Form.Select>
          <Button variant="success" onClick={handleCreate}>
            Agregar
          </Button>
        </Form>
      )}
      {loading ? (
        <LoadingUsers role={user.role} />
      ) : (
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
      )}
    </div>
  );
};

export default UserManagement;
