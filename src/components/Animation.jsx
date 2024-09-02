// src/components/Animation.jsx
import React, { useRef, useEffect } from 'react';
import animationVideo from '../Videos/animation.mp4'; // Import the video

const Animation = ({ play, healthChangeMessages = [] }) => { // Add a default value for healthChangeMessages
  const videoRef = useRef(null);

  useEffect(() => {
    if (play) {
      videoRef.current.play();
    } else {
      videoRef.current.pause();
    }
  }, [play]);

  return (
    <div className="video-container">
      {/* Video element */}
      <div className="video-wrapper">
        <video ref={videoRef} width="320" height="240" loop muted>
          <source src={animationVideo} type="video/mp4" />
          Your browser does not support the video tag.
        </video>
      </div>

      {/* Display health change messages to the right of the video */}
      <div className="health-change-messages">
        {healthChangeMessages.map((msg) => (
          <div key={msg.id} className="health-change-message" style={{ color: msg.color }}>
            {msg.text}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Animation;
