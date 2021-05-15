import "./like-button.styles.scss";
import { HeartOutline, Heart } from "react-ionicons";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Context } from "../../services/store";
import { useAuth } from "../../providers/AuthProvider";
import { handleLikeArticle } from "../../services/firestore";
import { db } from "../../services/firebase";
import firebase from "firebase/app";

interface Props {
  data: any;
  articleId: string;
  likeStatus: boolean;
  setLikeStatus: any;
  likeHandler: any;
  likes: any;
  setLikes: any;
}

const LikeButton: React.FC<Props> = ({
  data,
  articleId,
  likeStatus,
  likeHandler,
  setLikeStatus,
  likes,
  setLikes,
}) => {
  const { currentUser } = useAuth();
  const articlesRef = db.collection("articles").doc(articleId);
  const usersRef = db.collection("users");
  const { userData, userLikeData } = useContext(Context);
  const currentUserData = userData[0];
  const [login, setLogin] = useState(false);
  const increment = firebase.firestore.FieldValue.increment(1);
  const decrement = firebase.firestore.FieldValue.increment(-1);

  const onLikeHandler = (e) => {
    e.preventDefault();
    if (likeStatus) {
      removeLike();
      setLikeStatus(false);
    } else {
      addLike();
      setLikeStatus(true);
    }
  };

  const addLike = async () => {
    await usersRef
      .doc(currentUser.uid)
      .update({ likes: firebase.firestore.FieldValue.arrayUnion(articleId) });
    await articlesRef.update({ likes: increment });
    console.log(likes);
    setLikes(likes + 1);
  };

  const removeLike = async () => {
    await usersRef
      .doc(currentUser.uid)
      .update({ likes: firebase.firestore.FieldValue.arrayRemove(articleId) });
    await articlesRef.update({ likes: decrement });
    setLikes(likes - 1);
  };

  useEffect(() => {
    if (currentUser === null) {
      console.log("currentUserData is null");

      setLikeStatus(false);
      setLogin(true);
      return;
    }
  }, [data, currentUser]);

  switch (login) {
    case true:
      console.log("login == true");

      return (
        <Link to="/auth/login">
          <HeartOutline
            color={"#ffffff"}
            title={"favorite"}
            height="2em"
            width="2em"
          />
        </Link>
      );

    default:
      if (likeStatus) {
        return (
          <Heart
            color={"#ff0000"}
            title={"favorite"}
            height="2em"
            width="2em"
            onClick={onLikeHandler}
          />
        );
      }
      return (
        <HeartOutline
          color={"#ffffff"}
          title={"favorite"}
          height="2em"
          width="2em"
          onClick={onLikeHandler}
        />
      );
  }
};

export default LikeButton;
