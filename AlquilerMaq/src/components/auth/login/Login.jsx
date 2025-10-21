import { useState, useRef, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { Card, Form, Button, Row, FormGroup, Alert } from "react-bootstrap";
import "./Login.css";
import { AuthenticationContext } from "../../service/auth/auth.context";
import { validateLoginUser } from "../../utils/validation"; // mismas validaciones del backend

const Login = () => {
  const { handleLoginUser } = useContext(AuthenticationContext);

  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errors, setErrors] = useState({
    email: "",
    password: "",
    exist: "",
    notFunction: "",
  });

  const emailRef = useRef(null);
  const passwordRef = useRef(null);
  const navigate = useNavigate();

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setErrors((prev) => ({ ...prev, email: "", exist: "", notFunction: "" }));
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setErrors((prev) => ({
      ...prev,
      password: "",
      exist: "",
      notFunction: "",
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setErrors({
      email: "",
      password: "",
      exist: "",
      notFunction: "",
    });

    const validationErrors = validateLoginUser({ email, password });
    if (Object.keys(validationErrors).length > 0) {
      setErrors((prev) => ({
        ...prev,
        email: validationErrors.email || "",
        password: validationErrors.password || "",
      }));

      if (validationErrors.email) emailRef.current.focus();
      else if (validationErrors.password) passwordRef.current.focus();
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      if (!res.ok) {
        const errorData = await res.json();
        setErrors((prev) => ({
          ...prev,
          exist: errorData.message || "Email o contraseña incorrectos",
        }));
        return;
      }

      const data = await res.json(); // { token, user }
      handleLoginUser(data);
      setEmail("");
      setPassword("");
      navigate("/main");
    } catch (err) {
      setErrors((prev) => ({
        ...prev,
        notFunction: "Error al conectar con el servidor",
      }));
      console.error("Error de login:", err);
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
            {/* Email */}
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
                <p className="text-danger mt-2">{errors.email}</p>
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
                <p className="text-danger mt-2">{errors.password}</p>
              )}
            </FormGroup>
            {errors.exist && (
              <Alert variant="danger" className="mt-3">
                {errors.exist}
              </Alert>
            )}
            {errors.notFunction && (
              <Alert variant="danger" className="mt-3">
                {errors.notFunction}
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
