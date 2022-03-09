import React, { Suspense, useEffect, useRef, useState } from 'react'
import * as THREE from 'three'
import { Canvas, extend, useFrame, useThree } from '@react-three/fiber'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass'
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass'
import {
  OrbitControls,
  Loader,
  AdaptiveDpr,
  AdaptiveEvents,
  Environment,
} from '@react-three/drei'
import { useStore } from './stateManagement'

import './App.css'

import Model from './Bmw_i8_v2'
// import Model from "./Bmw";
import UI from './UI'
import Floor from './Floor'
import Flares from './Flares'
import Effects from './Effects'
import { useControls } from 'leva'
import gsap from 'gsap'

extend({ EffectComposer, RenderPass, UnrealBloomPass })

const environments = {
  sunset: 'sunset',
  city: 'city',
  apartment: 'apartment',
  dawn: 'dawn',
  night: 'night',
  forest: 'forest',
  lobby: 'lobby',
  park: 'park',
  studio: 'studio',
  warehouse: 'warehouse',
}

const Controls = () => {
  const cameraStatus = true
  const isInteriorClicked = useStore((state) => state.isInteriorClicked)
  const isCameraInside = useStore((state) => state.isCameraInside)
  const setIsCameraInside = useStore((state) => state.setIsCameraInside)

  const controls = useRef()

  const { camera, gl, scene } = useThree()

  useEffect(() => {
    const gsap_interiortl = new gsap.timeline()
    const gsap_exteriortl = new gsap.timeline()

    const startOrientation = camera.quaternion.clone()
    const targetOrientation = scene.quaternion.clone().normalize()

    if (isInteriorClicked == true) {
      setIsCameraInside()

      gsap_interiortl
        .to(camera.position, {
          x: 0,
          y: 4,
          z: -10,
          ease: 'Power4.in',
          duration: 1,
          onUpdate: () => {
            controls.current.enabled = false
            camera.lookAt(scene.position)
          },
          onComplete: () => {
            controls.current.enabled = true
          },
        })
        .to(camera.position, {
          x: 0.1,
          y: 2.3,
          z: -0.5,
          ease: 'Power4.in',
          duration: 1,
          onUpdate: () => {
            controls.current.enabled = false
          },
          onComplete: () => {
            controls.current.enabled = true
            controls.current.target = new THREE.Vector3(0.1, 2.02, 0.2)
          },
        })
        .to(scene.rotation, {
          x: 0,
          y: -1.5,
          z: 0,
          ease: 'Power1.in',
          duration: 1,
          onUpdate: () => {
            controls.current.enabled = false
          },
          onComplete: () => {
            controls.current.enabled = true
            controls.current.target = new THREE.Vector3(0.1, 2.02, 0.2)
          },
        })
    } else {
      setIsCameraInside(cameraStatus)

      gsap_exteriortl
        .to(scene.rotation, {
          x: 0,
          y: 0,
          z: 0,
          ease: 'Power4.in',
          duration: 1,
          onUpdate: () => {
            controls.current.enabled = false
          },
          onComplete: () => {
            controls.current.target = scene.position
            camera.lookAt(scene.position)
          },
        })
        .to(camera.position, {
          x: 0,
          y: 4,
          z: -10,
          ease: 'Power4.in',
          duration: 1,
          onUpdate: () => {
            controls.current.enabled = false
            camera.lookAt(scene.position)
          },
          onComplete: () => {
            controls.current.enabled = true
            controls.current.target = new THREE.Vector3(0, 0, 0)
          },
        })
    }
  }, [isInteriorClicked, camera])

  const regress = useThree((state) => state.performance.regress)
  useEffect(() => {
    controls.current?.addEventListener('update', regress)
    controls.current.addEventListener('start', () => {
      controls.current.autoRotate = false
      setTimeout(() => {
        controls.current.autoRotate = true
      }, 3000)
    })
  })

  return (
    <OrbitControls
      ref={controls}
      args={[camera, gl.domElement]}
      autoRotate={isInteriorClicked == true ? false : true}
      autoRotateSpeed={isInteriorClicked == true ? 0 : -2.5}
      enableDamping
      dampingFactor={0.75}
      enabled={isInteriorClicked == true ? true : true}
      rotateSpeed={0.6}
      enableRotate={isInteriorClicked == true ? true : true}
      enablePan={true}
      enableZoom={isInteriorClicked == true ? false : false}
      minDistance={0.01}
      maxDistance={9}
      minPolarAngle={-Math.PI / 2.4}
      maxPolarAngle={isInteriorClicked == true ? Math.PI / 1.5 : Math.PI / 2.4}
      regress={false}
    />
  )
}

function CarStage() {
  const { metalness, roughness, environment } = useControls({
    metalness: {
      value: 0.9,
      min: 0,
      max: 1,
      step: 0.01,
    },
    roughness: {
      value: 0.5,
      min: 0,
      max: 1,
      step: 0.01,
    },
    environment: { options: environments },
  })

  return (
    <Suspense fallback={null}>
      <Environment background files={'/src/assets/playcanvas_v3.hdr'} />
      <Environment files={'/src/assets/playcanvas_v3_new.hdr'} />
      <Model metalness={metalness} roughness={roughness} />
      <Floor />
      {/* <Flares/> */}
      <RecalcShadows />
    </Suspense>
  )
}

function RecalcShadows() {
  const gl = useThree((state) => state.gl)
  useEffect(() => void (gl.shadowMap.needsUpdate = true), [])
  return null
}

function App() {
  const isInteriorClicked = useStore((state) => state.isInteriorClicked)

  return (
    <div className='webgl'>
      <Canvas
        frameloop='always'
        shadows
        camera={{
          fov: isInteriorClicked == true ? 65 : 56,
          position: [5, 0, 0],
        }}
        onCreated={(state) => {
          state.gl.clearColor(0x000000, 1)
          state.gl.shadowMap.autoUpdate = false
        }}
      >
        <CarStage />
        <Controls />
        <AdaptiveDpr />
        <AdaptiveEvents />
        {/* <Perf position="top-left"/> */}
        <Effects />
      </Canvas>
      <Loader />
      <UI />
    </div>
  )
}

export default App
