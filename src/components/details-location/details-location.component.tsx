import React, { useState, useCallback } from "react";
import "./details-location.styles.scss";
import Drawer from "react-bottom-drawer";
import { useAuth } from "../../providers/AuthProvider";
import { HeartOutline, HeartDislikeOutline } from "react-ionicons";
import { Link } from "react-router-dom";

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
  const { currentUser } = useAuth();
  const openDrawer = useCallback(() => setIsVisible(true), []);
  const closeDrawer = useCallback(() => setIsVisible(false), []);
  const [isLiked, setIsLiked] = useState(false);

  const onLikeHandler = () => {
    setIsLiked(!isLiked);
  };

  const renderLikeButton = () => {
    if (!isLiked) {
      if (!currentUser) {
        return (
          <HeartOutline
            color={"#ffffff"}
            title={"favorite"}
            height="2em"
            width="2em"
          />
        );
      }
      return (
        <Link to="/login">
          <HeartOutline
            color={"#ffffff"}
            title={"favorite"}
            height="2em"
            width="2em"
          />
        </Link>
      );
    } else {
      return (
        <HeartDislikeOutline
          color={"#ffffff"}
          title={"unfavorite"}
          height="2em"
          width="2em"
        />
      );
    }
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
          {renderLikeButton()}
        </div>
      </div>
      <p style={{ opacity: "0.5" }}>{data.address}</p>
      <div dangerouslySetInnerHTML={{ __html: data.content }} />
    </Drawer>
  );
};

export default DetailsLocation;
