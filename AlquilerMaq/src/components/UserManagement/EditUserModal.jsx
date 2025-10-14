import React, { useEffect, useState } from "react";
import { Modal, Button, Form } from "react-bootstrap";

const EditUserModal = ({ show, userData, onClose, onSave }) => {
  const [form, setForm] = useState({
    id: null,
    username: "",
    email: "",
    role: "",
  });
  const [saving, setSaving] = useState(false);

  useEffect(() => {
    if (userData)
      setForm({
        id: userData.id,
        username: userData.username || "",
        email: userData.email || "",
        role: userData.role || "customer",
      });
    else setForm({ id: null, username: "", email: "", role: "" });
  }, [userData]);

  const handleChange = (e) =>
    setForm({ ...form, [e.target.name]: e.target.value });

  const handleSave = async () => {
    // validaciones básicas
    if (!form.username.trim() || !form.email.trim()) {
      alert("Nombre de usuario y email son obligatorios");
      return;
    }
    setSaving(true);
    try {
      await onSave(form); // el onSave del padre hace el fetch PUT y refresca lista
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
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Email</Form.Label>
            <Form.Control
              name="email"
              value={form.email}
              onChange={handleChange}
            />
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
