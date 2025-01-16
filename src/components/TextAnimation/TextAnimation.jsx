import React, { useState, useEffect } from "react";
import "./styles.css";

const AnimationDemo = () => {
  const [settings, setSettings] = useState({
    animation: "blur", // blur, flip, shoot, scale, rotate, shake
    partition: "character", // per-character, words, line, element
    wrapper: "p", // wrapper tag (p, h1-h6, span)
    delay: 0.1,
    text: "Animate this text!",
  });

  const partitionText = () => {
    const { text, wrapper, partition } = settings;
    const WrapperTag = wrapper;
  
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
        <WrapperTag className="animated-item">
          {text.split(" ").map((word, index) => (
            <>
              <span key={index} className="animated-item">
                {wrapCharacters(word)} 
              </span>
              {index < text.split(" ").length - 1 && " "}
            </>
          ))}
        </WrapperTag>
      );
    }
  
    if (partition === "words") {
      return (
        <WrapperTag className="animated-item">
        {text.split(" ").map((word, index) => (
        <>
          <span key={index} className="animated-item">
            {wrapCharacters(word)}
          </span>
          {index < text.split(" ").length - 1 && " "}
        </>
      ))}
    </WrapperTag>
      );
    }
  
    if (partition === "line") {
      const lines = text.split("\n"); 
      return (
        <WrapperTag className="animated-item">
          {lines.map((line, index) => (
            <div key={index} className="line">{line}</div>
          ))}
        </WrapperTag>
      );
    }
  
    if (partition === "element") {
      // Directly apply animation to the entire text wrapped in the wrapper tag
      return <WrapperTag className="animated-item">{text}</WrapperTag>;
    }
  
    return null;
  };

  const animateElement = (element, animation, delay, index) => {
    const staggerDelay = delay * index;
    element.style.animation = `${animation} 1s ease ${staggerDelay}s forwards`;
  };

  useEffect(() => {
    const elements = Array.from(document.querySelectorAll(".animated-item"));
    elements.forEach((el, index) => {
      animateElement(el, settings.animation, parseFloat(settings.delay), index);
    });
  }, [settings]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setSettings((prev) => ({
      ...prev,
      [name]: name === "delay" ? parseFloat(value) : value,
    }));
  };

  return (
    <div>
      <h1>Text Animation</h1>
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
            <option value="character">Per-Character</option>
            <option value="words">Words</option>
            <option value="line">Line</option>
            <option value="element">Element</option>
          </select>
        </label>
        <label>
          Wrapper:{" "}
          <select
            name="wrapper"
            value={settings.wrapper}
            onChange={handleInputChange}
            style={{ marginRight: "10px" }}
          >
            <option value="span">Span</option>
            <option value="p">Paragraph (p)</option>
            <option value="h1">Heading 1 (h1)</option>
            <option value="h2">Heading 2 (h2)</option>
            <option value="h3">Heading 3 (h3)</option>
            <option value="h4">Heading 4 (h4)</option>
            <option value="h5">Heading 5 (h5)</option>
            <option value="h6">Heading 6 (h6)</option>
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
