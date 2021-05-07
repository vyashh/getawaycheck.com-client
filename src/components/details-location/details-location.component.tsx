import React, { useState, useCallback, useContext, useEffect } from "react";
import "./details-location.styles.scss";
import Drawer from "react-bottom-drawer";
import { useAuth } from "../../providers/AuthProvider";
import { Context } from "../../services/store";
import { HeartOutline, HeartDislikeOutline } from "react-ionicons";
import { Link } from "react-router-dom";
import { handleLikeArticle } from "../../services/firestore";
import LikeButton from "../like-button/like-button.component";
import { db } from "../../services/firebase";
import firebase from "firebase/app";
import dayjs from "dayjs";
import { IonLoading } from "@ionic/react";
import { Swiper, SwiperSlide } from "swiper/react";
import "swiper/swiper.min.css";
import "swiper/components/pagination/pagination.min.css";
import SwiperCore, { Pagination } from "swiper/core";
interface Props {
  isVisible: boolean;
  setIsVisible: any;
  data: any;
  getLocation: any;
}

SwiperCore.use([Pagination]);

const DetailsLocation: React.FC<Props> = ({
  isVisible,
  setIsVisible,
  data,
  getLocation,
}) => {
  const { currentUser } = useAuth();
  const { userData, userLikeData } = useContext(Context);
  const openDrawer = useCallback(() => setIsVisible(true), []);
  const closeDrawer = useCallback(() => setIsVisible(false), []);
  const [userLikes, setUserLikes] = userLikeData;
  const currentUserData = userData[0];
  const [isLiked, setIsLiked] = useState(false);
  const [render, setRender] = useState(false);
  const onLikeHandler = () => {
    // console.log(userLikes);
    // const toLike = { article_id: data.id, date_time: dayjs().format() };
    handleLikeArticle(data, currentUserData.uid);
    setIsLiked(!isLiked);
    getLocation();
  };

  const renderLikeButton = (onLikeHandler) => {
    // console.log("renderLikeButton()", currentUserData.uid);

    // if not liked => show unlike button
    // if not liked AND no current user show like button but with link to login page
    // console.log(userData[0]);

    if (data.likedBy !== undefined) {
      console.log("like is defined");
      if (currentUser && data) {
        console.log("currentUser is defined");

        if (data.likedBy.includes(currentUser.uid)) {
          console.log("likedBy includes user");

          return (
            <HeartDislikeOutline
              color={"#ffffff"}
              title={"unfavorite"}
              height="2em"
              width="2em"
              onClick={onLikeHandler}
            />
          );
        } else console.log("likedBy does not include user");

        return (
          <HeartOutline
            color={"#ffffff"}
            title={"favorite"}
            height="2em"
            width="2em"
            onClick={onLikeHandler}
          />
        );
      } else {
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
    }
  };

  useEffect(() => {
    if (data.likedBy !== undefined) {
      if (data.likedBy.includes(currentUserData.uid)) {
        setIsLiked(true);
      }
    }
    setIsLiked(false);
    console.log(currentUserData);
  }, []);

  if (!data && !currentUserData) {
    return <IonLoading isOpen={true} />;
  } else {
    return (
      <Drawer
        duration={250}
        hideScrollbars={true}
        onClose={closeDrawer}
        isVisible={isVisible}
      >
        <div className="drawer">
          {data.imageUrls && (
            <Swiper
              slidesPerView={"auto"}
              centeredSlides={true}
              spaceBetween={30}
              pagination={{
                clickable: true,
              }}
              navigation={true}
              className="drawer__slider--desktop"
            >
              {data.imageUrls.map((url) => (
                <SwiperSlide>
                  <img
                    src={url.url}
                    alt="thumbnail"
                    style={{ objectFit: "contain" }}
                  />
                </SwiperSlide>
              ))}
            </Swiper>
          )}

          <div className="drawer__header">
            <h1>{data.title}</h1>
            <div className="drawer__header__favorite">
              <LikeButton data={data} articleId={data.id} />
            </div>
          </div>
          <p style={{ opacity: "0.5" }}>{data.address}</p>
          <div dangerouslySetInnerHTML={{ __html: data.content }} />
        </div>
      </Drawer>
    );
  }
};

export default DetailsLocation;
