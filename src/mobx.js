import React, { useState } from 'react';
import { makeAutoObservable } from 'mobx';
import { observer } from 'mobx-react-lite';

class TodoStore {
    todos = [];

    constructor() {
        makeAutoObservable(this);
    }

    addTodo = (todo) => {
        this.todos.push(todo);
    };

    toggleTodo = (index) => {
        this.todos[index].completed = !this.todos[index].completed;
    };

    deleteTodo = (index) => {
        this.todos.splice(index, 1);
    };
}

const store = new TodoStore();

const MobXApp = observer(() => {
    const [todoText, setTodoText] = useState('');

    const handleAddTodo = () => {
        if (todoText.trim() !== '') {
            store.addTodo({ text: todoText, completed: false });
            setTodoText('');
        }
    };

    const handleToggleTodo = (index) => {
        store.toggleTodo(index);
    };

    const handleDeleteTodo = (index) => {
        store.deleteTodo(index);
    };

    return (
        <div>
            <h1 className="center">ToDo List (MobX)</h1>
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
                {store.todos.map((todo, index) => (
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
});

export default MobXApp;
