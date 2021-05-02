import React, { useState, useCallback, useContext } from "react";
import "./details-location.styles.scss";
import Drawer from "react-bottom-drawer";
import { useAuth } from "../../providers/AuthProvider";
import { Context } from "../../services/store";
import { HeartOutline, HeartDislikeOutline } from "react-ionicons";
import { Link } from "react-router-dom";
import { addLikedArticle } from "../../services/firestore";

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
  const { userData } = useContext(Context);
  const openDrawer = useCallback(() => setIsVisible(true), []);
  const closeDrawer = useCallback(() => setIsVisible(false), []);
  const [isLiked, setIsLiked] = useState(false);

  const onLikeHandler = () => {
    console.log(userData);

    addLikedArticle(data.id, currentUser.uid);
    setIsLiked(!isLiked);
  };

  const renderLikeButton = () => {
    // if not liked => show unlike button
    // if not liked AND no current user show like button but with link to login page
    // console.log(userData[0]);

    if (!isLiked) {
      if (!currentUser) {
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
      }
      return (
        <HeartOutline
          color={"#ffffff"}
          title={"favorite"}
          height="2em"
          width="2em"
        />
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
      <div className="drawer">
        <div className="drawer__header">
          <h1>{data.title}</h1>
          <div className="drawer__header__favorite" onClick={onLikeHandler}>
            {renderLikeButton()}
          </div>
        </div>
        <p style={{ opacity: "0.5" }}>{data.address}</p>
        <div dangerouslySetInnerHTML={{ __html: data.content }} />
      </div>
    </Drawer>
  );
};

export default DetailsLocation;
