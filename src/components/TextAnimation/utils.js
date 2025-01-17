export const animationSettings = {
    trigger: 'onAppear',  // e.g., section in view, layer in view
    preset: 'blur',       // e.g., 'blur', 'scale', 'rotate', flip, shake, shoot, stagger, custom
    per: 'character',     // e.g., 'word', 'line', 'character', 'element'
    effects: {
      opacity: 0,         // Initial opacity
      scale: 1,           // Initial scale
      blur: 0,            // Initial blur value
      rotate: { x: 0, y: 90, z: 0 },  // 3D rotation, for 2D use only x and y
      skew: { x: 0, y: 0 },          // Skew values
      offset: { x: 0, y: 0 },        // Offset position
    },
    transition: {
      type: '',  // 'ease' or 'spring'
      ease: {
        easing: '',        // e.g., 'ease-out', 'ease-in-out', etc.
        bezier: '',        // Optional cubic-bezier value
        time: '',          // Duration of transition
        delay: '',         // Delay before starting transition
      },
      spring: {
        physicsBased: {
          stiffness: '',  // The stiffness of the spring
          damping: '',    // Damping factor (resistance)
          mass: '',       // The mass of the object
          delay: '',      // Delay before starting spring transition
        },
        timeBased: {
          time: '',      // Duration for spring animation
          bounce: '',    // Bounce factor
          delay: '',     // Delay before spring starts
        },
      },
    },
  };