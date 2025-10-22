import React from "react";
import { Navbar, Nav, Container, Button } from "react-bootstrap";
import Dropdown from "react-bootstrap/Dropdown"
import { useNavigate } from "react-router-dom";
import "./MainLayout.css";
import { useContext } from "react";
import { AuthenticationContext } from "../../service/auth/auth.context";

const MainLayout = ({ children }) => {
  const navigate = useNavigate();
  const { user, handleLogoutUser } = useContext(AuthenticationContext);
  const currentUser = user?.username;
  const currentRole = user?.role;

  const handleLogout = () => {
    handleLogoutUser();
    navigate("/login");
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
                      {user.role === "customer"
                        ? "Mis Solicitudes"
                        : "Solicitudes"}
                    </Nav.Link>
                    <Nav.Link onClick={() => navigate("/historial-solicitudes")}>
                      Historial de solicitudes
                    </Nav.Link>
                  </>
                )}
              {currentRole === "admin" && (
                <Nav.Link onClick={() => navigate("/panel-de-control")}>
                  Gestión de usuarios
                </Nav.Link>
              )}
              {currentRole === "sysadmin" && (
                <Nav.Link onClick={() => navigate("/panel-de-control")}>
                  Panel de control
                </Nav.Link>
              )}
            </Nav>

            <Dropdown align={{lg: "end"}} className="user-dropdown">
              <Dropdown.Toggle variant="light" className="avatar-toggle">
                <span className="avatar-initials">
                  {(currentUser || "").charAt(0).toUpperCase()}
                </span>
              </Dropdown.Toggle>

              <Dropdown.Menu className="user-menu" flip>
                <Dropdown.Header>{currentUser}</Dropdown.Header>
                <Dropdown.Divider />
                <Dropdown.Item onClick={handleLogout} className="text-danger">
                  Cerrar sesión
                </Dropdown.Item>
              </Dropdown.Menu>
            </Dropdown>
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
