import React, { useState, useEffect } from "react";
import "./styles.css";

const AnimationDemo = () => {
  const [settings, setSettings] = useState({
    partition: "character",
    animation: "rotate",
    delay: 0.1,
    duration: 1,
    loop: 1, // if loop is true animation-iteration-count: infinite;
    repeats:1, // also affects animation-iteration-count
    fillMode:"forwards", // animation-fill-mode: forwards;
    playState:"running", // animation-play-state: running;
    animationDirection:"normal", // animation-direction: normal;

    text: "Animate this text!",
  });

  const partitionText = () => {
    const { text, partition } = settings;

    const wrapCharacters = (word) => {
      return word.split("").map((char, index) => (
        <span key={index} className="animated-item">
          {char}
        </span>
      ));
    };

    if (partition === "character") {
      return (
        <div>
          {text.split(" ").map((word, index) => (
            <React.Fragment key={index}>
              {wrapCharacters(word)}
              {index < text.split(" ").length - 1 && " "}
            </React.Fragment>
          ))}
        </div>
      );
    }

    if (partition === "words") {
      return text.split(" ").map((word, index) => (
        <span key={index} className="animated-item">
          {word}
          {index < text.split(" ").length - 1 && "\u00A0"}
        </span>
      ));
    }

    if (partition === "line") {
      const lines = text.split("\n");
      return lines.map((line, index) => (
        <span key={index} className="animated-item">
          {line}
        </span>
      ));
    }

    if (partition === "element") {
      return <span className="animated-item">{text}</span>;
    }

    return null;
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
   
    const newValue = (name === "delay" || name === "duration") ? parseFloat(value) : value;
  
    setSettings((prev) => ({
      ...prev,
      [name]: newValue,
    }));
  };

  const applyAnimation = () => {
    const elements = Array.from(document.querySelectorAll(".animated-item"));
    elements.forEach((el, index) => {
      const delay = settings.delay * index;
      el.style.animation = `${settings.animation} ${settings.duration}s ease ${delay}s forwards`;
    });
  };

  const handlePreview = () => {
    applyAnimation(); 
  };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setSettings((prev) => ({
//       ...prev,
//       [name]: name === "delay" || name === "duration" ? parseFloat(value) : value,
//     }));
//   };

  

  return (
    <div>
      <h1>Animation</h1>
      <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginBottom: "10px" }}>
        <label>
          Animation:{" "}
          <select
            name="animation"
            value={settings.animation}
            onChange={handleInputChange}
          >
            <option value="blur">Blur</option>
            <option value="flip">Flip</option>
            <option value="shoot">Shoot</option>
            <option value="scale">Scale</option>
            <option value="rotate">Rotate</option>
            <option value="shake">Shake</option>
          </select>
        </label>
        <label>
          Partition:{" "}
          <select
            name="partition"
            value={settings.partition}
            onChange={handleInputChange}
          >
            <option value="character">Character</option>
            <option value="words">Words</option>
            <option value="line">Line</option>
            <option value="element">Element</option>
          </select>
        </label>
        <label>
          Delay:{" "}
          <input
            type="number"
            name="delay"
            value={settings.delay}
            onChange={handleInputChange}
            step={0.1}
          />
        </label>
        <label>
          Duration:{" "}
          <input
            type="number"
            name="duration"
            value={settings.duration}
            onChange={handleInputChange}
          />
        </label>
        <label>
          Text:{" "}
          <input
            type="text"
            name="text"
            value={settings.text}
            onChange={handleInputChange}
          />
        </label>
      </div>
      <button onClick={handlePreview} style={{ padding: "5px 10px" }}>
        Preview
      </button>
      <div style={{padding:'20px'}}>{partitionText()}</div>
    </div>
  );
};

export default AnimationDemo;