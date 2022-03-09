import React, { useState } from "react";
import { useStore } from "./stateManagement";

import interiorsvg from "./assets/interior.svg";
import carsvg from "./assets/car.svg";

const UI = () => {
  const interiorClicked = true;
  const interiorChanged = true;
  const interiorColors = useStore((state) => state.interiorColors);
  const exteriorColors = useStore((state) => state.exteriorColors);
  const setPrimaryColor = useStore((state) => state.setPrimaryColor);
  const setSecondaryColor = useStore((state) => state.setSecondaryColor);
  const setInteriorPrimaryColor = useStore(
    (state) => state.setInteriorPrimaryColor
  );
  const setInteriorSecondaryColor = useStore(
    (state) => state.setInteriorSecondaryColor
  );
  const isInteriorClicked = useStore((state) => state.isInteriorClicked);
  const isInteriorChanged = useStore((state) => state.isInteriorChanged);
  const setIsInteriorClicked = useStore((state) => state.setIsInteriorClicked);
  const setIsInteriorChanged = useStore((state) => state.setIsInteriorChanged);
  const setIsMapFliped = useStore((state) => state.setIsMapFliped);
  const setControlsColor = useStore((state) => state.setControlsColor);
  const setTopControls = useStore((state) => state.setTopControls);
  const setHeadSeat = useStore((state) => state.setHeadSeat);
  const setLeatherSewing = useStore((state) => state.setLeatherSewing);
  const setBackSeat = useStore((state) => state.setBackSeat);

  const [selectedId, setSelectedId] = useState(2);
  const [interiorselectedId, setinteriorSelectedId] = useState(2);

  return (
    <>
      <div className="color_options">
        <div className="row">
          {interiorColors.map((color) => (
            <div key={color.id} style={{ marginBottom: "10px" }}>
              <div
                onClick={() => {
                  setIsInteriorChanged(interiorChanged);
                  setIsMapFliped(color.mapFlip);
                  setInteriorPrimaryColor(color.interiorPrimaryColor);
                  setInteriorSecondaryColor(color.interiorSecondaryColor);
                  setinteriorSelectedId(color.id);
                  setControlsColor(color.controlsColor);
                  setTopControls(color.topControls);
                  setHeadSeat(color.headSeat);
                  setLeatherSewing(color.leatherSewing);
                  setBackSeat(color.backSeat);
                }}
                style={{
                  width: "1.5rem",
                  height: "1.5rem",
                  backgroundImage: `linear-gradient(-45deg, #${color.interiorSecondaryColor} 50%, #${color.interiorPrimaryColor} 50%)`,
                  outline:
                    interiorselectedId === color.id
                      ? "2px solid rgba(255,255,255, 0.8)"
                      : null,
                }}
              ></div>
            </div>
          ))}
        </div>
        <div className="row">
          {exteriorColors.map((color) => (
            <div
              key={color.id}
              onClick={() => {
                setPrimaryColor(color.primaryColor);
                setSecondaryColor(color.secondaryColor);
                setSelectedId(color.id);
              }}
              style={{
                outline:
                  selectedId === color.id
                    ? "2px solid rgba(255,255,255, 0.8)"
                    : null,
              }}
            >
              <div
                style={{
                  width: "1.5rem",
                  height: "1.2rem",
                  background: `#${color.primaryColor}`,
                }}
              ></div>
              <div
                style={{
                  width: "1.5rem",
                  height: "0.3rem",
                  background: `#${color.secondaryColor}`,
                }}
              ></div>
            </div>
          ))}
        </div>
      </div>
      {isInteriorClicked == false ? (
        <div className="interior_btn" onClick={() => setIsInteriorClicked()}>
          <img src={interiorsvg} alt="Interior Button" />
        </div>
      ) : (
        <div
          className="exterior_btn"
          onClick={() => setIsInteriorClicked(interiorClicked)}
        >
          <img src={carsvg} alt="Interior Button" />
        </div>
      )}
    </>
  );
};

export default UI;
