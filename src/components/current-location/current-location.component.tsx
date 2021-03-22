import React from "react";
import { LocateOutline } from "react-ionicons";
import "./current-location.styles.scss";

const CurrentLocation: React.FC = () => {
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
};

export default CurrentLocation;
