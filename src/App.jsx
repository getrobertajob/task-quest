// src/App.jsx
import React, { useState, useEffect } from 'react';
import './styles/App.css';
import ToDoList from './components/ToDoList';
import Character from './components/Character';

function App() {
  const [points, setPoints] = useState(0);
  const [tasks, setTasks] = useState([]); // Manage task state here
  const [isAnimationPlaying, setIsAnimationPlaying] = useState(false);
  const [experience, setExperience] = useState(0); // Experience state
  const [level, setLevel] = useState(1); // Level state

  const handleTaskComplete = (index) => {
    const newTasks = tasks.map((task, idx) =>
      idx === index ? { ...task, completed: true } : task
    );
    setTasks(newTasks); // Update task state

    // Calculate points based on completion
    const earnedPoints = newTasks[index].completed ? 10 : 5;
    setPoints((prevPoints) => prevPoints + earnedPoints);

    // Calculate 25% of the total experience needed to level up for the current level
    const experienceToLevelUp = level * 10;
    const experienceGain = experienceToLevelUp * 0.25;

    // Add the calculated experience gain to the current experience
    setExperience((prevExperience) => prevExperience + experienceGain);
  };

  const addTask = (task) => {
    setTasks((prevTasks) => [...prevTasks, task]);
  };

  useEffect(() => {
    // Check if there are any incomplete tasks
    const incompleteTasks = tasks.some((task) => !task.completed);
    setIsAnimationPlaying(incompleteTasks); // Play if there are incomplete tasks, pause if all are complete
  }, [tasks]);

  return (
    <div className="App">
      <h1>TaskQuest: The To-Do List Saga</h1>
      <ToDoList tasks={tasks} onTaskComplete={handleTaskComplete} addTask={addTask} /> {/* Pass tasks as prop */}
      <Character
        points={points}
        tasks={tasks}
        experience={experience}
        setExperience={setExperience}
        level={level}
        setLevel={setLevel}
        isAnimationPlaying={isAnimationPlaying}  // Pass the play state to Character
      />
    </div>
  );
}

export default App;
