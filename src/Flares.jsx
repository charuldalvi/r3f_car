import React, { useRef } from 'react'

import { useTexture } from "@react-three/drei";


import flareFrontLight from "./assets/flare-long_new.png";
import flareBackLight from "./assets/flare-red.png";
import { useFrame, useThree } from '@react-three/fiber';

const Flares = () => {

    
  const frontlight = useTexture(flareFrontLight);
  const backlight = useTexture(flareBackLight);

  const frontLRef = useRef()
  const frontRRef = useRef()
  const backLRef = useRef()
  const backRRef = useRef()

  const {camera} = useThree() 


  useFrame(() => {
    frontLRef.current.lookAt(camera.position)
    frontRRef.current.lookAt(camera.position)
    backLRef.current.lookAt(camera.position)
    backRRef.current.lookAt(camera.position)
  })

    return (
        <>
        {/* Left Front Light */}
         <mesh ref={frontLRef} position={[4.44, 1.26, -1.45]} scale={1.2} rotation={[0, 0, Math.PI / 2]}>
        <planeBufferGeometry args={[1, 1]} />
        <meshStandardMaterial
          map={frontlight}
          emissive={0xffffff}
          emissiveIntensity={2}
          transparent
        />
      </mesh>
        
       {/* Right Front Light */}
      <mesh ref={frontRRef} position={[4.44, 1.26, 1.45]} rotation={[0, 0, Math.PI]}>
        <planeBufferGeometry args={[1, 1]} />
        <meshStandardMaterial
          map={frontlight}
          emissive={0xffffff}
          emissiveIntensity={2}
          transparent
        />
      </mesh>
      
      {/* Left Back Light */}
      <mesh ref={backLRef} position={[-4.7, 1.78, 1.25]} rotation={[0, -Math.PI/2, Math.PI]}>
        <planeBufferGeometry args={[1, 1]} />
        <meshStandardMaterial
          map={backlight}
          emissive={0xff0000}
          emissiveIntensity={2}
          transparent
        />
      </mesh>
      
      {/* Right Back Light */}
      <mesh ref={backRRef} position={[-4.7, 1.78, -1.25]} rotation={[0.2, -Math.PI/1.2, 0]}>
        <planeBufferGeometry args={[1, 1]} />
        <meshStandardMaterial
          map={backlight}
          emissive={'red'}
          emissiveIntensity={2}
          transparent
        />
      </mesh>
      
        </>
    )
}

export default Flares
