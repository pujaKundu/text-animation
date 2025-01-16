import React, { useEffect, useRef } from "react";
import useInView from "./useInView";
import "./animations.css";

const AnimatedText = ({ text, config }) => {
  const ref = useRef();
  const isInView = useInView(ref);

  const splitText = (text, mode) => {
    switch (mode) {
      case "character":
        return text.split("");
      case "word":
        return text.split(" ");
      case "line":
        return text.split("\n");
      default:
        return [text];
    }
  };

  const animationStyle = (index) => ({
    animation: `${config.preset} ${config.transition.duration}ms ${config.transition.easing} ${
      config.delay * index
    }ms`,
  });

  const parts = splitText(text, config.per);

  useEffect(() => {
    if (config.trigger === "onAppear" && isInView) {
      ref.current.classList.add("animate");
    }
  }, [isInView, config.trigger]);

  return (
    <div ref={ref} className="text-container">
      {parts.map((part, index) => (
        <span key={index} style={animationStyle(index)}>
          {part}
        </span>
      ))}
    </div>
  );
};

export default AnimatedText;
