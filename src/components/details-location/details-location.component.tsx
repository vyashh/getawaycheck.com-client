import React, { useState, useCallback } from "react";
import "./details-location.styles.scss";
import Drawer from "react-bottom-drawer";

interface Props {
  isVisible: boolean;
  setIsVisible: any;
  data: any;
}

const DetailsLocation: React.FC<Props> = ({
  isVisible,
  setIsVisible,
  data,
}) => {
  const openDrawer = useCallback(() => setIsVisible(true), []);
  const closeDrawer = useCallback(() => setIsVisible(false), []);
  const htmlString = data.content;

  return (
    <Drawer
      duration={250}
      hideScrollbars={true}
      onClose={closeDrawer}
      isVisible={isVisible}
    >
      <h1>{data.title}</h1>
      <p style={{ opacity: "0.5" }}>{data.address}</p>
      <div dangerouslySetInnerHTML={{ __html: data.content }} />
    </Drawer>
  );
};

export default DetailsLocation;
