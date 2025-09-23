import React from "react";
import { ListGroup, Badge } from "react-bootstrap";
import './MyRequests.css'

const MyRequests = () => {
  // Ejemplo de datos estáticos
  const rentalRequests = [
    {
      producto: "Martillo",
      username: "JohnDoe",
      email: "john.doe@example.com",
      telefono: "+1 555-1234",
    },
    {
      producto: "Martillo neumatico",
      username: "JaneQQ",
      email: "jane.smith@example.com",
      telefono: "+1 555-5678",
    },
  ];

  return (
    <section className="page-hero my-requests">
      <h3 className="page-title mb-3">Mis Solicitudes</h3>

      {rentalRequests.length === 0 ? (
        <p className="text-muted">No se han realizado solicitudes aún.</p>
      ) : (
        <ListGroup variant="flush">
          {rentalRequests.map((req, index) => (
            <ListGroup.Item 
            key={index}
            className="request-item d-flex justify-content-between align-items-start">

            <div>
            <h6 className="fw-semibold mb-1">{req.producto}</h6> 
            <small className="text-muted d-block">
            {req.username} – {req.email} –{" "}
            {req.telefono}
            </small>
            </div>
            <Badge bg="primary" pill>
                #{index + 1}
              </Badge>
            </ListGroup.Item>
          ))}
        </ListGroup>
      )}
    </section>
  );
};

export default MyRequests;
