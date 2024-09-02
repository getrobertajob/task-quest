// src/components/ToDoList.jsx
import React, { useState } from 'react';

const ToDoList = ({ tasks, onTaskComplete, addTask }) => {
  const [taskName, setTaskName] = useState('');

  const handleAddTask = () => {
    if (taskName.trim() !== '') {
      const newTask = { name: taskName, completed: false };
      addTask(newTask); // Add task through prop function
      setTaskName('');
    }
  };

  return (
    <div>
      <h2>To-Do List</h2>
      <input
        type="text"
        value={taskName}
        onChange={(e) => setTaskName(e.target.value)}
        placeholder="Enter task name"
      />
      <button onClick={handleAddTask}>Add Task</button>
      
      {/* Display the list of tasks */}
      <ul>
        {tasks.map((task, index) => (
          <li key={index}>
            <span style={{ textDecoration: task.completed ? 'line-through' : 'none' }}>
              {task.name}
            </span>
            {!task.completed && (
              <button onClick={() => onTaskComplete(index)}>Complete</button> // Call parent function directly
            )}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ToDoList;
