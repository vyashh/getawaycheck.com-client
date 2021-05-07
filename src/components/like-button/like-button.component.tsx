import "./like-button.styles.scss";
import { HeartOutline, HeartDislikeOutline } from "react-ionicons";
import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { Context } from "../../services/store";
import { useAuth } from "../../providers/AuthProvider";
import { handleLikeArticle } from "../../services/firestore";

interface Props {
  data: any;
  articleId: string;
}

const LikeButton: React.FC<Props> = ({ data, articleId }) => {
  const { currentUser } = useAuth();
  const { userData, userLikeData } = useContext(Context);
  const currentUserData = userData[0];
  const [isLiked, setIsLiked] = useState(false);
  const [login, setLogin] = useState(false);

  const onLikeHandler = (e) => {
    e.preventDefault();
    console.log(isLiked);
    handleLikeArticle(articleId, data, currentUser.uid);
    setIsLiked(!isLiked);
  };

  useEffect(() => {
    if (currentUser === null) {
      console.log("currentUserData is null");

      setIsLiked(false);
      setLogin(true);
    } else {
      console.log(data);
    }
  }, []);

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
      console.log("login == false");
      if (isLiked) {
        return (
          <HeartDislikeOutline
            color={"#ffffff"}
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
