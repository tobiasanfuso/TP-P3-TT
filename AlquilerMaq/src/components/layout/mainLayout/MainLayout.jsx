import React from "react";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import "./MainLayout.css";

const MainLayout = ({ user, setUser, logOut, children }) => {
  const navigate = useNavigate();
  const currentUser = user?.name;
  const currentRole = user?.role;

  const handleLogout = () => {
    logOut();
    navigate("/login");
    setUser(null);
  };

  const handleProfile = () => {
    alert(`Perfil de ${currentUser}`);
  };

  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar bg="light" expand="lg" className="fixed-top shadow-sm">
        <Container>
          <Navbar.Brand className="text-primary">AlquiMaq S.R.L</Navbar.Brand>
          <Navbar.Toggle aria-controls="main-navbar" />
          <Navbar.Collapse id="main-navbar">
            <Nav className="me-auto">
              <Nav.Link onClick={() => navigate("/main")}>Inicio</Nav.Link>
              {(currentRole === "customer" ||
                currentRole === "admin" ||
                currentRole === "sysadmin") && (
                <>
                  <Nav.Link onClick={() => navigate("/mis-solicitudes")}>
                    Mis solicitudes
                  </Nav.Link>
                  <Nav.Link onClick={() => navigate("/historial-solicitudes")}>
                    Historial de solicitudes
                  </Nav.Link>
                </>
              )}
              {(currentRole === "admin" || currentRole === "sysadmin") && (
                <Nav.Link onClick={() => navigate("/gestion-usuarios")}>
                  Gestión de usuarios
                </Nav.Link>
              )}
              {currentRole === "sysadmin" && (
                <Nav.Link onClick={() => navigate("/panel-de-control")}>
                  Panel de control
                </Nav.Link>
              )}
            </Nav>

            <div>
              <Button
                variant="primary"
                className="me-2"
                onClick={handleProfile}
              >
                {currentUser}
              </Button>
              <Button variant="danger" onClick={handleLogout}>
                Cerrar sesión
              </Button>
            </div>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <main className="flex-grow-1 mt-5">
        <Container>{children}</Container>
      </main>

      <footer className="main-footer text-center">
        <p>© 2025 AlquiMaq S.R.L. Todos los derechos reservados.</p>
      </footer>
    </div>
  );
};

export default MainLayout;
