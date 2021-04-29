import React, { useState, useCallback } from "react";
import "./details-location.styles.scss";
import Drawer from "react-bottom-drawer";
import { HeartOutline, HeartDislikeOutline } from "react-ionicons";

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
  const [isLiked, setIsLiked] = useState(false);

  const onLikeHandler = () => {
    setIsLiked(!isLiked);
  };

  return (
    <Drawer
      duration={250}
      hideScrollbars={true}
      onClose={closeDrawer}
      isVisible={isVisible}
    >
      <div className="drawer__header">
        <h1>{data.title}</h1>
        <div className="drawer__header__favorite" onClick={onLikeHandler}>
          {!isLiked ? (
            <HeartOutline
              color={"#ffffff"}
              title={"favorite"}
              height="2em"
              width="2em"
            />
          ) : (
            <HeartDislikeOutline
              color={"#ffffff"}
              title={"unfavorite"}
              height="2em"
              width="2em"
            />
          )}
        </div>
      </div>
      <p style={{ opacity: "0.5" }}>{data.address}</p>
      <div dangerouslySetInnerHTML={{ __html: data.content }} />
    </Drawer>
  );
};

export default DetailsLocation;
