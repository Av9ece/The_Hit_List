import React, { Component, useState } from 'react';

function ToDoList() {
    const [tasks, setTasks] = useState([]);
    const [input, setInput] = useState('');

    const addTask = () => {
        if (!input.trim()) return;
        setTasks([...tasks, input]);
        setInput('');
    };

    const removeTask = (index) => {
        const updated = tasks.filter((_, i) => i !== index);
        setTasks(updated);
    };

    return (
        <div className='p-4 max-w-md mx-auto mt-10 bg-white rounded-xl shadow-md'>
            <h2 className="text-xl font-bold mb-4">📝 To-Do List</h2>
            <div className='flex mb-4'>
                <input
                    className='border rounded-1 px-3 py-2 w-full'
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder='Add a task'
                />
                <button
                    className='bg-blue-500 text-white px-4 rounded-r hover:bg-blue-600'
                    onClick={addTask}
                >
                    Add
                </button>
            </div>
            <ul className='List-disc pl-5 space-y-2'>
                {tasks.map((task, index) => (
                    <li key={index} className='flex justify-between items-center bg-gray-100 px-3 py-2 rounded'>
                        <span>{task}</span>
                        <button
                            onClick={() => removeTask(index)}
                           className='text-ted-500 hover:text-red-700'
                        >
                            ✕
                        </button> 
                    </li>
                ))}
            </ul> 
        </div>

    )
}

export default ToDoList;