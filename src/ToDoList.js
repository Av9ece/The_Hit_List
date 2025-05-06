import React, { useState, useEffect } from 'react';

function ToDoList() {
  const [tasks, setTasks] = useState([]);
  const [input, setInput] = useState('');

  // Load tasks from localStorage on initial mount
  useEffect(() => {
    const storedTasks = localStorage.getItem('tasks');
    if (storedTasks) {
      try {
        const parsed = JSON.parse(storedTasks);
        if (Array.isArray(parsed)) {
          setTasks(parsed);
        }
      } catch (error) {
        console.error('Error parsing tasks from localStorage:', error);
      }
    }
  }, []);

  // Save tasks to localStorage whenever tasks change
  useEffect(() => {
    if (tasks.length > 0) {
      localStorage.setItem('tasks', JSON.stringify(tasks));
    }
  }, [tasks]);

  // Add a task
  const addTask = () => {
    const trimmed = input.trim();
    if (!trimmed) return;
    setTasks([...tasks, { text: trimmed, done: false }]);
    setInput('');
  };

  // Remove a task
  const removeTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  // Toggle done/undone
  const toggleDone = (index) => {
    const updatedTasks = [...tasks];
    updatedTasks[index].done = !updatedTasks[index].done;
    setTasks(updatedTasks);
  };

  return (
    <div className="p-4 max-w-md mx-auto mt-10 bg-white rounded-xl shadow-md">
      <h2 className="text-xl font-bold mb-4">📝 To-Do List</h2>

      <div className="flex mb-4">
        <input
          className="border rounded-l px-3 py-2 w-full"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Add a task"
        />
        <button
          className="bg-blue-500 text-white px-4 rounded-r hover:bg-blue-600"
          onClick={addTask}
        >
          Add
        </button>
      </div>

      <ul className="list-disc pl-5 space-y-2">
        {tasks.map((task, index) => (
          <li
            key={index}
            className={`flex justify-between items-center px-3 py-2 rounded cursor-pointer ${
              task.done ? 'bg-green-100 text-gray-500 line-through' : 'bg-gray-100 text-black'
            }`}
          >
            <span
              onClick={() => toggleDone(index)}
              className="w-full"
              title="Click to mark as done"
            >
              {task.text}
            </span>
            <button
              onClick={() => removeTask(index)}
              className="text-red-500 hover:text-red-700 font-bold ml-4"
              aria-label={`Delete task ${index + 1}`}
            >
              ✕
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default ToDoList;
