import React from "react";
import { LocateOutline } from "react-ionicons";
import "./current-location.styles.scss";

export default function CurrentLocation() {
  return (
    <div className="current-location">
      <LocateOutline
        cssClasses="current-location__icon"
        color={"#ffffff"}
        title="current location"
        height="2em"
        width="2em"
      />
    </div>
  );
}
