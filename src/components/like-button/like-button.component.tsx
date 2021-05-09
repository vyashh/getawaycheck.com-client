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
}

const LikeButton: React.FC<Props> = ({
  data,
  articleId,
  likeStatus,
  likeHandler,
  setLikeStatus,
}) => {
  const { currentUser } = useAuth();
  const usersRef = db.collection("users");
  const { userData, userLikeData } = useContext(Context);
  const currentUserData = userData[0];
  const [login, setLogin] = useState(false);

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
      .doc(currentUserData.uid)
      .update({ likes: firebase.firestore.FieldValue.arrayUnion(articleId) });
  };

  const removeLike = async () => {
    await usersRef
      .doc(currentUserData.uid)
      .update({ likes: firebase.firestore.FieldValue.arrayRemove(articleId) });
  };

  useEffect(() => {
    if (currentUser === null) {
      console.log("currentUserData is null");

      setLikeStatus(false);
      setLogin(true);
      return;
    }
    console.log(currentUserData);
  }, [data, currentUser]);

  switch (login) {
    case true:
      console.log("login == true");

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
