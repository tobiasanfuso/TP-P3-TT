import { useState, useRef } from "react";
import { Card, Row, Button, Form, Alert, InputGroup } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./UserRegister.css";
import { Eye, EyeSlash } from "react-bootstrap-icons";
import { toast } from "react-toastify";
const UserRegister = () => {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [errors, setErrors] = useState({
    username: "",
    password: "",
    confirmPassword: "",
    email: "",
    backend: "",
  });

  const [showPassword, setShowPassword] = useState(false); // estado para contraseña
  const navigate = useNavigate();
  const emailRef = useRef(null);
  const usernameRef = useRef(null);
  const passwordRef = useRef(null);
  const confirmPasswordRef = useRef(null);
  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setErrors({ ...errors, email: "" });
  };

  const handleUsernameChange = (e) => {
    setUserName(e.target.value);
    setErrors({ ...errors, username: "", backend: "" });
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setErrors({ ...errors, password: "", backend: "" });
  };

  const handleConfirmPasswordChange = (e) => {
    setConfirmPassword(e.target.value);
    setErrors({ ...errors, confirmPassword: "", backend: "" });
  };
  const togglePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };
  const validate = () => {
    let valid = true;
    const newErrors = {
      username: "",
      password: "",
      confirmPassword: "",
      email: "",
      backend: "",
    };

    if (!email) {
      newErrors.email = "El email es obligatorio";
      valid = false;
    } else if (!/^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/i.test(email)) {
      newErrors.email = "Ingrese un email válido";
      valid = false;
    }

    if (!username) {
      newErrors.username = "El nombre de usuario es obligatorio";
      valid = false;
    } else if (username.length < 3) {
      newErrors.username = "Debe tener al menos 3 caracteres";
      valid = false;
    } else if (!/^[a-zA-Z0-9_]+$/.test(username)) {
      newErrors.username = "Solo se permiten letras, números y guiones bajos";
      valid = false;
    }

    if (!password) {
      newErrors.password = "La contraseña es obligatoria";
      valid = false;
    } else if (password.length <= 7) {
      newErrors.password = "Debe tener al menos 7 caracteres";
      valid = false;
    }
    if (!confirmPassword) {
      newErrors.confirmPassword = "Debe confirmar la contraseña";
      valid = false;
    } else if (password !== confirmPassword) {
      newErrors.confirmPassword = "Las contraseñas no coinciden";
      valid = false;
    }
    setErrors(newErrors);

    if (!valid) {
      if (newErrors.email) {
        emailRef.current.focus();
      } else if (newErrors.username) {
        usernameRef.current.focus();
      } else if (newErrors.password) {
        passwordRef.current.focus();
      } else if (newErrors.confirmPassword) {
        confirmPasswordRef.current.focus();
      }
    }

    return valid;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validate()) return;

    try {
      const res = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password, role: "customer" }),
      });

      if (!res.ok) {
        const errData = await res.json();
        setErrors((prev) => ({ ...prev, backend: errData.message }));
        toast.error(errData?.message || "No se pudo registrar", {
          toastId: "register-error",
        });
        return;
      }

      toast.success("¡Registro existoso! ;)", {toastId: "register-ok"})
      setEmail("");
      setUserName("");
      setPassword("");
      setConfirmPassword("");
      setErrors({
        username: "",
        password: "",
        confirmPassword: "",
        email: "",
        backend: "",
      });
      navigate("/login");
    } catch (err) {
      setErrors((prev) => ({
        ...prev,
        backend: "Error en el servidor, intente más tarde",
      }));
      console.error(err);
      toast.error("Error en el servidor, intente más tarde", {
        toastId: "register-network",
      })
    }
  };

  return (
    <div className="register-page">
      <Card className="register-card shadow-lg mx-auto">
        <Card.Body className="p-4 p-md-5">
          <Row className="mb-3 text-center">
            <h5 className="register-title mb-1">
              ¡Bienvenido a <span className="text-brand">AlquiMaq S.R.L</span>!
            </h5>
            <p className="text-muted mb-0">Registrá tu cuenta</p>
          </Row>
          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-4">
              <Form.Label>Email</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingrese email"
                ref={emailRef}
                onChange={handleEmailChange}
                value={email}
                className={errors.email && "is-invalid"}
              />
              {errors.email && <p className="text-danger">{errors.email}</p>}
            </Form.Group>

            <Form.Group className="mb-4">
              <Form.Label>Nombre de Usuario</Form.Label>
              <Form.Control
                type="text"
                placeholder="Ingrese nombre de usuario"
                ref={usernameRef}
                onChange={handleUsernameChange}
                value={username}
                className={errors.username && "is-invalid"}
              />
              {errors.username && (
                <p className="text-danger">{errors.username}</p>
              )}
            </Form.Group>
            <Form.Group className="mb-4">
              <Form.Label>Contraseña</Form.Label>
              <InputGroup>
                <Form.Control
                  type={showPassword ? "text" : "password"}
                  placeholder="Ingrese contraseña"
                  ref={passwordRef}
                  onChange={handlePasswordChange}
                  value={password}
                  className={errors.password && "is-invalid"}
                />
                <Button
                  variant="outline-secondary"
                  onClick={togglePasswordVisibility}
                  type="button"
                >
                  {showPassword ? <EyeSlash /> : <Eye />}
                </Button>
              </InputGroup>
              {errors.password && (
                <p className="text-danger">{errors.password}</p>
              )}
            </Form.Group>
            <Form.Group className="mb-4">
              <Form.Label>Confirmar Contraseña</Form.Label>
              <Form.Control
                type="password"
                placeholder="Repita la contraseña"
                ref={confirmPasswordRef}
                onChange={handleConfirmPasswordChange}
                value={confirmPassword}
                className={errors.confirmPassword && "is-invalid"}
              />
              {errors.confirmPassword && (
                <p className="text-danger">{errors.confirmPassword}</p>
              )}
            </Form.Group>
            {errors.backend && <Alert variant="danger">{errors.backend}</Alert>}
            <div className="d-flex justify-content-between mt-3 gap-2">
              <Button variant="secondary" type="submit">
                Registrarse
              </Button>

              <Button
                type="button"
                variant="outline-secondary"
                onClick={() => navigate("/login")}
              >
                Iniciar sesión
              </Button>
            </div>
          </Form>
        </Card.Body>
      </Card>
    </div>
  );
};

export default UserRegister;
