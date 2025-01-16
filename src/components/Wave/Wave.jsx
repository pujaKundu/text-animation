import React from "react";
import "./wave.css";

const Wave = ({ text, duration = 1, delay = 0.5, iterationCount = 1 }) => {
  return (
    <div className="wave-container">
      {text.split("").map((char, index) => (
        <span
          key={index}
          className="wave-char"
          style={{
            animationDelay: `${delay + index * 0.1}s`, // Adds delay per character
            animationDuration: `${duration}s`,
            animationIterationCount: iterationCount,
          }}
        >
          {char === " " ? "\u00A0" : char}
        </span>
      ))}
    </div>
  );
};

export default Wave;
