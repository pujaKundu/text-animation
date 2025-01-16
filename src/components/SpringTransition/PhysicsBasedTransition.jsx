import React, { useState, useEffect } from "react";

const PhysicsBasedTransition = () => {
  const [physicsParams, setPhysicsParams] = useState({
    damping: 20,
    stiffness: 150,
    mass: 1,
    delay: 0.1,
  });
  const [text, setText] = useState("Physics-based Spring Animation!");

  const springAnimate = (element, stiffness, damping, mass, delay) => {
    const dt = 0.016; // Time step (60fps)
    const omega = Math.sqrt(stiffness / mass); // Natural frequency
    const dampingRatio = damping / (2 * Math.sqrt(stiffness * mass));

    let velocity = 0;
    let position = 50; // Initial offset (in px)
    const target = 0; // Target position
    const startOpacity = 0;
    const targetOpacity = 1;

    const animate = () => {
      // Calculate spring physics
      const acceleration = -(omega ** 2) * (position - target) - 2 * dampingRatio * omega * velocity;
      velocity += acceleration * dt;
      position += velocity * dt;

      // Apply transformations to the element
      element.style.transform = `translateY(${position}px)`;
      element.style.opacity = Math.min(targetOpacity, 1 - Math.abs(position / 50));

      // Stop the animation when near target
      if (Math.abs(position - target) > 0.01 || Math.abs(velocity) > 0.01) {
        requestAnimationFrame(animate);
      } else {
        element.style.transform = `translateY(${target}px)`;
        element.style.opacity = targetOpacity;
      }
    };
    setTimeout(() => {
      animate();
    }, delay * 1000);
  };

  useEffect(() => {
    const characters = document.querySelectorAll(".animated-character");
    characters.forEach((char, index) => {
      springAnimate(
        char,
        parseFloat(physicsParams.stiffness),
        parseFloat(physicsParams.damping),
        parseFloat(physicsParams.mass),
        physicsParams.delay * index
      );
    });
  }, [physicsParams, text]);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setPhysicsParams((prev) => ({
      ...prev,
      [name]: parseFloat(value),
    }));
  };

  return (
    <div style={{ padding: "20px", fontFamily: "Arial, sans-serif" }}>
      <h1>Spring Animation Demo</h1>
      <div style={{ marginBottom: "20px" }}>
        <label>
          Text:{" "}
          <input
            type="text"
            value={text}
            onChange={(e) => setText(e.target.value)}
            placeholder="Enter your text"
            style={{ marginRight: "10px" }}
          />
        </label>
        <label>
          Stiffness:{" "}
          <input
            type="number"
            name="stiffness"
            value={physicsParams.stiffness}
            onChange={handleInputChange}
            placeholder="150"
            style={{ marginRight: "10px" }}
          />
        </label>
        <label>
          Damping:{" "}
          <input
            type="number"
            name="damping"
            value={physicsParams.damping}
            onChange={handleInputChange}
            placeholder="20"
            style={{ marginRight: "10px" }}
          />
        </label>
        <label>
          Mass:{" "}
          <input
            type="number"
            name="mass"
            value={physicsParams.mass}
            onChange={handleInputChange}
            placeholder="1"
            style={{ marginRight: "10px" }}
          />
        </label>
        <label>
          Delay:{" "}
          <input
            type="number"
            name="delay"
            value={physicsParams.delay}
            onChange={handleInputChange}
            placeholder="0.1"
          />
        </label>
      </div>
      <div style={{ display: "inline-block", overflow: "hidden", fontSize: "24px" }}>
        {text.split("").map((char, index) => (
          <span
            key={index}
            className="animated-character"
            style={{
              display: "inline-block",
              opacity: 0,
              transform: "translateY(50px)",
            }}
          >
            {char === " " ? "\u00A0" : char}
          </span>
        ))}
      </div>
    </div>
  );
};

export default PhysicsBasedTransition;
