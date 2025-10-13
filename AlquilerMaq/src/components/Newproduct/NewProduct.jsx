import React, { useState, useRef } from "react";
import { Modal, Button, Form } from "react-bootstrap";

const NewProduct = ({ show, onSave, onClose }) => {
  const [title, setTitle] = useState("");
  const [brand, setBrand] = useState(""); 
  const [description, setDescription] = useState("");
  const [image, setImage] = useState("");
  const [errors, setErrors] = useState({
    title: "",
    brand: "", 
    description: "",
    image: "",
  });

  const titleRef = useRef(null);
  const brandRef = useRef(null); 
  const descriptionRef = useRef(null);
  const imageRef = useRef(null);

  const validate = () => {
    let valid = true;
    const newErrors = { title: "", brand: "", description: "", image: "" };

    if (!title.trim()) {
      newErrors.title = "El título es obligatorio";
      valid = false;
    }
    if (!brand.trim()) {
      newErrors.brand = "La marca es obligatoria";
      valid = false;
    }
    if (!description.trim()) {
      newErrors.description = "La descripción es obligatoria";
      valid = false;
    }
    if (!image.trim()) {
      newErrors.image = "La URL de la imagen es obligatoria";
      valid = false;
    }

    setErrors(newErrors);
    if (!valid) {
      if (newErrors.title) {
        titleRef.current.focus();
      } else if (newErrors.brand) {
        brandRef.current.focus();
      } else if (newErrors.description) {
        descriptionRef.current.focus();
      } else if (newErrors.image) {
        imageRef.current.focus();
      }
    }

    return valid;
  };

  const handleSaveProduct = () => {
    if (validate()) {
      onSave({ title, brand, description, image }); 
      handleCloseAndReset();
    }
  };

  const handleCloseAndReset = () => {
    setTitle("");
    setBrand("");
    setDescription("");
    setImage("");
    setErrors({ title: "", brand: "", description: "", image: "" });
    onClose();
  };

  return (
    <Modal show={show} onHide={handleCloseAndReset} centered>
      <Modal.Header closeButton>
        <Modal.Title>Agregar Nuevo Producto</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3" controlId="formTitle">
            <Form.Label>Título del Producto</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ingrese el título"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              isInvalid={!!errors.title}
              ref={titleRef}
            />
            <Form.Control.Feedback type="invalid">
              {errors.title}
            </Form.Control.Feedback>
          </Form.Group>
          <Form.Group className="mb-3" controlId="formBrand">
            <Form.Label>Marca de la Máquina</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ingrese la marca"
              value={brand}
              onChange={(e) => setBrand(e.target.value)}
              isInvalid={!!errors.brand}
              ref={brandRef}
            />
            <Form.Control.Feedback type="invalid">
              {errors.brand}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formDescription">
            <Form.Label>Descripción</Form.Label>
            <Form.Control
              as="textarea"
              rows={3}
              placeholder="Ingrese la descripción"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              isInvalid={!!errors.description}
              ref={descriptionRef}
            />
            <Form.Control.Feedback type="invalid">
              {errors.description}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3" controlId="formImage">
            <Form.Label>URL de Imagen</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ingrese la URL de la imagen"
              value={image}
              onChange={(e) => setImage(e.target.value)}
              isInvalid={!!errors.image}
              ref={imageRef}
            />
            <Form.Control.Feedback type="invalid">
              {errors.image}
            </Form.Control.Feedback>
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={handleCloseAndReset}>
          Cerrar
        </Button>
        <Button variant="primary" onClick={handleSaveProduct}>
          Guardar
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default NewProduct;