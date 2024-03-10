import React, { useState } from 'react';
import { createStore } from 'redux';
import { Provider, useDispatch, useSelector } from 'react-redux';

const ADD_TODO = 'ADD_TODO';
const TOGGLE_TODO = 'TOGGLE_TODO';
const DELETE_TODO = 'DELETE_TODO';

const initialState = { todos: [] };

function reducer(state = initialState, action) {
    switch (action.type) {
        case ADD_TODO:
            return { todos: [...state.todos, action.payload] };
        case TOGGLE_TODO:
            return {
                todos: state.todos.map((todo, index) =>
                    index === action.payload ? { ...todo, completed: !todo.completed } : todo
                ),
            };
        case DELETE_TODO:
            return { todos: state.todos.filter((todo, index) => index !== action.payload) };
        default:
            return state;
    }
}

const store = createStore(reducer);

export function ReduxApp() {
    return (
        <Provider store={store}>
            <TodoApp />
        </Provider>
    );
}

function TodoApp() {
    const dispatch = useDispatch();
    const todos = useSelector((state) => state.todos);
    const [todoText, setTodoText] = useState('');

    const handleAddTodo = () => {
        if (todoText.trim() !== '') {
            dispatch({ type: ADD_TODO, payload: { text: todoText, completed: false } });
            setTodoText('');
        }
    };

    const handleToggleTodo = (index) => {
        dispatch({ type: TOGGLE_TODO, payload: index });
    };

    const handleDeleteTodo = (index) => {
        dispatch({ type: DELETE_TODO, payload: index });
    };

    return (
        <div>
            <h1 className="center">ToDo List (Redux)</h1>
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
}