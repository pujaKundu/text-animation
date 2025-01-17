import { useState } from 'react'
import './App.css'
import PhysicsBasedTransition from './components/SpringTransition/PhysicsBasedTransition'
import Wave from './components/Wave/Wave'
import AnimationManager from './components/AnimationManager'
import AnimationDemo from './components/AnimationDemo/AnimationDemo'
import TextAnimation from './components/TextAnimation/TextAnimation'

function App() {

  return (
    <>
    {/* <Wave text={"Wave text animation"}/> */}
     {/* <PhysicsBasedTransition/> */}
     {/* <AnimationManager/> */}
     {/* text animations */}
     <AnimationDemo/>
     {/* <TextAnimation/> */}
    </>
  )
}

export default App
