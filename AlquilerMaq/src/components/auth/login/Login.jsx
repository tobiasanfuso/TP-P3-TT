import { useState, useRef } from "react";
import { Button, Card, Form, Row, Alert } from "react-bootstrap";
import "./Login.css";

const Login = () => {
  const [errors, setErrors] = useState({
    username: false,
    password: false,
  });
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const usernameRef = useRef(null);
  const passwordRef = useRef(null);

  const handleSubmit = () => {
    setErrors({
      username: false,
      password: false,
      exist: false,
      notFunction: false,
    });

    if (!passwordRef.current.value && !usernameRef.current.value) {
      usernameRef.current.focus();
      setErrors((prevErrors) => ({
        ...prevErrors,
        password: true,
        username: true,
      }));
      return;
    }
    if (!usernameRef.current.value) {
      usernameRef.current.focus();
      setErrors((prevErrors) => ({ ...prevErrors, username: true }));
      return;
    }
    if (!passwordRef.current.value) {
      passwordRef.current.focus();
      setErrors((prevErrors) => ({ ...prevErrors, password: true }));
      return;
    }

    alert("Login exitoso");
    setUsername("");
    setPassword("");
    setErrors((prevErrors) => ({ ...prevErrors, exist: false }));
  };

  return (
    <Card className="form-card">
      <h1>Iniciar Sesión</h1>
      <Form>
        <Row className="mb-3">
          <Form.Group controlId="validationCustom01">
            <Form.Label>Usuario</Form.Label>
            <Form.Control
              type="text"
              placeholder="Ingrese el usuario..."
              ref={usernameRef}
              value={username}
              onChange={(e) => {
                setErrors((prev) => ({ ...prev, username: false }));
                setUsername(e.target.value);
              }}
              className={errors.username && "is-invalid"}
            />
            {errors.username && (
              <Alert variant="danger" className="mt-2">
                El usuario es requerido.
              </Alert>
            )}
          </Form.Group>
        </Row>

        <Row className="mb-3">
          <Form.Group controlId="validationCustom02">
            <Form.Label>Contraseña</Form.Label>
            <Form.Control
              type="password"
              placeholder="Ingrese la contraseña..."
              ref={passwordRef}
              value={password}
              onChange={(e) => {
                setErrors((prev) => ({ ...prev, password: false }));
                setPassword(e.target.value);
              }}
              className={errors.password && "is-invalid"}
            />
            {errors.password && (
              <Alert variant="danger" className="mt-2">
                La contraseña es requerida.
              </Alert>
            )}
          </Form.Group>
        </Row>

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

        <Row className="mb-3">
          <Button type="button" onClick={handleSubmit} className="btn-submit">
            Iniciar Sesión
          </Button>
        </Row>
        <Row>
          <Button type="button" className="btn-secondary">
            Registrarse
          </Button>
        </Row>
      </Form>
    </Card>
  );
};

export default Login;
