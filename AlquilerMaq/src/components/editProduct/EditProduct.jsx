// import React, { useState, useEffect } from "react";
// import { Modal, Button, Form } from "react-bootstrap";

// const EditProduct = ({ show, product, onSave, onClose }) => {
//   const [form, setForm] = useState({
//     title: "",
//     description: "",
//     imagen: "",
//   });

//   useEffect(() => {
//     if (product) {
//       setForm({
//         title: product.title,
//         description: product.description,
//         imagen: product.imagen,
//       });
//     }
//   }, [product]);

//   const handleChange = (e) => {
//     setForm({ ...form, [e.target.name]: e.target.value });
//   };

//   const handleSubmit = () => {
//     onSave({ ...product, ...form });
//   };

//   return (
//     <Modal show={show} onHide={onClose}>
//       <Modal.Header closeButton>
//         <Modal.Title>Editar Producto</Modal.Title>
//       </Modal.Header>
//       <Modal.Body>
//         <Form>
//           <Form.Group>
//             <Form.Label>Nombre</Form.Label>
//             <Form.Control
//               name="title"
//               value={form.title}
//               onChange={handleChange}
//             />
//           </Form.Group>
//           <Form.Group>
//             <Form.Label>Descripción</Form.Label>
//             <Form.Control
//               name="description"
//               value={form.description}
//               onChange={handleChange}
//             />
//           </Form.Group>
//           <Form.Group>
//             <Form.Label>Imagen (URL)</Form.Label>
//             <Form.Control
//               name="imagen"
//               value={form.imagen}
//               onChange={handleChange}
//             />
//           </Form.Group>
//         </Form>
//       </Modal.Body>
//       <Modal.Footer>
//         <Button variant="secondary" onClick={onClose}>
//           Cancelar
//         </Button>
//         <Button variant="primary" onClick={handleSubmit}>
//           Guardar Cambios
//         </Button>
//       </Modal.Footer>
//     </Modal>
//   );
// };

// export default EditProduct;
import React, { useState, useEffect } from "react";
import { Modal, Button, Form } from "react-bootstrap";

const EditProduct = ({ show, product, onSave, onClose }) => {
  const [form, setForm] = useState({
    title: "",
    description: "",
    imagen: "",
  });

  // Cargar datos actuales al abrir el modal
  useEffect(() => {
    if (product) {
      setForm({
        title: product.title || "",
        description: product.description || "",
        imagen: product.image || "",
      });
    }
  }, [product]);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleSubmit = () => {
    // Combinar datos existentes con los editados
    onSave({ ...product, ...form });
  };

  return (
    <Modal show={show} onHide={onClose}>
      <Modal.Header closeButton>
        <Modal.Title>Editar Producto</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Nombre</Form.Label>
            <Form.Control
              name="title"
              value={form.title}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Descripción</Form.Label>
            <Form.Control
              name="description"
              value={form.description}
              onChange={handleChange}
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>Imagen (URL)</Form.Label>
            <Form.Control
              name="imagen" // <- corregido
              value={form.imagen}
              onChange={handleChange}
            />
          </Form.Group>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
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
