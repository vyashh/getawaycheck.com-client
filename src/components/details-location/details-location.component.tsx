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

SwiperCore.use([Pagination]);

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
  const usersRef = db.collection("users");
  const { userData, userLikeData } = useContext(Context);
  const [currentUserData, setCurrentUserData] = useState<any>();
  const openDrawer = useCallback(() => setIsVisible(true), []);
  const closeDrawer = useCallback(() => setIsVisible(false), []);
  const [isLiked, setIsLiked] = useState(false);
  const [render, setRender] = useState(false);
  const [loading, setLoading] = useState(false);
  const [likes, setLikes] = useState(0);

  const setLikeStatus = (likes: any) => {
    setLoading(true);

    if (likes.includes(data.id)) {
      setIsLiked(true);
    } else {
      setIsLiked(false);
    }
    setLoading(false);
  };

  const getUserData = async () => {
    try {
      setLoading(true);
      await usersRef
        .doc(currentUser.uid)
        .get()
        .then((doc) => {
          const user = doc.data();

          setCurrentUserData(user);
          if (data !== undefined) {
            const likes = user!.likes;
            const userLikedArticle = likes.includes(data.id);

            if (userLikedArticle) {
              setIsLiked(true);
            } else {
              setIsLiked(false);
            }
          }
        });
    } catch (error) {
      console.log(error);
    } finally {
      setLoading(false);
    }
  };

  const handleLikeAction = () => {
    console.log("clicked");
    if (isLiked) {
    }
  };

  useEffect(() => {
    if (isVisible) {
      // if drawer is opened
      getUserData();
      setLikes(data.likes);
    }
  }, [data]);

  if (loading) {
    return <IonLoading isOpen={true} />;
  }

  if (!data && currentUserData !== undefined) {
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
                <SwiperSlide key={url.url}>
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
              <LikeButton
                data={data}
                articleId={data.id}
                likeStatus={isLiked}
                setLikeStatus={setIsLiked}
                likeHandler={handleLikeAction}
                likes={likes}
                setLikes={setLikes}
              />
            </div>
          </div>
          <div className="drawer__likes">
            {likes > 0 ? <p>{likes} Likes</p> : <p>0 Likes</p>}
          </div>
          <p style={{ opacity: "0.5" }}>{data.address}</p>
          <div
            className="drawer__content"
            dangerouslySetInnerHTML={{ __html: data.content }}
          />
        </div>
      </Drawer>
    );
  }
};

export default DetailsLocation;
