import React from "react";
import { useNavigate } from "react-router-dom";
import { Button, Container, Row, Col } from "react-bootstrap";
import { useContext } from "react";
import { AuthenticationContext } from "../../service/auth/auth.context";
import { isTokenValid } from "../../auth/auth.services";
const NotFound = () => {
  const { token } = useContext(AuthenticationContext);
  const navigate = useNavigate();

  const goBackLoginHandler = () => {
    navigate("/login");
  };

  const goHomeHandler = () => {
    navigate("/main");
  };

  return (
    <div className="not-found-page">
      <Container fluid className="h-100">
        <Row className="h-100 align-items-center justify-content-center">
          <Col xs={12} md={8} lg={6} className="text-center">
            <div className="not-found-illustration mb-4">
              <svg
                width="300"
                height="200"
                viewBox="0 0 300 200"
                className="not-found-svg"
                xmlns="http://www.w3.org/2000/svg"
              >
                <defs>
                  <linearGradient
                    id="bgGradient"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="100%"
                  >
                    <stop offset="0%" stopColor="#f8f9fa" />
                    <stop offset="100%" stopColor="#e9ecef" />
                  </linearGradient>
                  <linearGradient
                    id="machineGradient"
                    x1="0%"
                    y1="0%"
                    x2="100%"
                    y2="100%"
                  >
                    <stop offset="0%" stopColor="#20c997" />
                    <stop offset="100%" stopColor="#17a2b8" />
                  </linearGradient>
                </defs>

                <rect
                  width="300"
                  height="200"
                  fill="url(#bgGradient)"
                  rx="20"
                />

                <g className="machine-group">
                  <rect
                    x="80"
                    y="120"
                    width="140"
                    height="60"
                    fill="url(#machineGradient)"
                    rx="8"
                  />

                  <rect
                    x="100"
                    y="100"
                    width="100"
                    height="30"
                    fill="#fff"
                    rx="5"
                  />
                  <rect
                    x="110"
                    y="110"
                    width="20"
                    height="15"
                    fill="#20c997"
                    rx="2"
                  />
                  <rect
                    x="150"
                    y="110"
                    width="20"
                    height="15"
                    fill="#20c997"
                    rx="2"
                  />

                  <line
                    x1="220"
                    y1="150"
                    x2="250"
                    y2="120"
                    stroke="#20c997"
                    strokeWidth="8"
                    strokeLinecap="round"
                  />
                  <circle cx="250" cy="120" r="12" fill="#20c997" />

                  <circle cx="110" cy="190" r="15" fill="#6c757d" />
                  <circle cx="190" cy="190" r="15" fill="#6c757d" />

                  <text
                    x="150"
                    y="80"
                    textAnchor="middle"
                    fontSize="48"
                    fontWeight="bold"
                    fill="#dc3545"
                    className="error-number"
                  >
                    404
                  </text>
                </g>

                <circle
                  cx="50"
                  cy="50"
                  r="3"
                  fill="#20c997"
                  className="particle"
                />
                <circle
                  cx="250"
                  cy="40"
                  r="2"
                  fill="#17a2b8"
                  className="particle"
                />
                <circle
                  cx="280"
                  cy="80"
                  r="2.5"
                  fill="#20c997"
                  className="particle"
                />
                <circle
                  cx="20"
                  cy="120"
                  r="2"
                  fill="#17a2b8"
                  className="particle"
                />
              </svg>
            </div>

            <div className="not-found-content">
              <h1 className="not-found-title mb-3">
                ¡Ups! Página no encontrada
              </h1>
              <p className="not-found-subtitle mb-4">
                Parece que la máquina que buscas no está disponible en este
                momento.
                <br />
                Pero no te preocupes, podemos ayudarte a encontrar lo que
                necesitas.
              </p>
              <div className="not-found-actions d-flex flex-column flex-sm-row gap-3 justify-content-center">
                {isTokenValid(token) && (
                  <Button
                    variant="primary"
                    size="lg"
                    onClick={goHomeHandler}
                    className="not-found-btn primary-btn"
                  >
                    🏠 Ir al Inicio
                  </Button>
                )}
                {!isTokenValid(token) && (
                  <Button
                    variant="outline-primary"
                    size="lg"
                    onClick={goBackLoginHandler}
                    className="not-found-btn secondary-btn"
                  >
                    🔐 Volver al Login
                  </Button>
                )}
              </div>

              {/* Información adicional */}
              <div className="not-found-help mt-4">
                <small className="text-muted">
                  ¿Necesitas ayuda? Contacta con nuestro equipo de soporte
                </small>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </div>
  );
};

export default NotFound;
