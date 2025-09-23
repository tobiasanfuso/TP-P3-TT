import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Card, Form, Button, Row, FormGroup, Alert } from "react-bootstrap";
import "./Login.css";

const Login = ({ setUser, onLogin }) => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({
    username: false,
    password: false,
    exist: false,
    notFunction: false,
  });

  const usernameRef = useRef(null);
  const passwordRef = useRef(null);
  const navigate = useNavigate();

  const handleUsernameChange = (e) => {
    setUsername(e.target.value);
    setErrors((prev) => ({ ...prev, username: false }));
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setErrors((prev) => ({ ...prev, password: false }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setErrors({
      username: false,
      password: false,
      exist: false,
      notFunction: false,
    });

    if (!usernameRef.current.value && !passwordRef.current.value) {
      usernameRef.current.focus();
      setErrors((prev) => ({
        ...prev,
        username: true,
        password: true,
      }));
      return;
    }
    if (!usernameRef.current.value) {
      usernameRef.current.focus();
      setErrors((prev) => ({ ...prev, username: true }));
      return;
    }
    if (!passwordRef.current.value || password.length < 7) {
      passwordRef.current.focus();
      setErrors((prev) => ({ ...prev, password: true }));
      return;
    }

    // Lógica de roles
    let role = "customer";
    if (username.toLowerCase() === "admin") {
      role = "admin";
    } else if (username.toLowerCase() === "sysadmin") {
      role = "sysadmin";
    }

    if (setUser) setUser({ name: username, role });
    if (onLogin) onLogin();

    setUsername("");
    setPassword("");
    navigate("/main");
  };

  return (
    <div className="login-page">
    <Card className="login-card shadow-lg mx-auto">
      <Card.Body className="p-4 p-md-5">
        <Row className="mb-3 text-center">
          <h4 className="login-title mb-1">
          ¡Bienvenido a <span className="text-brand">AlquiMaq S.R.L</span>!
          </h4>
          <p className="text-muted mb-0">Ingresá con tu cuenta</p>
        </Row>

        <Form onSubmit={handleSubmit}>
          <FormGroup className="mb-4">
            <Form.Label>Usuario</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ingresar usuario"
              ref={usernameRef}
              value={username}
              onChange={handleUsernameChange}
              className={errors.username ? "border border-danger" : ""}
              required
            />
            {errors.username && (
              <Alert variant="danger" className="mt-2">
                El campo usuario es obligatorio
              </Alert>
            )}
          </FormGroup>
          
          <FormGroup className="mb-4">
            <Form.Label>Contraseña</Form.Label>
            <Form.Control
              type="password"
              placeholder="Ingresar contraseña"
              ref={passwordRef}
              value={password}
              onChange={handlePasswordChange}
              className={errors.password ? "border border-danger" : ""}
              required
            />
            {errors.password && (
              <Alert variant="danger" className="mt-2">
                La contraseña es incorrecta (mínimo 7 caracteres)
              </Alert>
            )}
          </FormGroup>
          {errors.exist && (
            <Alert variant="danger" className="mt-3">
              El usuario o la contraseña es incorrecto.
            </Alert>
          )}
          {errors.notFunction && (
            <Alert variant="danger" className="mt-3">
              Error al iniciar sesión. Inténtalo de nuevo más tarde.
            </Alert>
          )}
          <div className="d-flex justify-content-between mt-3 gap-2">
            <Button
              variant="outline-secondary"
              type="button"
              onClick={() => navigate("/register")}
            >
              Registrarse
            </Button>
            <Button variant="secondary" type="submit">
              Iniciar sesión
            </Button>
          </div>
        </Form>
      </Card.Body>
    </Card>
    </div>
  );
};

export default Login;
