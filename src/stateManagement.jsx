import create from "zustand";
import * as THREE from "three";
import { useTexture } from "@react-three/drei";

import upholestry1 from "./assets/interior_textures/Upholestry_baseColor1.jpg";
import upholestry2 from "./assets/interior_textures/Upholestry_baseColor2.jpg";
import upholestry3 from "./assets/interior_textures/Upholestry_baseColor3.jpg";

import controlsRed from "./assets/interior_textures/Controls_emissive.jpeg";
import controlsBlue from "./assets/interior_textures/Controls_emissive_blue.jpeg";
import controlsWhite from "./assets/interior_textures/Controls_emissive_white.jpeg";

import topControls1 from "./assets/interior_textures/TopControls_baseColor1.jpg";
import topControls2 from "./assets/interior_textures/TopControls_baseColor2.jpg";
import topControls3 from "./assets/interior_textures/TopControls_baseColor3.jpg";

import headseat1 from "./assets/interior_textures/Head_Seat_Fabric_baseColor1.jpg"
import headseat2 from "./assets/interior_textures/Head_Seat_Fabric_baseColor2.jpg"
import headseat3 from "./assets/interior_textures/Head_Seat_Fabric_baseColor3.jpg"

import leathersewing1 from "./assets/interior_textures/Leather_Sewing_baseColor1.jpg"
import leathersewing2 from "./assets/interior_textures/Leather_Sewing_baseColor2.jpg"
import leathersewing3 from "./assets/interior_textures/Leather_Sewing_baseColor3.jpg"

import backSeats1 from "./assets/interior_textures/BackSeats_baseColor1.jpg"
import backSeats2 from "./assets/interior_textures/BackSeats_baseColor2.jpg"
import backSeats3 from "./assets/interior_textures/BackSeats_baseColor3.jpg"


export const useStore = create((set, get) => ({
  rotateNow: false,
  isInteriorClicked: false,
  isCameraInside: false,
  isInteriorChanged: false,
  steeringPosition: new THREE.Vector3(),
  primaryColor: "9C9C9C",
  secondaryColor: "5593F7",
  interiorUpholestry: upholestry2,
  controlsColor: controlsRed,
  topControls: topControls2,
  headSeat: headseat2,
  leatherSewing: leathersewing2,
  backSeat: backSeats2,
  mapFlip: false,
  interiorPrimaryColor: "513B32",
  interiorSecondaryColor: "D7C4B0",
  interiorColors: [
    {
      id: 1,
      name: "Cream & Dark Grey",
      interiorUpholestry: upholestry1,
      controlsColor: controlsWhite,
      topControls: topControls1,
      headSeat: headseat1,
      leatherSewing: leathersewing1,
      backSeat: backSeats1,
      mapFlip: false,
      interiorPrimaryColor: "E7DCD0",
      interiorSecondaryColor: "414B58",
    },
    {
      id: 2,
      name: "Brown & Cream",
      interiorUpholestry: upholestry2,
      controlsColor: controlsRed,
      topControls: topControls2,
      headSeat: headseat2,
      leatherSewing: leathersewing2,
      backSeat: backSeats2,
      mapFlip: false,
      interiorPrimaryColor: "513B32",
      interiorSecondaryColor: "D7C4B0",
    },
    {
      id: 3,
      name: "Dark Grey & Black",
      interiorUpholestry: upholestry3,
      controlsColor: controlsBlue,
      topControls: topControls3,
      headSeat: headseat3,
      leatherSewing: leathersewing3,
      backSeat: backSeats3,
      mapFlip: false,
      interiorPrimaryColor: "414B58",
      interiorSecondaryColor: "1C2631",
    },
  ],
  exteriorColors: [
    {
      id: 1,
      name: "White & Blue",
      primaryColor: "E6E6E6",
      secondaryColor: "5593F7",
    },
    {
      id: 2,
      name: "Silver & Blue",
      primaryColor: "8A8A8A",
      secondaryColor: "5593F7",
    },
    {
      id: 3,
      name: "Blue & Dark Grey",
      primaryColor: "5593F7",
      secondaryColor: "585B5F",
    },
    {
      id: 4,
      name: "Black & Orange",
      primaryColor: "1A1A1A",
      secondaryColor: "ed6704",
    },
  ],
  setPrimaryColor: (primaryColor) => {
    set((state) => ({ primaryColor }));
  },
  setSecondaryColor: (secondaryColor) => {
    set((state) => ({ secondaryColor }));
  },
  setIsInteriorClicked: (isInteriorClicked) => {
    set((state) => ({ isInteriorClicked: !isInteriorClicked }));
  },
  setIsCameraInside: (isCameraInside) => {
    set((state) => ({ isCameraInside: !isCameraInside }));
  },
  setIsInteriorChanged: (isInteriorChanged) => {
    set((state) => ({ isInteriorChanged: !isInteriorChanged }));
  },
  setIsMapFliped: (mapFlip) => {
    set((state) => ({ mapFlip }));
  },
  setSteeringPosition: (position) => {
    set((state) => ({ steeringPosition: position }));
  },
  setInteriorPrimaryColor: (interiorPrimaryColor) => {
    set((state) => ({ interiorPrimaryColor }));
  },
  setInteriorSecondaryColor: (interiorSecondaryColor) => {
    set((state) => ({ interiorSecondaryColor }));
  },
  setRotateNow: (rotateNow) => {
    set((state) => ({ rotateNow: !rotateNow }));
  },
  setControlsColor: (controlsColor) => {
    set((state) => ({ controlsColor }));
  },
  setTopControls: (topControls) => {
    set((state) => ({ topControls }));
  },
  setHeadSeat: (headSeat) => {
    set((state) => ({ headSeat }));
  },
  setLeatherSewing: (leatherSewing) => {
    set((state) => ({ leatherSewing }));
  },
  setBackSeat: (backSeat) => {
    set((state) => ({ backSeat }));
  },
}));
