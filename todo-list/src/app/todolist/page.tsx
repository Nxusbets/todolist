"use client";

import React, { useState, useContext } from "react";
import { Container, Form, Button, Alert } from "react-bootstrap";
import { UserContext } from "../../contexts/UserContext";
import { db } from "../../firebase";
import { collection, addDoc } from "firebase/firestore";

const categories = ["Personal", "Trabajo", "Compras", "Estudio"];
const priorities = ["Alta", "Media", "Baja"];

const ToDoList: React.FC = () => {
  const [text, setText] = useState("");
  const [category, setCategory] = useState(categories[0]);
  const [priority, setPriority] = useState(priorities[1]);
  const [dueDate, setDueDate] = useState("");
  const [notes, setNotes] = useState("");
  const [alert, setAlert] = useState(false);
  const { user } = useContext(UserContext);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!text.trim()) return;

    if (user) {
      try {
        await addDoc(collection(db, "users", user.uid, "todos"), {
          text,
          category,
          priority,
          dueDate,
          notes,
          completed: false,
        });

        setAlert(true);
        setText("");
        setCategory(categories[0]);
        setPriority(priorities[1]);
        setDueDate("");
        setNotes("");

        setTimeout(() => setAlert(false), 2000);
      } catch (error) {
        console.error("Error al agregar To-Do:", error);
      }
    }
  };

  return (
    <Container className="card shadow mb-5 mt-5 d-flex flex-column align-items-center">
      <h1 className="mb-4">Agregar Nuevo To-Do</h1>

      {alert && <Alert variant="success">✅ ¡To-Do agregado con éxito!</Alert>}

      <Form onSubmit={handleSubmit} className="w-100" style={{ maxWidth: "500px" }}>
        <Form.Group className="mb-3">
          <Form.Label>Tarea</Form.Label>
          <Form.Control
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Escribe tu tarea..."
            required
          />
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Categoría</Form.Label>
          <Form.Select value={category} onChange={(e) => setCategory(e.target.value)}>
            {categories.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Prioridad</Form.Label>
          <Form.Select value={priority} onChange={(e) => setPriority(e.target.value)}>
            {priorities.map((prio) => (
              <option key={prio} value={prio}>
                {prio}
              </option>
            ))}
          </Form.Select>
        </Form.Group>

        <Form.Group className="mb-3">
          <Form.Label>Fecha Límite</Form.Label>
          <Form.Control
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
          />
        </Form.Group>

        <Form.Group className="mb-4">
          <Form.Label>Notas</Form.Label>
          <Form.Control
            as="textarea"
            rows={3}
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Agrega detalles adicionales..."
          />
        </Form.Group>

        <Button variant="primary" type="submit" className="w-100">
          Agregar To-Do
        </Button>
      </Form>
    </Container>
  );
};

export default ToDoList;
