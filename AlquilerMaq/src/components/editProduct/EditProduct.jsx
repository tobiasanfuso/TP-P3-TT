import React, { useState, useEffect, useRef } from "react";
import { Modal, Button, Form, Spinner, Alert } from "react-bootstrap";
import { validateProduct } from "../utils/validateProduct";

const EditProduct = ({ show, product, onSave, onClose }) => {
  const [form, setForm] = useState({
    title: "",
    brand: "",
    description: "",
    imagen: "",
    priceDay: "",
  });

  const [errors, setErrors] = useState({});

  // Refs para los campos (para enfocar en el primero con error)
  const nombreRef = useRef(null);
  const marcaRef = useRef(null);
  const descripcionRef = useRef(null);
  const precioRef = useRef(null);
  const imagenRef = useRef(null);

  // Cargar datos actuales al abrir el modal
  useEffect(() => {
    if (product) {
      setForm({
        title: product.title || "",
        brand: product.brand || "",
        description: product.description || "",
        imagen: product.image || "",
        priceDay: product.priceDay || "",
      });
    }
  }, [product]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const validate = () => {
    const validationErrors = validateProduct({
      nombre: form.title,
      marca: form.brand,
      descripcion: form.description,
      imagen: form.imagen,
      precioPorDia: form.priceDay,
    });
    setErrors(validationErrors);

    const firstError = Object.keys(validationErrors)[0];
    if (firstError) {
      if (firstError === "nombre") nombreRef.current.focus();
      else if (firstError === "marca") marcaRef.current.focus();
      else if (firstError === "descripcion") descripcionRef.current.focus();
      else if (firstError === "precioPorDia") precioRef.current.focus();
      else if (firstError === "imagen") imagenRef.current.focus();
      return false;
    }
    return true;
  };

  const handleSubmit = async () => {
    if (!validate()) return;
    onSave({ ...product, ...form });
  };

  const handleCloseAndReset = () => {
    setErrors({});
    onClose();
  };

  return (
    <Modal show={show} onHide={handleCloseAndReset} centered>
      <Modal.Header closeButton>
        <Modal.Title>Editar Máquina</Modal.Title>
      </Modal.Header>

      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Nombre</Form.Label>
            <Form.Control
              type="text"
              name="title"
              value={form.title}
              onChange={handleChange}
              isInvalid={!!errors.nombre}
              ref={nombreRef}
            />
            <Form.Control.Feedback type="invalid">
              {errors.nombre}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Marca</Form.Label>
            <Form.Control
              type="text"
              name="brand"
              value={form.brand}
              onChange={handleChange}
              isInvalid={!!errors.marca}
              ref={marcaRef}
            />
            <Form.Control.Feedback type="invalid">
              {errors.marca}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Descripción</Form.Label>
            <Form.Control
              as="textarea"
              name="description"
              rows={3}
              value={form.description}
              onChange={handleChange}
              isInvalid={!!errors.descripcion}
              ref={descripcionRef}
            />
            <Form.Control.Feedback type="invalid">
              {errors.descripcion}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Precio por Día ($)</Form.Label>
            <Form.Control
              type="number"
              name="priceDay"
              value={form.priceDay}
              onChange={handleChange}
              isInvalid={!!errors.precioPorDia}
              ref={precioRef}
            />
            <Form.Control.Feedback type="invalid">
              {errors.precioPorDia}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Imagen (URL)</Form.Label>
            <Form.Control
              type="text"
              name="imagen"
              value={form.imagen}
              onChange={handleChange}
              isInvalid={!!errors.imagen}
              ref={imagenRef}
            />
            <Form.Control.Feedback type="invalid">
              {errors.imagen}
            </Form.Control.Feedback>
          </Form.Group>
        </Form>
      </Modal.Body>

      <Modal.Footer>
        <Button variant="secondary" onClick={handleCloseAndReset}>
          Cancelar
        </Button>
        <Button variant="primary" onClick={handleSubmit}>
          Guardar Cambios
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default EditProduct;
