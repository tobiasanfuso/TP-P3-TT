import React from "react";
import { ListGroup } from "react-bootstrap";

const HistoryRequests = () => {
  // Ejemplo de datos estáticos
  const rentalRequests = [
    {
      producto: "Martillo",
      username: "JohnDoe",
      email: "john.doe@example.com",
      telefono: "+1 555-1234",
      state: "finalizada",
    },
    {
      producto: "Martillo neumatico",
      username: "JaneQQ",
      email: "jane.smith@example.com",
      telefono: "+1 555-5678",
      state: "finalizada",
    },
  ];

  return (
    <div>
      <h3 className="mb-3">Historial de Solicitudes</h3>

      {rentalRequests.length === 0 ? (
        <p>No se han realizado solicitudes aún.</p>
      ) : (
        <ListGroup>
          {rentalRequests.map((req, index) => (
            <ListGroup.Item key={index}>
              <strong>{req.producto}</strong> – {req.username} – {req.email} –{" "}
              {req.telefono} – {req.state}
            </ListGroup.Item>
          ))}
        </ListGroup>
      )}
    </div>
  );
};

export default HistoryRequests;
