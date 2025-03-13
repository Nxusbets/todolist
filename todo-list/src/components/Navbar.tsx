"use client";

import React, { useContext } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation"; // ✅ Importa useRouter
import { Navbar, Nav, Button, Container } from "react-bootstrap";
import { UserContext } from "../contexts/UserContext";
import { auth } from "../firebase";
import { signOut } from "firebase/auth";

const MyNavbar: React.FC = () => {
    const userContext = useContext(UserContext);

    if (!userContext) {
      return null; // O algún componente de carga/error
    }
    
    const { user } = userContext;
    
  const router = useRouter(); // ✅ Usa el router para redireccionar

  const handleLogout = async () => {
    try {
      await signOut(auth); // ✅ Corrección en la función de logout
      router.push("/login"); // ✅ Redirigir a login después de cerrar sesión
    } catch (error) {
      console.error("Error al cerrar sesión:", error);
    }
  };

  return (
    <Navbar bg="dark" variant="dark" expand="lg">
      <Container>
        <Navbar.Brand as={Link} href="/">
          To-Do List NxuS
        </Navbar.Brand>
        <Navbar.Toggle aria-controls="navbar-nav" />
        <Navbar.Collapse id="navbar-nav">
          <Nav className="me-auto">
            {user && (
              <Nav.Link as={Link} href="/mis-todo">
                Mis To-Do
              </Nav.Link>
            )}
          </Nav>
          <Nav className="ms-auto">
            {user ? (
              <>
                <Nav.Link disabled className="text-light">
                  ✉️ {user.email}
                </Nav.Link>
                <Button variant="outline-light" onClick={handleLogout}>
                  Cerrar Sesión
                </Button>
              </>
            ) : (
              <>
                <Nav.Link as={Link} href="/login">
                  Iniciar Sesión
                </Nav.Link>
                <Nav.Link as={Link} href="/register">
                  Registrarse
                </Nav.Link>
              </>
            )}
          </Nav>
        </Navbar.Collapse>
      </Container>
    </Navbar>
  );
};

export default MyNavbar;
