// src/components/TodoApp/TodoApp.jsx
import React, { useState } from 'react';
import { PlusCircle, CheckCircle, ClipboardCheck, XCircle } from 'lucide-react';

function TodoApp({ todos, addTodo, toggleTodo, deleteTodo }) {
  const [newTodoText, setNewTodoText] = useState('');

  const handleAddTodo = () => {
    addTodo(newTodoText);
    setNewTodoText('');
  };

  return (
    <div className="homePageTodoApp">
      <h2 className="todoAppTitle">My To-Do List</h2>
      <div className="todoInputContainer">
        <input
          type="text"
          className="todoInputField"
          placeholder="Add a new task..."
          value={newTodoText}
          onChange={(e) => setNewTodoText(e.target.value)}
          onKeyPress={(e) => {
            if (e.key === 'Enter') {
              handleAddTodo();
            }
          }}
        />
        <button onClick={handleAddTodo} className="addTodoButton">
          <PlusCircle size={20} /> Add
        </button>
      </div>
      <ul className="todoList">
        {todos.map(todo => (
          <li key={todo.id} className={`todoItem ${todo.completed ? 'todoItemCompleted' : ''}`}>
            <span className="todoText">{todo.text}</span>
            <div className="todoActions">
              <button onClick={() => toggleTodo(todo.id)} className="todoActionButton todoActionButtonToggle">
                {todo.completed ? <CheckCircle size={20} /> : <ClipboardCheck size={20} />}
              </button>
              <button onClick={() => deleteTodo(todo.id)} className="todoActionButton todoActionButtonDelete">
                <XCircle size={20} />
              </button>
            </div>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TodoApp;