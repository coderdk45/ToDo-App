import React, { useState, useEffect } from 'react';
import './App.css';
import TodoList from './component/TodoList';

function App() {
  const [todos, setTodos] = useState([]);

  useEffect(() => {
    const storedTodos = JSON.parse(localStorage.getItem('todos')) || [];
    setTodos(storedTodos);
  }, []);

  useEffect(() => {
    localStorage.setItem('todos', JSON.stringify(todos));
  }, [todos]);

  const addTodo = (text) => {
    setTodos([...todos, { text, id: Date.now() }]);
  };

  const removeTodo = (id) => {
    const updatedTodos = todos.filter((todo) => todo.id !== id);
    setTodos(updatedTodos);
  };

  return (
    <div className="card">
      <div className="card-header">ToDo App</div>
      <div className="card-body">
        <input
          type="text"
          placeholder="Add a new text"
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              addTodo(e.target.value);
              e.target.value = '';
            }
          }}
        />
      </div>
      <TodoList todos={todos} removeTodo={removeTodo} />
    </div>
  );
}

export default App;
