"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { auth, db } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { motion } from "framer-motion";
import { Form, Button, Alert, Spinner, Card, Container } from "react-bootstrap";

const RegisterForm = ({ onClose }: { onClose?: () => void }) => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const [loading, setLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError(null);

    if (!email || !password) {
      setError("⚠️ Por favor, complete todos los campos.");
      return;
    }

    setLoading(true);
    try {
      const userCredential = await createUserWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Guardar datos en Firestore
      await setDoc(doc(db, "users", user.uid), {
        email: user.email,
        createdAt: new Date(),
      });

      if (onClose) onClose(); // Cierra modal si existe

      router.push("/todolist"); // Redirigir al usuario
    } catch (err) {
      if (err instanceof Error) {
        setError(getFriendlyError(err.message));
      } else {
        setError("❌ Ocurrió un error inesperado.");
      }
    } finally {
      setLoading(false);
    }
  };

  const getFriendlyError = (message: string) => {
    if (message.includes("email-already-in-use")) return "⚠️ El correo ya está registrado.";
    if (message.includes("weak-password")) return "⚠️ La contraseña es muy débil.";
    return "❌ Error al registrarse.";
  };

  return (
    <Container
      className="d-flex justify-content-center align-items-center"
      style={{ minHeight: "100vh" }}
    >
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0, transition: { duration: 0.5 } }}
      >
        <Card className="p-4 shadow-lg" style={{ maxWidth: "400px", width: "100%" }}>
          <h2 className="text-center text-primary fw-bold">Crear Cuenta</h2>

          {error && <Alert variant="danger" className="text-center">{error}</Alert>}

          <Form onSubmit={handleSubmit}>
            <Form.Group className="mb-3">
              <Form.Label className="fw-semibold">Correo Electrónico</Form.Label>
              <Form.Control
                type="email"
                placeholder="tucorreo@example.com"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
              />
            </Form.Group>

            <Form.Group className="mb-3">
              <Form.Label className="fw-semibold">Contraseña</Form.Label>
              <Form.Control
                type="password"
                placeholder="********"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={6}
              />
            </Form.Group>

            <Button variant="primary" type="submit" className="w-100" disabled={loading}>
              {loading ? <Spinner animation="border" size="sm" /> : "📝 Registrarse"}
            </Button>
          </Form>

          {onClose && (
            <Button variant="secondary" onClick={onClose} className="mt-2 w-100" disabled={loading}>
              ❌ Cancelar
            </Button>
          )}

          <div className="text-center mt-3">
            ¿Ya tienes cuenta?{" "}
            <a href="/login" className="text-primary fw-bold">
              Inicia sesión aquí
            </a>
          </div>
        </Card>
      </motion.div>
    </Container>
  );
};

export default RegisterForm;
