"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation"; // Para redireccionar
import { auth } from "@/firebase"; // Asegura que el path es correcto
import { signInWithEmailAndPassword } from "firebase/auth";
import { Button, Form, Alert, Card, Container } from "react-bootstrap";

interface LoginFormProps {
  onClose?: () => void;
}

const LoginForm: React.FC<LoginFormProps> = ({ onClose }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const router = useRouter();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    try {
      await signInWithEmailAndPassword(auth, email, password);
      console.log("Usuario autenticado:", auth.currentUser);
      router.push("/todolist"); // Redirigir al usuario después de login
    } catch (err) {
      console.error("Error al iniciar sesión:", err);
      setError("⚠️ Correo o contraseña incorrectos.");
    }
  };

  return (
    <Container className="d-flex justify-content-center align-items-center" style={{ minHeight: "100vh" }}>
      <Card className="p-4 shadow-lg" style={{ maxWidth: "400px", width: "100%" }}>
        <h2 className="text-center text-primary fw-bold">Iniciar Sesión</h2>
        
        {error && <Alert variant="danger" className="text-center">{error}</Alert>}

        <Form onSubmit={handleLogin}>
          <Form.Group className="mb-3">
            <Form.Label className="fw-semibold">Correo Electrónico</Form.Label>
            <Form.Control
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              placeholder="tucorreo@example.com"
            />
          </Form.Group>

          <Form.Group className="mb-3">
            <Form.Label className="fw-semibold">Contraseña</Form.Label>
            <Form.Control
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              placeholder="********"
            />
          </Form.Group>

          <Button variant="primary" type="submit" className="w-100">
            🔑 Iniciar Sesión
          </Button>
        </Form>

        {onClose && (
          <Button variant="secondary" onClick={onClose} className="mt-2 w-100">
            ❌ Cerrar
          </Button>
        )}
      </Card>
    </Container>
  );
};

export default LoginForm;
