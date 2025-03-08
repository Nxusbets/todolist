"use client";

import React, { useContext } from 'react';
import { UserContext } from '../contexts/UserContext';
import { auth } from '../firebase';
import { Navbar as BootstrapNavbar, Container, Nav } from 'react-bootstrap'; // Importa Navbar de Bootstrap

const Navbar = () => {
    const { user } = useContext(UserContext);

    const handleLogout = () => {
        auth.signOut();
        window.location.reload();
    };

    return (
        <BootstrapNavbar bg="light" expand="lg">
            <Container>
                <BootstrapNavbar.Brand href="/">To-Do List</BootstrapNavbar.Brand>
                <BootstrapNavbar.Toggle aria-controls="basic-navbar-nav" />
                <BootstrapNavbar.Collapse id="basic-navbar-nav">
                    <Nav className="me-auto">
                        {user ? (
                            <>
                                <Nav.Link disabled>Hola, {user.email}</Nav.Link>
                                <Nav.Link onClick={handleLogout}>Cerrar sesión</Nav.Link>
                            </>
                        ) : (
                            <>
                                <Nav.Link href="/">Iniciar sesión</Nav.Link>
                                <Nav.Link href="/register">Registrarse</Nav.Link>
                            </>
                        )}
                    </Nav>
                </BootstrapNavbar.Collapse>
            </Container>
        </BootstrapNavbar>
    );
};

export default Navbar;