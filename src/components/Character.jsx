// src/components/Character.jsx
import React, { useEffect, useState } from 'react';
import Animation from './Animation'; // Import the Animation component

const Character = ({ points, tasks, experience, setExperience, level, setLevel, isAnimationPlaying }) => {
  const [health, setHealth] = useState(100); // Current health
  const [maxHealth, setMaxHealth] = useState(100); // Maximum health
  const [showLevelUpArrow, setShowLevelUpArrow] = useState(false); // State to control arrow visibility
  const [healthChangeMessages, setHealthChangeMessages] = useState([]); // State to manage health change messages

  // Decrease health by a random percentage between 1% and 10% of max health every 5 seconds if there are incomplete tasks
  useEffect(() => {
    const decrementHealth = () => {
      if (tasks.some((task) => !task.completed)) {
        // Calculate random damage between 1% and 10% of max health
        const randomPercentage = Math.random() * 9 + 1; // Generates a number between 1 and 10
        const damage = (randomPercentage / 100) * maxHealth;
        
        setHealth((prevHealth) => {
          const newHealth = Math.max(prevHealth - damage, 0); // Ensure health does not go below 0
          const changeAmount = -(prevHealth - newHealth).toFixed(2);
          showHealthChange(changeAmount, 'red'); // Show decrease message
          return newHealth;
        });
      }
    };

    const interval = setInterval(decrementHealth, 5000); // 5000 ms = 5 seconds

    return () => clearInterval(interval); // Clear interval on component unmount or when tasks change
  }, [tasks, maxHealth]); // Added maxHealth to dependency array

  // Increase health by a random percentage between 10% and 25% of max health every 12.5 seconds
  useEffect(() => {
    const regenerateHealth = () => {
      // Calculate random healing between 10% and 25% of max health
      const randomPercentage = Math.random() * 15 + 10; // Generates a number between 10 and 25
      const healing = (randomPercentage / 100) * maxHealth;

      setHealth((prevHealth) => {
        const newHealth = Math.min(prevHealth + healing, maxHealth); // Ensure health does not exceed maxHealth
        const changeAmount = (newHealth - prevHealth).toFixed(2);
        showHealthChange(changeAmount, 'green'); // Show increase message
        return newHealth;
      });
    };

    const interval = setInterval(regenerateHealth, 12500); // 12500 ms = 12.5 seconds

    return () => clearInterval(interval); // Clear interval on component unmount
  }, [maxHealth]); // Added maxHealth to dependency array

  useEffect(() => {
    // Function to increment experience if there are uncompleted tasks
    const incrementExperience = () => {
      if (tasks.some((task) => !task.completed)) {
        setExperience((exp) => exp + 1);
      }
    };

    const interval = setInterval(incrementExperience, 1000); // Adjust idle interval as needed

    return () => clearInterval(interval);
  }, [tasks, setExperience]); // Dependency array now includes tasks and setExperience

  useEffect(() => {
    // Experience needed to level up is level * 10
    const experienceToLevelUp = level * 10;
    
    if (experience >= experienceToLevelUp) {
      // Level up logic
      setLevel((prevLevel) => prevLevel + 1);
      setExperience(0); // Reset experience after leveling up
      setMaxHealth((prevMaxHealth) => prevMaxHealth + 20); // Increase max health by 20
      
      // Show the level-up arrow
      setShowLevelUpArrow(true);
      
      // Hide the arrow after 7 seconds (4 seconds blinking and 3 seconds fading)
      setTimeout(() => setShowLevelUpArrow(false), 7000); 
    }
  }, [experience, level, setExperience, setLevel]);

  // Function to display health change message
  const showHealthChange = (amount, color) => {
    const id = Math.random(); // Unique ID for each message
    const symbol = color === 'green' ? '+' : '-';
    const message = { id, text: `${symbol}${Math.abs(amount)}`, color };

    setHealthChangeMessages((prevMessages) => [...prevMessages, message]);

    // Remove the message after animation
    setTimeout(() => {
      setHealthChangeMessages((prevMessages) =>
        prevMessages.filter((msg) => msg.id !== id)
      );
    }, 4000); // 4 seconds for animation
  };

  // Calculate health percentage for the health bar
  const healthPercentage = (health / maxHealth) * 100;

  return (
    <div>
      <h2>Character Stats</h2>
      {/* Level and Level-Up Arrow */}
      <div className="character-stats">
        <p style={{ margin: 0 }}>Level: {level}</p>
        {/* Display the level-up arrow when the state is true */}
        {showLevelUpArrow && (
          <div className="level-up-arrow">⬆</div>
        )}
      </div>
      <p>Experience: {experience.toFixed(2)}</p> {/* Display experience with two decimal places */}
      <div className="character-stats">
        <div className="health-bar-container">
          {/* Health bar fill */}
          <div
            className="health-bar-fill"
            style={{
              width: `${healthPercentage}%`,
              backgroundColor: healthPercentage > 50 ? 'green' : healthPercentage > 20 ? 'orange' : 'red',
            }}
          >
            {/* Current health text inside the health bar */}
            <span className="current-health-text">
              {health.toFixed(2)}
            </span>
          </div>
        </div>
        {/* Maximum health text outside the health bar */}
        <span>{maxHealth}</span>
      </div>
      <p>Points: {points}</p>

      {/* Pass health change messages to the Animation component */}
      <Animation play={isAnimationPlaying} healthChangeMessages={healthChangeMessages} />
    </div>
  );
};

export default Character;
