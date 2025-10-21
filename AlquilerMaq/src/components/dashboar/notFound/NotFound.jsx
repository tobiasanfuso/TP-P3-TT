import React from "react";
import { useNavigate } from "react-router-dom";
import { Button } from "react-bootstrap";

const NotFound = () => {
  const navigate = useNavigate();
  const goBackLoginHandler = () => {
    navigate("/login");
  };

  return (
    <div className="NotFound vh-100 vw-100 d-flex flex-column justify-content-center align-items-center">
      <h2>Parece que estas perdido...</h2>
      <Button className="text-center button" onClick={goBackLoginHandler}>
        Volver al inicio
      </Button>
    </div>
  );
};

export default NotFound;
