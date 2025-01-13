import React, { useState } from 'react';
import Style from './style.css';

const App = () => {
  const [todos, setTodos] = useState([]);
  const [inputValue, setInputValue] = useState('');
  const [filter, setFilter] = useState('all'); // all, active, completed

  const handleSubmit = (e) => {
    e.preventDefault();
    if (inputValue.trim()) {
      setTodos([...todos, {
        id: Date.now(),
        text: inputValue.trim(),
        completed: false,
        createdAt: new Date()
      }]);
      setInputValue('');
    }
  };

  const toggleTodo = (id) => {
    setTodos(todos.map(todo =>
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const deleteTodo = (id) => {
    setTodos(todos.filter(todo => todo.id !== id));
  };

  const filteredTodos = todos.filter(todo => {
    if (filter === 'active') return !todo.completed;
    if (filter === 'completed') return todo.completed;
    return true;
  });

  return (
    <div className="mf1">
      <header className="header">
        <h1>MF1 Todo List</h1>
      </header>

      <main className="todo-container">
        {/* Add Todo Form */}
        <form onSubmit={handleSubmit} className="todo-form">
          <input
            type="text"
            value={inputValue}
            onChange={(e) => setInputValue(e.target.value)}
            placeholder="Add a new task..."
            className="todo-input"
          />
          <button type="submit" className="add-button">Add Task</button>
        </form>

        {/* Filter Buttons */}
        <div className="filter-buttons">
          <button 
            onClick={() => setFilter('all')}
            className={filter === 'all' ? 'active' : ''}
          >
            All
          </button>
          <button 
            onClick={() => setFilter('active')}
            className={filter === 'active' ? 'active' : ''}
          >
            Active
          </button>
          <button 
            onClick={() => setFilter('completed')}
            className={filter === 'completed' ? 'active' : ''}
          >
            Completed
          </button>
        </div>

        {/* Todo List */}
        <ul className="todo-list">
          {filteredTodos.map(todo => (
            <li key={todo.id} className="todo-item">
              <input
                type="checkbox"
                checked={todo.completed}
                onChange={() => toggleTodo(todo.id)}
              />
              <span className={todo.completed ? 'completed' : ''}>
                {todo.text}
              </span>
              <button 
                onClick={() => deleteTodo(todo.id)}
                className="delete-button"
              >
                Delete
              </button>
            </li>
          ))}
        </ul>

        {/* Todo Stats */}
        <div className="todo-stats">
          <p>Total tasks: {todos.length}</p>
          <p>Completed: {todos.filter(todo => todo.completed).length}</p>
          <p>Active: {todos.filter(todo => !todo.completed).length}</p>
        </div>
      </main>
    </div>
  );
};

export default App;