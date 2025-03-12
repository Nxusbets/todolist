"use client";

import React, { useContext } from "react";
import { UserContext } from "@/contexts/UserContext";
import { auth } from "@/firebase";
import { useRouter } from "next/navigation";
import { Navbar as BootstrapNavbar, Container, Nav, Image } from "react-bootstrap";

const Navbar = () => {
  const { user } = useContext(UserContext);
  const router = useRouter();

  const handleLogout = async () => {
    await auth.signOut();
    router.push("/");
  };

  return (
    <BootstrapNavbar bg="dark" variant="dark" expand="lg" className="shadow-lg">
      <Container>
        {/* Logo */}
        <BootstrapNavbar.Brand href="/todolist" className="fw-bold text-warning fs-4">
          ✅ To-Do List Pro
        </BootstrapNavbar.Brand>
        <BootstrapNavbar.Toggle aria-controls="basic-navbar-nav" />
        <BootstrapNavbar.Collapse id="basic-navbar-nav">
          <Nav className="ms-auto align-items-center">
            {user ? (
              <>
                {/* Avatar y Email */}
                <span className="text-light me-3 d-flex align-items-center">
                  {user.photoURL ? (
                    <Image
                      src={user.photoURL}
                      alt="Avatar"
                      width={35}
                      height={35}
                      roundedCircle
                      className="border border-warning me-2"
                    />
                  ) : (
                    <span className="fw-semibold">{user.email}</span>
                  )}
                </span>
                {/* Botón de Logout */}
                <Nav.Link onClick={handleLogout} className="text-warning fw-bold">
                  🔓 Cerrar sesión
                </Nav.Link>
              </>
            ) : (
              <>
                <Nav.Link href="/" className="text-light fw-semibold">
                  🔑 Iniciar sesión
                </Nav.Link>
                <Nav.Link href="/register" className="text-light fw-semibold">
                  📝 Registrarse
                </Nav.Link>
              </>
            )}
          </Nav>
        </BootstrapNavbar.Collapse>
      </Container>

      {/* Estilos con Bootstrap */}
      <style jsx>{`
        .text-warning:hover {
          color: #FFA500 !important;
        }
        .border-warning {
          border-color: #FFD700 !important;
        }
      `}</style>
    </BootstrapNavbar>
  );
};

export default Navbar;
