import React, { useRef, useEffect } from "react";
import * as THREE from "three";
import { useTexture, shaderMaterial } from "@react-three/drei";
import { extend, useFrame, useThree } from "@react-three/fiber";

import roadTexture from "./assets/wire_153228184_baseColor.png";
import tileTexture from "./assets/tile_9.png";
import tileVeritcal from "./assets/tile_lines.png";
import tileCarShadow from "./assets/ground.jpg";
import CarShadow from "./assets/TileCarShadow6.png";
import alpha from './assets/Alpha.png';

const FloorMaterial = shaderMaterial(
  {
    uTime: { value: 0 },
    uColor: { value: new THREE.Color(0.0, 0.0, 0.0) },
    uTexture: { value: new THREE.Texture() },
    // fogColor: { value: new THREE.Color(0.0, 0.0, 0.0) },
    // fogNear: { value: 0.0 },
    // fogFar: { value: 0.0 },
  },

  `
  #include <fog_pars_vertex>

  varying vec2 vUv;
  
  uniform float uTime;
  
  void main() {

    #include <begin_vertex>
    #include <project_vertex>
    #include <fog_vertex>

      vUv = uv;
  
      gl_Position = projectionMatrix * modelViewMatrix * vec4( position, 1.0 );
  }`,

  `

  #include <fog_pars_fragment>

  varying vec2 vUv;

  uniform float uTime;
  uniform sampler2D uTexture;
  
  
  void main() {
  
      vec2 uv = vUv;
      vec2 repeat = vec2(2.0, 0.0);
      uv = fract(uv + vec2(0.0, -uTime * 0.10));

      vec4 color = texture2D(uTexture, uv);

      
      gl_FragColor = color;

      #include <fog_fragment>
      
  }`
);

extend({ FloorMaterial });

function Floor() {
  const tile = useTexture(tileTexture);
  const shadow = useTexture(tileCarShadow);
  const carShadow = useTexture(CarShadow);
  const tile_vertical = useTexture(tileVeritcal);
  const transparentMap = useTexture(alpha)

  

  carShadow.offset.set(0, 0.005)
  
  
  shadow.offset.set(0.02, -0.01)

  const ref = useRef();

  const { scene } = useThree();

  // scene.fog = new THREE.Fog(0xa0a0a0, 10, 20);

  // scene.add( grid );

  useFrame(({ clock }) => {
    // ref.current.uTime = clock.getElapsedTime();
    let time = clock.getElapsedTime();
    time = time * 0.1;
    tile.offset.y = - time % 0.11
  });


  return (
    <group>
      <mesh
        rotation={[-0.5 * Math.PI, 0, Math.PI]}
        position={[0.18, 0.005, -0.3]}
      >
        <planeBufferGeometry args={[17, 17]} />
        <meshStandardMaterial map={carShadow}  transparent />
      </mesh>
      <mesh
        rotation={[-0.5 * Math.PI, 0, Math.PI / 2]}
        position={[0.18, 0.009, -0.3]}
      >
        <planeBufferGeometry args={[17, 17]} />
        <meshStandardMaterial map={tile} alphaMap={shadow} transparent />
      </mesh>
      {/* <mesh
        rotation={[-0.5 * Math.PI, 0, Math.PI / 2]}
        position={[0.18, 0.01, -0.3]}
      >
        <circleBufferGeometry args={[8, 64]} />
        <planeBufferGeometry args={[15, 15]} />
        <floorMaterial
          ref={ref}
          uTexture={tile}
          transparent={true}
        />
      </mesh> */}
    </group>
  );
}

export default Floor;
