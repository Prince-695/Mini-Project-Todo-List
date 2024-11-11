// src/components/TodoList.jsx
import React, { useState } from 'react';

const TodoList = () => {
  const [todos, setTodos] = useState([]);
  const [savedTodos, setSavedTodos] = useState([]);
  const [input, setInput] = useState('');
  const [editIndex, setEditIndex] = useState(null);
  const [theme, setTheme] = useState('light');
  const [activeSection, setActiveSection] = useState('todo');

  const handleAddTodo = () => {
    if (input.trim()) {
      if (editIndex !== null) {
        const updatedTodos = [...todos];
        updatedTodos[editIndex] = input;
        setTodos(updatedTodos);
        setEditIndex(null);
      } else {
        setTodos([...todos, input]);
      }
      setInput('');
    }
  };

  const handleDeleteTodo = (index) => {
    setTodos(todos.filter((_, i) => i !== index));
  };

  const handleEditTodo = (index) => {
    setInput(todos[index]);
    setEditIndex(index);
  };

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
    document.documentElement.setAttribute('data-theme', theme === 'light' ? 'dark' : 'light');
  };

  const handleSaveTodo = (index) => {
    setSavedTodos([...savedTodos, todos[index]]);
    handleDeleteTodo(index);
  };

  const handleDeleteSavedTodo = (index) => {
    setSavedTodos(savedTodos.filter((_, i) => i !== index));
  };

  return (
    <div className="flex min-h-screen bg-base-200">
      {/* Sidebar */}
      <div className="w-64 p-6 bg-base-100 shadow-xl flex flex-col justify-between">
        <div>
          {/* Theme Toggle */}
          <div className="flex justify-end mb-8">
            <span className="text-s mr-2 mt-0.5">{theme === 'light' ? 'Light' : 'Dark'}</span>
            <input
              type="checkbox"
              className="toggle toggle-lg toggle-info"
              checked={theme === 'dark'}
              onChange={toggleTheme}
            />
          </div>

          {/* Menu */}
          <h2 className="text-3xl font-bold text-center mb-6">Menu</h2>
          <ul className="space-y-4">
            <li>
              <button
                className={`btn w-full ${activeSection === 'todo' ? 'btn-primary' : 'btn-outline'}`}
                onClick={() => setActiveSection('todo')}
              >
                To-Do List
              </button>
            </li>
            <li>
              <button
                className={`btn w-full ${activeSection === 'saved' ? 'btn-primary' : 'btn-outline'}`}
                onClick={() => setActiveSection('saved')}
              >
                Saved Items
              </button>
            </li>
          </ul>
        </div>

        {/* Footer */}
        <footer className="mt-12 text-center text-sm text-gray-500">
          Made by <span className="font-bold">Prince Rathod</span>
        </footer>
      </div>

      {/* Main Section */}
      <div className="flex-1 flex justify-center items-center">
        <div className="w-full max-w-2xl p-8 rounded-lg shadow-2xl bg-base-100">
          <h1 className="text-4xl font-bold mb-8 text-center text-primary">
            {activeSection === 'todo' ? 'To-Do List' : 'Saved Items'}
          </h1>

          {activeSection === 'todo' ? (
            <>
              <div className="flex mb-6 space-x-2">
                <input
                  type="text"
                  className="input input-bordered w-full shadow-inner"
                  value={input}
                  onChange={(e) => setInput(e.target.value)}
                  placeholder="Add or edit a task"
                />
                <button className="btn btn-primary shadow-lg px-6" onClick={handleAddTodo}>
                  {editIndex !== null ? 'Update' : 'Add'}
                </button>
              </div>

              <ul className="list-none space-y-4">
                {todos.map((todo, index) => (
                  <li
                    key={index}
                    className="flex justify-between items-center py-4 px-6 border rounded-md shadow-md bg-base-100"
                  >
                    <span className="text-lg">{todo}</span>
                    <div className="space-x-3">
                      <button className="btn btn-info btn-sm" onClick={() => handleEditTodo(index)}>
                        Edit
                      </button>
                      <button className="btn btn-warning btn-sm" onClick={() => handleSaveTodo(index)}>
                        Save
                      </button>
                      <button className="btn btn-error btn-sm" onClick={() => handleDeleteTodo(index)}>
                        Delete
                      </button>
                    </div>
                  </li>
                ))}
              </ul>
            </>
          ) : (
            <ul className="list-none space-y-4">
              {savedTodos.map((todo, index) => (
                <li
                  key={index}
                  className="flex justify-between items-center py-4 px-6 border rounded-md shadow-md bg-base-100"
                >
                  <span className="text-lg">{todo}</span>
                  <button className="btn btn-error btn-sm" onClick={() => handleDeleteSavedTodo(index)}>
                    Delete
                  </button>
                </li>
              ))}
            </ul>
          )}
        </div>
      </div>
    </div>
  );
};

export default TodoList;
