'use client';
import React, { useState, useEffect } from 'react';
import { Container, Form, Button, ListGroup } from 'react-bootstrap';
import './TodoList.css';


interface Todo {
    id: number;
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

    useEffect(() => {
        if (darkMode) {
            document.body.classList.add('dark-mode');
        } else {
            document.body.classList.remove('dark-mode');
        }
    }, [darkMode]);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    };

    const handleCategoryChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setCategory(e.target.value);
    };

    const handlePriorityChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
        setPriority(e.target.value);
    };

    const handleDueDateChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setDueDate(e.target.value);
    };

    const handleNotesChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
        setNotes(e.target.value);
    };

    const handleAddTodo = () => {
        if (inputValue.trim() !== '') {
            setTodos([
                ...todos,
                {
                    id: Date.now(),
                    text: inputValue,
                    completed: false,
                    category,
                    priority,
                    dueDate,
                    notes,
                },
            ]);
            setInputValue('');
            setDueDate('');
            setNotes('');
        }
    };

    const handleToggleTodo = (id: number) => {
        setTodos(todos.map(todo => todo.id === id ? { ...todo, completed: !todo.completed } : todo));
    };

    const handleDeleteTodo = (id: number) => {
        setTodos(todos.filter(todo => todo.id !== id));
    };

    const getPriorityColor = (priority: string) => {
        switch (priority) {
            case 'Alta':
                return 'red';
            case 'Media':
                return 'yellow';
            case 'Baja':
                return 'lightblue';
            default:
                return 'gray';
        }
    };

    const getCategoryColor = (category: string) => {
        switch (category) {
            case 'Personal':
                return 'lightgreen';
            case 'Trabajo':
                return 'lightcoral';
            case 'Compras':
                return 'lightskyblue';
            case 'Estudio':
                return 'lightsalmon';
            default:
                return 'gray';
        }
    };

    return (
        <div className="notebook-container">
            <Container className="notebook-page">
                <h1 className="text-center mb-4">To-Do List</h1>
                <Form.Check
                        type="switch"
                        id="dark-mode-switch"
                        label="Modo Oscuro"
                        checked={darkMode}
                        onChange={() => setDarkMode(!darkMode)}
                        style={{ marginLeft: 'auto' }}
                    />
                <Form className="mb-4">
                    <Form.Group className="mb-3">
                        <Form.Control
                            type="text"
                            placeholder="Add new todo"
                            value={inputValue}
                            onChange={handleInputChange}
                            className="rounded-0"
                        />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Categoría</Form.Label>
                        <Form.Select value={category} onChange={handleCategoryChange}>
                            <option value="Personal">Personal</option>
                            <option value="Trabajo">Trabajo</option>
                            <option value="Compras">Compras</option>
                            <option value="Estudio">Estudio</option>
                        </Form.Select>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Prioridad</Form.Label>
                        <Form.Select value={priority} onChange={handlePriorityChange}>
                            <option value="Baja">Baja</option>
                            <option value="Media">Media</option>
                            <option value="Alta">Alta</option>
                        </Form.Select>
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Fecha de Vencimiento</Form.Label>
                        <Form.Control type="date" value={dueDate} onChange={handleDueDateChange} />
                    </Form.Group>
                    <Form.Group className="mb-3">
                        <Form.Label>Notas</Form.Label>
                        <Form.Control as="textarea" placeholder="Notes" value={notes} onChange={handleNotesChange} />
                    </Form.Group>
                    <Button variant="primary" onClick={handleAddTodo} className="rounded-0">
                        Añadir to do
                    </Button>
                </Form>
                <ListGroup>
                    {todos.map(todo => (
                        <ListGroup.Item
                            key={todo.id}
                            className="d-flex flex-column align-items-start border-0 rounded-0 mb-2 shadow-sm"
                            style={{
                                backgroundColor: todo.completed ? '#f0f0f0' : 'white',
                                transition: 'background-color 0.3s ease',
                            }}
                        >
                            <div
                                style={{
                                    textDecoration: todo.completed ? 'line-through' : 'none',
                                    cursor: 'pointer',
                                    transition: 'text-decoration 0.3s ease',
                                }}
                                onClick={() => handleToggleTodo(todo.id)}
                            >
                                {todo.text}
                            </div>
                            <div className="todo-details">
                                <small style={{ backgroundColor: getCategoryColor(todo.category) }}>Category: {todo.category}</small>
                                <small style={{ backgroundColor: getPriorityColor(todo.priority) }}>Priority: {todo.priority}</small>
                                <small>Due Date: {todo.dueDate}</small>
                                <small>Notes: {todo.notes}</small>
                            </div>
                            <Button
                                variant="danger"
                                size="sm"
                                onClick={() => handleDeleteTodo(todo.id)}
                                className="mt-2 rounded-0"
                            >
                                Delete
                            </Button>
                        </ListGroup.Item>
                    ))}
                </ListGroup>
            </Container>
        </div>
    );
};

export default TodoList;