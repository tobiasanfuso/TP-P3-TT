import React, { useEffect, useState, useContext } from "react";
import { ListGroup, Badge, Spinner, Alert, Dropdown } from "react-bootstrap";
import { AuthenticationContext } from "../service/auth/auth.context";
import { Trash } from "react-bootstrap-icons";
import "./RequestsList.css";
import { toast } from "react-toastify";

const estados = [
  { value: "pendiente", label: "Pendiente", color: "warning" },
  { value: "aprobado", label: "Aprobado", color: "success" },
  { value: "rechazado", label: "Rechazado", color: "danger" },
  { value: "finalizado", label: "Finalizado", color: "secondary" },
];

const RequestsList = ({ title, apiEndpoint, allowEdit }) => {
  const { token, user } = useContext(AuthenticationContext);
  const [rentalRequests, setRentalRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [message, setMessage] = useState(null);
  const [reload, setReload] = useState(false);

  const getBadgeColor = (estado) => {
    const found = estados.find((e) => e.value === estado);
    return found.color;
  };
  useEffect(() => {
    const fetchRequests = async () => {
      setLoading(true);
      try {
        const res = await fetch(apiEndpoint, {
          headers: { Authorization: `Bearer ${token}` },
        });
        if (!res.ok) throw new Error("No se pudieron cargar las solicitudes");
        const data = await res.json();
        setRentalRequests(data);
      } catch (err) {
        setRentalRequests([]);
        toast.error(err.message || "No se pudieron cargar las solicitudes");
      } finally {
        setLoading(false);
      }
    };
    fetchRequests();
  }, [reload]);

  const handleBorrarSolicitudAdmin = async (id) => {
    try {
      const res = await fetch(`http://localhost:5000/api/solicitudes/${id}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` },
      });
      if (!res.ok) throw new Error("No se pudo borrar la solicitud");
      toast.success("Solicitud borrada correctamente");
      setReload((prev) => !prev);
    } catch (err) {
      setMessage(err.message);
    }
  };

  const handleBorrarSolicitudUsuario = async (id) => {
    try {
      const solicitud = rentalRequests.find((r) => r.id === id);
      if (solicitud.estado !== "pendiente") {
        toast.warn("Solo se pueden borrar solicitudes pendientes");
        return;
      }
      const res = await fetch(
        `http://localhost:5000/api/solicitudes/${id}/usuario`,
        {
          method: "DELETE",
          headers: { Authorization: `Bearer ${token}` },
        }
      );
      if (!res.ok) throw new Error("No se pudo borrar la solicitud");
      setMessage("Solicitud borrada correctamente");
      setReload((prev) => !prev);
    } catch (err) {
      setMessage(err.message);
    }
  };
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
      toast.success("Estado actualizado correctamente");

      setReload((prev) => !prev);
    } catch (err) {
      setMessage(err.message);
    }
  };
  return (
    <section className="page-hero my-requests">
      <h3 className="page-title mb-3">{title}</h3>
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
          {rentalRequests.map((req, i) => {
            const puedeBorrarAdmin =
              user.role === "admin" || user.role === "sysadmin";
            const puedeBorrarUsuario =
              user.role === "customer" && req.estado === "pendiente";
            const handleBorrar = puedeBorrarAdmin
              ? handleBorrarSolicitudAdmin
              : puedeBorrarUsuario
              ? handleBorrarSolicitudUsuario
              : null;

            return (
              <ListGroup.Item
                key={req.id}
                className="request-item d-flex justify-content-between align-items-center fade-up"
                style={{ animationDelay: `${i * 60}ms` }}
              >
                <div>
                  <h6 className="fw-semibold mb-1">{req.Maquina?.nombre}</h6>
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
                    {allowEdit ? (
                      <Dropdown>
                        <strong>Estado: </strong>
                        <Dropdown.Toggle
                          as={Badge}
                          bg="light"
                          className="estado-toggle status-badge text-capitalize"
                          data-state={req.estado}
                          style={{ cursor: "pointer" }}
                          id={req.id}
                        >
                          {req.estado}
                        </Dropdown.Toggle>
                        <Dropdown.Menu container={document.body}>
                          {estados.map((opt) => (
                            <Dropdown.Item
                              key={opt.value}
                              onClick={() =>
                                handleEstadoChange(req.id, opt.value)
                              }
                              active={req.estado === opt.value}
                            >
                              <Badge
                                bg="light"
                                className="text-capitalize text-black w-100"
                                data-state={opt.value}
                              >
                                {opt.label}
                              </Badge>
                            </Dropdown.Item>
                          ))}
                        </Dropdown.Menu>
                      </Dropdown>
                    ) : (
                      <Badge
                        bg={getBadgeColor(req.estado)}
                        className="text-capitalize text-white"
                        data-state={req.estado} 
                      >
                        {req.estado}
                      </Badge>
                    )}
                  </div>

                  {(user.role === "admin" || user.role === "sysadmin") &&
                    req.User && (
                      <div className="mt-2">
                        <strong>Usuario: </strong>
                        <span className="text-primary">
                          {req.User.username}
                        </span>
                        {" | "}
                        <span className="text-muted">{req.User.email}</span>
                      </div>
                    )}
                </div>

                <div className="d-flex align-items-center gap-2">
                  <Badge bg="primary" pill>
                    #{req.id}
                  </Badge>
                  {handleBorrar && (
                    <Trash
                      className="trash-icon"
                      color="red"
                      onClick={() => handleBorrar(req.id)}
                    />
                  )}
                </div>
              </ListGroup.Item>
            );
          })}
        </ListGroup>
      )}
    </section>
  );
};

export default RequestsList;
