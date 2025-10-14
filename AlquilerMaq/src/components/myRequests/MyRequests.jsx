import React, { useEffect, useState, useContext } from "react";
import { ListGroup, Badge, Form, Spinner, Alert } from "react-bootstrap";
import "./MyRequests.css";
import { AuthenticationContext } from "../service/auth/auth.context";

const estados = [
  { value: "pendiente", label: "Pendiente" },
  { value: "aprobado", label: "Aprobado" },
  { value: "rechazado", label: "Rechazado" },
  { value: "finalizado", label: "Finalizado" },
];

const MyRequests = () => {
  const { token, user } = useContext(AuthenticationContext);
  const [rentalRequests, setRentalRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState(null);

  const fetchRequests = async () => {
    setLoading(true);
    try {
      const res = await fetch(
        user.role === "customer"
          ? "http://localhost:5000/api/solicitudes/mis-solicitudes"
          : "http://localhost:5000/api/solicitudes",
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (!res.ok) throw new Error("No se pudieron cargar las solicitudes");
      const data = await res.json();
      setRentalRequests(data);
    } catch (err) {
      setRentalRequests([]);
      setMessage(err.message);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchRequests();
  }, []);

  // Cambiar estado de solicitud (solo admin/sysadmin)
  const handleEstadoChange = async (id, nuevoEstado) => {
    try {
      const res = await fetch(
        `http://localhost:5000/api/solicitudes/${id}/estado`,
        {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          body: JSON.stringify({ estado: nuevoEstado }),
        }
      );
      if (!res.ok) throw new Error("No se pudo actualizar el estado");
      setMessage("Estado actualizado correctamente");
      fetchRequests();
    } catch (err) {
      setMessage(err.message);
    }
  };

  return (
    <section className="page-hero my-requests">
      <h3 className="page-title mb-3">Mis Solicitudes</h3>
      {message && <Alert variant="info">{message}</Alert>}
      {loading ? (
        <div className="d-flex align-items-center gap-2">
          <Spinner animation="border" size="sm" />
          <span className="text-muted">Cargando solicitudes...</span>
        </div>
      ) : rentalRequests.length === 0 ? (
        <p className="text-muted">No se han realizado solicitudes aún.</p>
      ) : (
        <ListGroup className="requests-list">
          {rentalRequests.map((req) => (
            <ListGroup.Item
              key={req.id}
              className="request-item d-flex justify-content-between align-items-center"
            >
              <div>
                <h6 className="fw-semibold mb-1">
                  {req.Maquina?.nombre || "Sin nombre"}
                </h6>
                <div className="mb-1">
                  <span className="me-2">
                    <strong>Precio/día:</strong> ${req.Maquina?.precioPorDia}
                  </span>
                  <span>
                    <strong>Fechas:</strong> {req.fechaInicio?.slice(0, 10)} a{" "}
                    {req.fechaFin?.slice(0, 10)}
                  </span>
                </div>
                <div>
                  <strong>Estado:</strong>{" "}
                  {user.role === "customer" ? (
                    <Badge
                      bg={
                        req.estado === "pendiente"
                          ? "warning"
                          : req.estado === "aprobado"
                          ? "success"
                          : req.estado === "rechazado"
                          ? "danger"
                          : "secondary"
                      }
                      className="text-capitalize text-black"
                    >
                      {req.estado}
                    </Badge>
                  ) : (
                    <Form.Select
                      size="sm"
                      value={req.estado}
                      style={{ maxWidth: 150, display: "inline-block" }}
                      onChange={(e) =>
                        handleEstadoChange(req.id, e.target.value)
                      }
                    >
                      {estados.map((opt) => (
                        <option key={opt.value} value={opt.value}>
                          {opt.label}
                        </option>
                      ))}
                    </Form.Select>
                  )}
                </div>
                {(user.role === "admin" || user.role === "sysadmin") &&
                  req.User && (
                    <div className="mt-2">
                      <strong>Usuario:</strong>{" "}
                      <span className="text-primary">{req.User.username}</span>
                      {" | "}
                      <span className="text-muted">{req.User.email}</span>
                    </div>
                  )}
              </div>
              <Badge bg="primary" pill>
                #{req.id}
              </Badge>
            </ListGroup.Item>
          ))}
        </ListGroup>
      )}
    </section>
  );
};

export default MyRequests;
