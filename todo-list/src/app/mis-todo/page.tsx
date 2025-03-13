"use client";

import React, { useEffect, useState, useContext } from "react";
import { Container, Card, Button } from "react-bootstrap";
import { UserContext } from "../../contexts/UserContext";
import { db } from "../../firebase";
import { collection, onSnapshot, doc, deleteDoc, updateDoc } from "firebase/firestore";

interface Todo {
  id: string;
  text: string;
  completed: boolean;
  category: string;
  priority: string;
  dueDate: string;
  notes: string;
}

const MisToDo: React.FC = () => {
  const [todos, setTodos] = useState<Todo[]>([]);
  
  // Obtiene el contexto, asegurando que no sea null
  const userContext = useContext(UserContext);
  const user = userContext?.user || null; // Evita errores si el contexto es null

  // ✅ Siempre llamar useEffect, manejar la condición dentro
  useEffect(() => {
    if (!user) {
      setTodos([]);
      return;
    }

    const todoCollection = collection(db, "users", user.uid, "todos");
    const unsubscribe = onSnapshot(todoCollection, (snapshot) => {
      const todosData = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as Todo[];
      setTodos(todosData);
    });

    return () => unsubscribe();
  }, [user]); // Depende de `user`

  const handleToggleTodo = async (id: string, completed: boolean) => {
    if (!user) return;
    try {
      const todoDoc = doc(db, "users", user.uid, "todos", id);
      await updateDoc(todoDoc, { completed: !completed });
    } catch (error) {
      console.error("Error al actualizar To-Do:", error);
    }
  };

  const handleDeleteTodo = async (id: string) => {
    if (!user) return;
    try {
      const todoDoc = doc(db, "users", user.uid, "todos", id);
      await deleteDoc(todoDoc);
    } catch (error) {
      console.error("Error al eliminar To-Do:", error);
    }
  };

  // Función para obtener color según prioridad
  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case "Alta": return "#ff4d4d"; // Rojo
      case "Media": return "#ffcc00"; // Amarillo
      case "Baja": return "#66ccff"; // Azul
      default: return "#cccccc"; // Gris
    }
  };

  // Función para obtener color según categoría
  const getCategoryColor = (category: string) => {
    switch (category) {
      case "Personal": return "#99ff99"; // Verde claro
      case "Trabajo": return "#ff6666"; // Rojo claro
      case "Compras": return "#66b3ff"; // Azul claro
      case "Estudio": return "#ff9966"; // Naranja claro
      default: return "#cccccc"; // Gris
    }
  };

  return (
    <Container className="mt-4">
      <h1 className="text-center mb-4">Mis To-Do</h1>
      <div className="d-flex flex-wrap justify-content-center gap-3">
        {todos.length > 0 ? (
          todos.map((todo) => (
            <Card
              key={todo.id}
              className="shadow p-3"
              style={{
                width: "18rem",
                borderLeft: `6px solid ${getPriorityColor(todo.priority)}`,
                borderRadius: "10px",
                transition: "transform 0.2s ease",
                backgroundColor: todo.completed ? "#f0f0f0" : "white",
              }}
            >
              <Card.Body>
                <Card.Title
                  className="mb-2"
                  style={{
                    textDecoration: todo.completed ? "line-through" : "none",
                    cursor: "pointer",
                    fontWeight: "bold",
                  }}
                  onClick={() => handleToggleTodo(todo.id, todo.completed)}
                >
                  {todo.text}
                </Card.Title>

                <Card.Text>
                  <span
                    className="badge me-2"
                    style={{
                      backgroundColor: getCategoryColor(todo.category),
                      color: "black",
                      padding: "5px 10px",
                      borderRadius: "5px",
                    }}
                  >
                    {todo.category}
                  </span>

                  <span
                    className="badge"
                    style={{
                      backgroundColor: getPriorityColor(todo.priority),
                      color: "white",
                      padding: "5px 10px",
                      borderRadius: "5px",
                    }}
                  >
                    {todo.priority}
                  </span>
                </Card.Text>

                <Card.Text className="mt-2">
                  <strong>Fecha Límite:</strong> {todo.dueDate || "No asignada"}
                </Card.Text>

                {todo.notes && (
                  <Card.Text>
                    <strong>Notas:</strong> {todo.notes}
                  </Card.Text>
                )}

                <div className="d-flex justify-content-between mt-3">
                  <Button
                    variant={todo.completed ? "secondary" : "success"}
                    size="sm"
                    onClick={() => handleToggleTodo(todo.id, todo.completed)}
                  >
                    {todo.completed ? "Desmarcar" : "Completado"}
                  </Button>

                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => handleDeleteTodo(todo.id)}
                  >
                    Eliminar
                  </Button>
                </div>
              </Card.Body>
            </Card>
          ))
        ) : (
          <p className="text-center text-muted">No tienes To-Dos pendientes.</p>
        )}
      </div>
    </Container>
  );
};

export default MisToDo;
