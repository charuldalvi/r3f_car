import * as THREE from 'three'
import React, { useRef, useMemo, useEffect } from 'react'
import { extend, useThree, useFrame } from '@react-three/fiber'
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer'
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass'
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass'
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass'
import { BloomPass } from 'three/examples/jsm/postprocessing/BloomPass'
import { FXAAShader } from 'three/examples/jsm/shaders/FXAAShader'
import { ColorCorrectionShader } from 'three/examples/jsm/shaders/ColorCorrectionShader'
import { GammaCorrectionShader } from 'three/examples/jsm/shaders/GammaCorrectionShader'
import { BrightnessContrastShader } from 'three/examples/jsm/shaders/BrightnessContrastShader'

extend({ EffectComposer, RenderPass, BloomPass, UnrealBloomPass, ShaderPass })
export default function Effects() {
  const composer = useRef()
  const { scene, gl, size, camera } = useThree()

  
  
  
  const aspect = useMemo(() => new THREE.Vector2(1024, 1024), [])
  useEffect(() => void composer.current.setSize(size.width, size.height), [size])
  useFrame(() => composer.current.render(), 1)
  return (
   <>
  <effectComposer frameBufferType={THREE.HalfFloatType} ref={composer} args={[gl]}>
    <renderPass attachArray="passes" args={[scene, camera]} />
    {/* <unrealBloomPass attachArray="passes" args={[aspect, 0.5, 1.2, 0.1]} /> */}
    {/* <renderPass attachArray="passes" args={[scene, camera]} clear={false} /> */}
    <shaderPass attachArray="passes" args={[FXAAShader]} uniforms-resolution-value={[1 / size.width, 1 / size.height]} renderToScreen />
    {/* <shaderPass attachArray="passes" args={[GammaCorrectionShader]}  /> */}
  </effectComposer>
  </>
  )
}