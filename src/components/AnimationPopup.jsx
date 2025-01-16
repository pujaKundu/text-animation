import React, { useState } from "react";
// import "./popup.css";

const AnimationPopup = ({ initialConfig, onSubmit, onClose }) => {
  const [config, setConfig] = useState(initialConfig);

  const handleChange = (field, value) => {
    setConfig((prev) => ({ ...prev, [field]: value }));
  };

  return (
    <div className="popup">
      <h2>Animation Configuration</h2>
      <label>
        Trigger:
        <select
          value={config.trigger}
          onChange={(e) => handleChange("trigger", e.target.value)}
        >
          <option value="onAppear">On Appear</option>
          <option value="layerInView">Layer In View</option>
          <option value="sectionInView">Section In View</option>
        </select>
      </label>

      <label>
        Preset:
        <select
          value={config.preset}
          onChange={(e) => handleChange("preset", e.target.value)}
        >
          <option value="blur">Blur</option>
          <option value="flip">Flip</option>
          <option value="shake">Shake</option>
          <option value="scale">Scale</option>
        </select>
      </label>

      <label>
        Per:
        <select
          value={config.per}
          onChange={(e) => handleChange("per", e.target.value)}
        >
          <option value="character">Character</option>
          <option value="word">Word</option>
          <option value="line">Line</option>
        </select>
      </label>

      <label>
        Delay (ms):
        <input
          type="number"
          value={config.delay}
          onChange={(e) => handleChange("delay", parseInt(e.target.value))}
        />
      </label>

      <button onClick={() => onSubmit(config)}>Apply</button>
      <button onClick={onClose}>Close</button>
    </div>
  );
};

export default AnimationPopup;
