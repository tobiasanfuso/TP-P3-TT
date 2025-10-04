import { useState, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { Card, Form, Button, Row, FormGroup, Alert } from "react-bootstrap";
import "./Login.css";

const Login = ({ setUser, onLogin }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({
    email: false,
    password: false,
    exist: false,
    notFunction: false,
  });

  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setErrors((prev) => ({ ...prev, username: false }));
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setErrors((prev) => ({ ...prev, password: false }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({
      email: false,
      password: false,
      exist: false,
      notFunction: false,
    });

    if (!emailRef.current.value) {
      emailRef.current.focus();
      setErrors((prev) => ({ ...prev, email: true }));
      return;
    }
    if (!passwordRef.current.value || password.length < 7) {
      passwordRef.current.focus();
      setErrors((prev) => ({ ...prev, password: true }));
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }), // <- usar email
      });

      if (!res.ok) {
        setErrors((prev) => ({ ...prev, exist: true }));
      } else {
        const data = await res.json(); // { token, user }
        localStorage.setItem("book-champions-token", data.token);
        localStorage.setItem("book-champions-user", JSON.stringify(data.user));

        if (setUser) setUser(data.user);
        if (onLogin) onLogin();

        setEmail("");
        setPassword("");
        navigate("/main");
      }
    } catch (err) {
      setErrors((prev) => ({ ...prev, notFunction: true }));
      console.error(err.message);
    }
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
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingresar email"
                ref={emailRef}
                value={email}
                onChange={handleEmailChange}
                className={errors.email ? "border border-danger" : ""}
              />
              {errors.email && (
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
