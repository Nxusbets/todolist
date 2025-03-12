"use client";

import React, { useState } from "react";
import { useRouter } from "next/navigation"; // 👈 Para Next.js
import { auth, db } from "../firebase";
import { createUserWithEmailAndPassword } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";
import { motion } from "framer-motion";
import { Form, Button, Alert, Spinner } from "react-bootstrap";

const RegisterForm = ({ onClose }: { onClose?: () => void }) => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState<string | null>(null);
    const [loading, setLoading] = useState(false);
    const router = useRouter(); // 👈 Para redirigir

    const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setError(null);

        if (!email || !password) {
            setError("Por favor, complete todos los campos.");
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

            if (onClose) onClose(); // Cerrar modal si existe

            router.push("/"); // 👈 Redirigir a la página principal
        } catch (err) {
            if (err instanceof Error) {
                setError(getFriendlyError(err.message));
            } else {
                setError("Ocurrió un error inesperado.");
            }
        } finally {
            setLoading(false);
        }
    };

    const getFriendlyError = (message: string) => {
        if (message.includes("email-already-in-use")) return "El correo ya está registrado.";
        if (message.includes("weak-password")) return "La contraseña es muy débil.";
        return "Error al registrarse.";
    };

    return (
        <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0, transition: { duration: 0.5 } }}
            className="p-4 rounded shadow"
            style={{ maxWidth: "400px", margin: "auto" }}
        >
            <h2 className="text-center mb-4">Registro</h2>
            {error && <Alert variant="danger">{error}</Alert>}
            <Form onSubmit={handleSubmit}>
                <Form.Group className="mb-3">
                    <Form.Label>Email</Form.Label>
                    <Form.Control
                        type="email"
                        placeholder="Ingrese su email"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        required
                    />
                </Form.Group>
                <Form.Group className="mb-3">
                    <Form.Label>Contraseña</Form.Label>
                    <Form.Control
                        type="password"
                        placeholder="Ingrese su contraseña"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        required
                        minLength={6}
                    />
                </Form.Group>
                <div className="d-grid gap-2">
                    <Button variant="primary" type="submit" disabled={loading}>
                        {loading ? <Spinner animation="border" size="sm" /> : "Registrarse"}
                    </Button>
                    <Button variant="secondary" onClick={onClose} disabled={loading}>
                        Cancelar
                    </Button>
                </div>
            </Form>
        </motion.div>
    );
};

export default RegisterForm;
