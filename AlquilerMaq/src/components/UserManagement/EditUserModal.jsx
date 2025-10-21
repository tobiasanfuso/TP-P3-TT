import React, { useEffect, useState, useRef } from "react";
import { Modal, Button, Form } from "react-bootstrap";
import { validateUpdateUser } from "../utils/validation"; // tu función de validación

const EditUserModal = ({ show, userData, onClose, onSave }) => {
  const [form, setForm] = useState({
    id: null,
    username: "",
    email: "",
    role: "customer",
  });
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState({}); // solo mensajes de error

  const usernameRef = useRef(null);
  const emailRef = useRef(null);

  useEffect(() => {
    if (userData) {
      setForm({
        id: userData.id,
        username: userData.username || "",
        email: userData.email || "",
        role: userData.role || "customer",
      });
    } else {
      setForm({ id: null, username: "", email: "", role: "customer" });
    }
    setErrors({});
  }, [userData]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setErrors({ ...errors, [e.target.name]: "" });
  };

  const handleSave = async () => {
    const validationErrors = validateUpdateUser(form);
    setErrors(validationErrors);

    if (validationErrors.username) usernameRef.current.focus();
    else if (validationErrors.email) emailRef.current.focus();

    if (Object.keys(validationErrors).length > 0) return;

    setSaving(true);
    try {
      await onSave(form);
    } catch (err) {
      console.error(err);
    } finally {
      setSaving(false);
    }
  };

  return (
    <Modal show={show} onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Editar Usuario</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Nombre de Usuario</Form.Label>
            <Form.Control
              name="username"
              value={form.username}
              onChange={handleChange}
              ref={usernameRef}
              isInvalid={errors.username}
            />
            <Form.Control.Feedback type="invalid">
              {errors.username}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              name="email"
              type="email"
              value={form.email}
              onChange={handleChange}
              ref={emailRef}
              isInvalid={errors.email}
            />
            <Form.Control.Feedback type="invalid">
              {errors.email}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Rol</Form.Label>
            <Form.Select name="role" value={form.role} onChange={handleChange}>
              <option value="customer">Cliente</option>
              <option value="admin">Administrador</option>
              <option value="sysadmin">SysAdmin</option>
            </Form.Select>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose} disabled={saving}>
          Cancelar
        </Button>
        <Button variant="primary" onClick={handleSave} disabled={saving}>
          {saving ? "Guardando..." : "Guardar Cambios"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditUserModal;
