import React, { useState, useRef, useContext, useEffect } from "react";
import { useAuth } from "../../providers/AuthProvider";
import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonLoading,
  IonMenuButton,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import "./ProfilePage.scss";
import "../ArticlesPage/ArticlesPage.scss";
import { Redirect } from "react-router-dom";
import { NavContext } from "@ionic/react";
import { db } from "../../services/firebase";
import ArticleItem from "../../components/article-item/article-item.component";
import DetailsLocation from "../../components/details-location/details-location.component";
import EmptyImage from "../../assets/img/empty.svg";
import firebase from "firebase/app";

const ProfilePage: React.FC = () => {
  const { navigate } = useContext(NavContext);
  const { currentUser } = useAuth();
  const articlesRef = db.collection("articles");
  const usersRef = db.collection("users");
  const [currentUserData, setCurrentUserData] = useState<any>(null);
  const [likedArticles, setLikedArticles] = useState<any>(null);
  const [articles, setArticles] = useState<any>(null);
  const [drawerVisble, setDrawerVisible] = useState(false);
  const [drawerData, setDrawerData] = useState<any>([null]);
  const [loading, setLoading] = useState(false);

  const getLikedArticles = async () => {
    setLoading(true);
    await usersRef
      .doc(currentUser.uid)
      .get()
      .then((doc) => {
        const user = doc.data();
        setCurrentUserData(user);
        setLikedArticles(user!.likes);
        if (user!.likes.length > 0) {
          articlesRef
            .where(firebase.firestore.FieldPath.documentId(), "in", user!.likes)
            .get()
            .then((res) => {
              const articles = res.docs.map((doc) => doc.data());
              setArticles(articles);
            });
        } else {
          setArticles(null);
        }
        setLoading(false);
      });
  };

  useEffect(() => {
    getLikedArticles();
  }, []);

  if (loading) {
    return <IonLoading isOpen={true} />;
  }
  if (!currentUser) {
    return <Redirect to="/login" />;
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons>
            <IonBackButton />
            <IonTitle>Profile</IonTitle>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <div className="profile-page">
          {articles && (
            <div>
              <div className="profile-page__header">
                <h4>Liked Articles</h4>
              </div>
              <hr className="main-hr" />
            </div>
          )}

          {articles ? (
            articles.map((article) => {
              if (article.isPublic) {
                return (
                  <div key={article.id}>
                    <ArticleItem
                      data={article}
                      setDrawerVisible={setDrawerVisible}
                      setDrawerData={setDrawerData}
                    />
                    <hr className="side-hr" />
                  </div>
                );
              }
            })
          ) : (
            <div className="profile-page__empty">
              <div>
                <img src={EmptyImage} alt="no likes" />
              </div>
              <div>
                <p>Hmmm... No liked articles yet!</p>
              </div>
            </div>
          )}
          <DetailsLocation
            isVisible={drawerVisble}
            setIsVisible={setDrawerVisible}
            data={drawerData}
          />
        </div>
      </IonContent>
    </IonPage>
  );
};

export default ProfilePage;
