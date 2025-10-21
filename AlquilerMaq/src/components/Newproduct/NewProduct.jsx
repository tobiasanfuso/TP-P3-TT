import { useState, useRef } from "react";
import { Modal, Button, Form, Spinner, Alert } from "react-bootstrap";
import { useContext } from "react";
import { AuthenticationContext } from "../service/auth/auth.context";
import { toast } from "react-toastify";

const NewProduct = ({ show, onSave, onClose }) => {
  const { token } = useContext(AuthenticationContext);
  const [nombre, setNombre] = useState("");
  const [marca, setMarca] = useState("");
  const [descripcion, setDescripcion] = useState("");
  const [imagen, setImagen] = useState("");
  const [precioPorDia, setPrecioPorDia] = useState("");
  const [disponible, setDisponible] = useState(true);
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const [errors, setErrors] = useState({
    nombre: "",
    marca: "",
    descripcion: "",
    imagen: "",
    precioPorDia: "",
  });

  const nombreRef = useRef(null);
  const marcaRef = useRef(null);
  const descripcionRef = useRef(null);
  const imagenRef = useRef(null);
  const precioRef = useRef(null);

  const validate = () => {
    let valid = true;
    const newErrors = {
      nombre: "",
      marca: "",
      descripcion: "",
      imagen: "",
      precioPorDia: "",
    };

    if (!nombre.trim()) {
      newErrors.nombre = "El nombre es obligatorio";
      valid = false;
    } else if (nombre.trim().length < 3) {
      newErrors.nombre = "Debe tener al menos 3 caracteres";
      valid = false;
    }

    if (!marca.trim()) {
      newErrors.marca = "La marca es obligatoria";
      valid = false;
    }

    if (!descripcion.trim()) {
      newErrors.descripcion = "La descripción es obligatoria";
      valid = false;
    }

    if (!precioPorDia || isNaN(precioPorDia) || parseFloat(precioPorDia) <= 0) {
      newErrors.precioPorDia = "Ingrese un precio válido mayor que 0";
      valid = false;
    }

    if (!imagen.trim()) {
      newErrors.imagen = "La URL de la imagen es obligatoria";
      valid = false;
    }

    setErrors(newErrors);

    if (!valid) {
      if (newErrors.nombre) nombreRef.current.focus();
      else if (newErrors.marca) marcaRef.current.focus();
      else if (newErrors.descripcion) descripcionRef.current.focus();
      else if (newErrors.precioPorDia) precioRef.current.focus();
      else if (newErrors.imagen) imagenRef.current.focus();
    }

    return valid;
  };

  const handleSaveProduct = async () => {
    if (!validate()) return;

    setLoading(true);
    setErrorMsg("");

    try {
      const res = await fetch("http://localhost:5000/api/maquinas", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`,
        },
        body: JSON.stringify({
          nombre,
          marca,
          descripcion,
          imagen,
          precioPorDia,
          disponible,
        }),
      });

      if (!res.ok) throw new Error("Error al guardar la máquina");
      onSave();
      handleCloseAndReset();
    } catch (err) {
      toast.error("No se pudo guardar la máquina");
      console.error(err.message);
    } finally {
      setLoading(false);
    }
  };

  const handleCloseAndReset = () => {
    setNombre("");
    setMarca("");
    setDescripcion("");
    setImagen("");
    setPrecioPorDia("");
    setDisponible(true);
    setErrors({
      nombre: "",
      marca: "",
      descripcion: "",
      imagen: "",
      precioPorDia: "",
    });
    setErrorMsg("");
    onClose();
  };

  return (
    <Modal show={show} onHide={handleCloseAndReset} centered>
      <Modal.Header closeButton>
        <Modal.Title>Agregar Nueva Máquina</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {errorMsg && <Alert variant="danger">{errorMsg}</Alert>}

        <Form>
          <Form.Group className="mb-3">
            <Form.Label>Nombre</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ej: Hidrolavadora"
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              isInvalid={errors.nombre}
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
              placeholder="Ej: Kärcher"
              value={marca}
              onChange={(e) => setMarca(e.target.value)}
              isInvalid={errors.marca}
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
              rows={3}
              value={descripcion}
              onChange={(e) => setDescripcion(e.target.value)}
              isInvalid={errors.descripcion}
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
              value={precioPorDia}
              onChange={(e) => setPrecioPorDia(e.target.value)}
              isInvalid={errors.precioPorDia}
              ref={precioRef}
            />
            <Form.Control.Feedback type="invalid">
              {errors.precioPorDia}
            </Form.Control.Feedback>
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label>URL de la Imagen</Form.Label>
            <Form.Control
              type="text"
              placeholder="https://imgs.search.brave.com/S6ZIVdexpcnq_ohiKz09c92FHv5nc3uMd-nPLEmvhG4/rs:fit:860:0:0:0/g:ce/aHR0cHM6Ly9hY2Ru/LXVzLm1pdGllbmRh/bnViZS5jb20vc3Rv/cmVzLzk1Mi85MzYv/cHJvZHVjdHMvYW5k/YW1pby1yZWZvcnph/ZG9vbzEtMmE3ODc3/Y2RmNzYzNmM0NWQx/MTU2MDg5NTYwMzA4/NzItMjQwLTAuanBn"
              value={imagen}
              onChange={(e) => setImagen(e.target.value)}
              isInvalid={errors.imagen}
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
        <Button
          variant="primary"
          onClick={handleSaveProduct}
          disabled={loading}
        >
          {loading ? <Spinner size="sm" /> : "Guardar Máquina"}
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default NewProduct;
