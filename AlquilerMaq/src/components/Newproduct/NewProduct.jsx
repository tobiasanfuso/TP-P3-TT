import { useState, useRef } from "react";
import { Modal, Button, Form, Spinner, Alert } from "react-bootstrap";
import { useContext } from "react";
import { AuthenticationContext } from "../service/auth/auth.context";
import { validateProduct } from "../utils/validateProduct";
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
    const newErrors = validateProduct({
      nombre,
      marca,
      descripcion,
      imagen,
      precioPorDia,
    });
    setErrors(newErrors);

    const firstError = Object.keys(newErrors)[0];
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
