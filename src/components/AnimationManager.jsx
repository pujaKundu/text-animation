import React, { useState } from 'react'
import AnimationPopup from './AnimationPopup';
import AnimatedText from './AnimatedText';
import './animations.css'

const AnimationManager = () => {
    const [animationConfig, setAnimationConfig] = useState({
        trigger: "onAppear",// layer in view, section in view
        preset: "blur", // flip, shake, shoot,rotate,scale,stagger
        per: "character", // word, character, line, element
        delay: 100,
        effects: {
          opacity: 1,
          blur: "10px",
          scale: "1",
          rotate: {
            "2d": "0deg",
            "3d": { x: "0deg", y: "0deg", z: "0deg" },
          },
          skew: "0deg",
          offset: { x: "0px", y: "0px" },
        },
        transition: { 
            type: "ease", // options: ease, spring
            ease:{
                ease:'',
                bezeir:'',
                time:'',
                delay:'',
            },
            spring:{
                timeBased:{time:'',bounce:'',delay:''},
                physicsBased:{damping:'',stiffness:'',mass:'',delay:''},
            }
         },
      });

  const [text, setText] = useState("Hello, World!");
  const [showPopup, setShowPopup] = useState(false);

  const handlePopupSubmit = (config) => {
    setAnimationConfig(config);
    setShowPopup(false);
  };

  return (
    <div>
      <h1>Text Animation System</h1>
      <button onClick={() => setShowPopup(true)}>Configure Animation</button>
      <AnimatedText text={text} config={animationConfig} />
      {showPopup && (
        <AnimationPopup
          initialConfig={animationConfig}
          onSubmit={handlePopupSubmit}
          onClose={() => setShowPopup(false)}
        />
      )}
    </div>
  )
}

export default AnimationManager
