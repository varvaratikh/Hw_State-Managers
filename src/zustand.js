import React, { useState } from 'react';
import create from 'zustand';

const useStore = create((set) => ({
    todos: [],
    addTodo: (todo) => set((state) => ({ todos: [...state.todos, todo] })),
    toggleTodo: (index) =>
        set((state) => ({
            todos: state.todos.map((todo, i) =>
                i === index ? { ...todo, completed: !todo.completed } : todo
            ),
        })),
    deleteTodo: (index) => set((state) => ({ todos: state.todos.filter((_, i) => i !== index) })),
}));

const ZustandApp = () => {
    const [todoText, setTodoText] = useState('');
    const { todos, addTodo, toggleTodo, deleteTodo } = useStore();

    const handleAddTodo = () => {
        if (todoText.trim() !== '') {
            addTodo({ text: todoText, completed: false });
            setTodoText('');
        }
    };

    const handleToggleTodo = (index) => {
        toggleTodo(index);
    };

    const handleDeleteTodo = (index) => {
        deleteTodo(index);
    };

    return (
        <div>
            <h1 className="center">ToDo List (Zustand)</h1>
            <form className="todo-form">
                <input
                    type="text"
                    className="todo-input"
                    placeholder="Add todo"
                    value={todoText}
                    onChange={(e) => setTodoText(e.target.value)}
                />
                <button type="button" onClick={handleAddTodo}>
                    Add
                </button>
            </form>
            <div className="todo-list">
                {todos.map((todo, index) => (
                    <div
                        key={index}
                        className={`todo-item ${todo.completed ? 'completed' : ''}`}
                    >
                        <span>{todo.text}</span>
                        <button onClick={() => handleDeleteTodo(index)}>Delete</button>
                        <button onClick={() => handleToggleTodo(index)}>Complete</button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ZustandApp;
