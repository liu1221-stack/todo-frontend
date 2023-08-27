import React, { useState, useEffect } from 'react';
import axios from 'axios';

const Todo = () => {
  const [todos, setTodos] = useState([]);
  const [todoTitle, setTodoTitle] = useState('');
  const [todoDescription, setTodoDescription] = useState('');

  useEffect(() => {
    fetchTodos();
  }, []);

  const fetchTodos = async () => {
    try {
      const response = await axios.get('/api/todos'); // Replace with your backend API endpoint
      setTodos(response.data);
    } catch (error) {
      console.error('Error fetching todos:', error);
    }
  };

  const handleAddTodo = async () => {
    try {
      const response = await axios.post('/api/todos', {
        todo_title: todoTitle,
        todo_description: todoDescription,
      }); // Replace with your backend API endpoint
      setTodoTitle('');
      setTodoDescription('');
      fetchTodos();
    } catch (error) {
      console.error('Error adding todo:', error);
    }
  };

  const handleDeleteTodo = async (todoId) => {
    try {
      await axios.delete(`/api/todos/${todoId}`); // Replace with your backend API endpoint
      fetchTodos();
    } catch (error) {
      console.error('Error deleting todo:', error);
    }
  };

  return (
    <div>
      <h1>Todo App</h1>
      <div>
        <input
          type="text"
          value={todoTitle}
          onChange={(e) => setTodoTitle(e.target.value)}
          placeholder="Todo Title"
        />
        <input
          type="text"
          value={todoDescription}
          onChange={(e) => setTodoDescription(e.target.value)}
          placeholder="Todo Description"
        />
        <button onClick={handleAddTodo}>Add Todo</button>
      </div>
      <ul>
        {todos.map((todo) => (
          <li key={todo.todo_id}>
            {todo.todo_title} - {todo.todo_description}
            <button onClick={() => handleDeleteTodo(todo.todo_id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Todo;
