import React, { useState, useEffect } from "react";
import "./styles.css";

const AnimationDemo = () => {
  const [settings, setSettings] = useState({
    animation: "rotate", // blur, flip, shoot, scale, rotate, shake
    partition: "character", // per-character, words, line, element
    delay: 0.1,
    duration: 1, 
    text: "Animate this text!",
  });

  const partitionText = () => {
    const { text, partition } = settings;

    // Wrap each character in a span tag for character partition
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
            <>
                <span key={index} className="animated-item">
                        {wrapCharacters(word)}
                </span>
                      {index < text.split(" ").length - 1 && " "}
                    </>
                  ))}
                </div>)
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
      return (
        <span className="animated-item">
          {lines.map((line, index) => (
            <span key={index} className="line">
              {line}
            </span>
          ))}
        </span>
      );
    }

    if (partition === "element") {
      return <span className="animated-item">{text}</span>;
    }

    return null;
  };

  const animateElement = (element, animation, baseDelay, duration, index) => {
    const delay = baseDelay * index; 
    element.style.animation = `${animation} ${duration}s ease ${delay}s forwards`; 
  };  

  useEffect(() => {
    const elements = Array.from(document.querySelectorAll(".animated-item"));
    elements.forEach((el, index) => {
      animateElement(el, settings.animation, parseFloat(settings.delay), parseFloat(settings.duration), index);
    });
  }, [settings]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSettings((prev) => ({
      ...prev,
      [name]: name === "delay" || name === "duration" ? parseFloat(value) : value,
    }));
  };

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
            style={{ marginRight: "10px" }}
          >
            <option value="blur">Blur</option>
            <option value="flip">Flip</option>
            <option value="shoot">Shoot</option>
            <option value="scale">Scale</option>
            <option value="rotate">Rotate</option>
            <option value="shake">Shake</option>
            <option value="stagger">Stagger</option>
          </select>
        </label>
        <label>
          Partition:{" "}
          <select
            name="partition"
            value={settings.partition}
            onChange={handleInputChange}
            style={{ marginRight: "10px" }}
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
            placeholder="0.1"
            step={0.1}
            style={{ width: "60px", marginRight: "10px" }}
          />
        </label>
        <label>
          Duration:{" "} 
          <input
            type="number"
            name="duration"
            value={settings.duration}
            onChange={handleInputChange}
            placeholder="1"
            style={{ width: "60px", marginRight: "10px" }}
          />
        </label>
        <label>
          Text:{" "}
          <input
            type="text"
            name="text"
            value={settings.text}
            onChange={handleInputChange}
            placeholder="Enter your text"
            style={{ marginRight: "10px", width: "300px" }}
          />
        </label>
      </div>
      <div className="animation-container">{partitionText()}</div>
    </div>
  );
};

export default AnimationDemo;