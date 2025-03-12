"use client";

import React, { useState, useEffect, useContext } from 'react';
import { Container, Form, Button, ListGroup, Badge } from 'react-bootstrap';
import { UserContext } from '../../contexts/UserContext';
import { db } from '../../firebase';
import { collection, addDoc, onSnapshot, doc, deleteDoc, updateDoc } from 'firebase/firestore';

interface Todo {
    id: string;
    text: string;
    completed: boolean;
    category: string;
    priority: string;
    dueDate: string;
    notes: string;
}

const TodoList: React.FC = () => {
    const [todos, setTodos] = useState<Todo[]>([]);
    const [inputValue, setInputValue] = useState('');
    const [category, setCategory] = useState('Personal');
    const [priority, setPriority] = useState('Baja');
    const [dueDate, setDueDate] = useState('');
    const [notes, setNotes] = useState('');
    const [darkMode, setDarkMode] = useState(false);
    const { user } = useContext(UserContext);

    useEffect(() => {
        if (user) {
            const todoCollection = collection(db, 'users', user.uid, 'todos');
            const unsubscribe = onSnapshot(todoCollection, (snapshot) => {
                const todosData = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() } as Todo));
                setTodos(todosData);
            });
            return unsubscribe;
        } else {
            setTodos([]);
        }
    }, [user]);

    const handleAddTodo = async () => {
        if (inputValue.trim() !== '' && user) {
            try {
                const todoCollection = collection(db, 'users', user.uid, 'todos');
                await addDoc(todoCollection, {
                    text: inputValue,
                    completed: false,
                    category,
                    priority,
                    dueDate,
                    notes,
                });
                setInputValue('');
                setDueDate('');
                setNotes('');
            } catch (error) {
                console.error("Error adding todo:", error);
            }
        }
    };

    const handleToggleTodo = async (id: string, completed: boolean) => {
        if (user) {
            try {
                const todoDoc = doc(db, 'users', user.uid, 'todos', id);
                await updateDoc(todoDoc, { completed: !completed });
            } catch (error) {
                console.error("Error toggling todo:", error);
            }
        }
    };

    const handleDeleteTodo = async (id: string) => {
        if (user) {
            try {
                const todoDoc = doc(db, 'users', user.uid, 'todos', id);
                await deleteDoc(todoDoc);
            } catch (error) {
                console.error("Error deleting todo:", error);
            }
        }
    };

    const getPriorityColor = (priority: string) => {
        switch (priority) {
            case 'Alta':
                return 'danger';
            case 'Media':
                return 'warning';
            case 'Baja':
                return 'info';
            default:
                return 'secondary';
        }
    };

    const getCategoryColor = (category: string) => {
        switch (category) {
            case 'Personal':
                return 'success';
            case 'Trabajo':
                return 'primary';
            case 'Compras':
                return 'info';
            case 'Estudio':
                return 'warning';
            default:
                return 'secondary';
        }
    };

    return (
        <Container className={`p-4 rounded ${darkMode ? 'bg-dark text-white' : 'bg-light'}`} style={{ maxWidth: "600px" }}>
            <h1 className="text-center mb-4">To-Do List</h1>
            
            <Form.Check
                type="switch"
                id="dark-mode-switch"
                label="Modo Oscuro"
                checked={darkMode}
                onChange={() => setDarkMode(!darkMode)}
                className="mb-3"
            />

            <Form className="mb-4">
                <Form.Group className="mb-3">
                    <Form.Label>Nueva Tarea</Form.Label>
                    <Form.Control
                        type="text"
                        placeholder="Ingresa una tarea"
                        value={inputValue}
                        onChange={(e) => setInputValue(e.target.value)}
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Categoría</Form.Label>
                    <Form.Select value={category} onChange={(e) => setCategory(e.target.value)}>
                        <option value="Personal">Personal</option>
                        <option value="Trabajo">Trabajo</option>
                        <option value="Compras">Compras</option>
                        <option value="Estudio">Estudio</option>
                    </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Prioridad</Form.Label>
                    <Form.Select value={priority} onChange={(e) => setPriority(e.target.value)}>
                        <option value="Baja">Baja</option>
                        <option value="Media">Media</option>
                        <option value="Alta">Alta</option>
                    </Form.Select>
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Fecha de Vencimiento</Form.Label>
                    <Form.Control
                        type="date"
                        value={dueDate}
                        onChange={(e) => setDueDate(e.target.value)}
                    />
                </Form.Group>

                <Form.Group className="mb-3">
                    <Form.Label>Notas</Form.Label>
                    <Form.Control
                        as="textarea"
                        rows={3}
                        value={notes}
                        onChange={(e) => setNotes(e.target.value)}
                    />
                </Form.Group>

                <Button variant="primary" onClick={handleAddTodo} className="w-100">
                    Agregar Tarea
                </Button>
            </Form>

            <ListGroup>
                {todos.map(todo => (
                    <ListGroup.Item
                        key={todo.id}
                        className="d-flex justify-content-between align-items-center"
                        style={{
                            backgroundColor: todo.completed ? '#f8f9fa' : 'white',
                            transition: '0.3s ease',
                            cursor: 'pointer'
                        }}
                        onClick={() => handleToggleTodo(todo.id, todo.completed)}
                    >
                        <div>
                            <strong>{todo.text}</strong>
                            <div className="mt-1">
                                <Badge bg={getCategoryColor(todo.category)} className="me-2">{todo.category}</Badge>
                                <Badge bg={getPriorityColor(todo.priority)}>{todo.priority}</Badge>
                            </div>
                            <small className="d-block text-muted mt-1">📅 {todo.dueDate}</small>
                            <small className="d-block text-muted">📝 {todo.notes}</small>
                        </div>
                        <Button variant="outline-danger" size="sm" onClick={() => handleDeleteTodo(todo.id)}>
                            ❌
                        </Button>
                    </ListGroup.Item>
                ))}
            </ListGroup>
        </Container>
    );
};

export default TodoList;
