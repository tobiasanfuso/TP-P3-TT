import { useState, useRef } from "react";
import { Card, Row, Col, Button, Form } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
const UserRegister = () => {
  const [username, setUserName] = useState("");
  const [password, setPassword] = useState("");
  const [email, setEmail] = useState("");

  const [errors, setErrors] = useState({
    username: "",
    password: "",
    email: "",
  });
  const navigate = useNavigate();
  const emailRef = useRef(null);
  const usernameRef = useRef(null);
  const passwordRef = useRef(null);

  const handleEmailChange = (e) => {
    setEmail(e.target.value);
    setErrors({ ...errors, email: "" });
  };

  const handleUsernameChange = (e) => {
    setUserName(e.target.value);
    setErrors({ ...errors, username: "" });
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
    setErrors({ ...errors, password: "" });
  };

  const validate = () => {
    let valid = true;
    const newErrors = { username: "", password: "", email: "" };

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
    } else if (password.length < 4) {
      newErrors.password = "Debe tener al menos 4 caracteres";
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
      }
    }

    return valid;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      setEmail("");
      setUserName("");
      setPassword("");
      setErrors({ username: "", password: "", email: "" });
      alert("Registro exitoso de " + username);
    }
  };

  return (
    <Card>
      <Card.Body>
        <h5>¡Bienvenido a AlquiMaq S.R.L!</h5>

        <Form onSubmit={handleSubmit}>
          <Form.Group>
            <Form.Control
              type="text"
              placeholder="Ingrese email"
              ref={emailRef}
              onChange={handleEmailChange}
              value={email}
              className={errors.email}
            />
            <p className="">{errors.email}</p>
          </Form.Group>

          <Form.Group>
            <Form.Control
              type="text"
              placeholder="Ingrese nombre de usuario"
              ref={usernameRef}
              onChange={handleUsernameChange}
              value={username}
              className={errors.username}
            />
            <p>{errors.username}</p>
          </Form.Group>

          <Form.Group>
            <Form.Control
              type="password"
              placeholder="Ingrese contraseña"
              ref={passwordRef}
              onChange={handlePasswordChange}
              value={password}
              className={errors.password}
            />
            <p>{errors.password}</p>
          </Form.Group>

          <Button variant="secondary" type="button">
            Registrarse
          </Button>
          <Button
            type="submit"
            variant="outline-secondary"
            onClick={() => navigate("/login")}
          >
            Iniciar sesión
          </Button>
        </Form>
      </Card.Body>
    </Card>
  );
};

export default UserRegister;
