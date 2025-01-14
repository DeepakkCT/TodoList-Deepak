import React, { useState, useEffect } from 'react';
import './style.css';

const App = () => {
  const [todos, setTodos] = useState(() => {
    try {
      const saved = localStorage.getItem('app-todos');
      const parsedTodos = saved ? JSON.parse(saved) : [];
      console.log('Initial todos loaded:', parsedTodos);
      return parsedTodos;
    } catch (error) {
      console.error('Error loading todos:', error);
      return [];
    }
  });

  const [inputValue, setInputValue] = useState('');

  useEffect(() => {
    try {
      localStorage.setItem('app-todos', JSON.stringify(todos));
      console.log('Todos saved:', todos);

      const stats = {
        total: todos.length,
        completed: todos.filter(todo => todo.completed).length
      };

      localStorage.setItem('app-stats', JSON.stringify(stats));
      console.log('Stats saved:', stats);

      const event = new CustomEvent('STATS_UPDATED', { detail: stats });
      window.dispatchEvent(event);
      console.log('Stats broadcasted');
    } catch (error) {
      console.error('Error saving data:', error);
    }
  }, [todos]);

  const handleAddTodo = () => {
    if (inputValue.trim()) {
      const newTodo = {
        id: Date.now(),
        text: inputValue.trim(),
        completed: false
      };
      setTodos(prev => [...prev, newTodo]);
      setInputValue('');
    }
  };

  const handleToggleComplete = (id) => {
    setTodos(prev => prev.map(todo => 
      todo.id === id ? { ...todo, completed: !todo.completed } : todo
    ));
  };

  const handleDelete = (id) => {
    setTodos(prev => prev.filter(todo => todo.id !== id));
  };

  const handleShowStatus = () => {
    window.dispatchEvent(new Event('switchToMF2'));
  };

  return (
    <div className="mf1">
      <div className="todo-input">
        <input
          type="text"
          value={inputValue}
          onChange={(e) => setInputValue(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && handleAddTodo()}
          placeholder="Enter a new todo"
        />
        <button onClick={handleAddTodo}>Add Todo</button>
        <button onClick={handleShowStatus} className="status-button">Show Status</button>
      </div>

      <ul className="todo-list">
        {todos.map(todo => (
          <li key={todo.id} className={todo.completed ? 'completed' : ''}>
            <input
              type="checkbox"
              checked={todo.completed}
              onChange={() => handleToggleComplete(todo.id)}
            />
            <span>{todo.text}</span>
            <button onClick={() => handleDelete(todo.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default App;