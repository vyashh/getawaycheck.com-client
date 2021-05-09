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
import { Redirect } from "react-router-dom";
import { NavContext } from "@ionic/react";
import { db } from "../../services/firebase";
import ArticleItem from "../../components/article-item/article-item.component";
import DetailsLocation from "../../components/details-location/details-location.component";
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
        console.log("setLikedArticles()");
        articlesRef
          .where(firebase.firestore.FieldPath.documentId(), "in", user!.likes)
          .get()
          .then((res) => {
            const articles = res.docs.map((doc) => doc.data());
            setArticles(articles);
          });
        setLoading(false);
      });
  };

  useEffect(() => {
    getLikedArticles();
  }, []);

  if (!currentUser) {
    return <Redirect to="/login" />;
  }

  if (loading) {
    return <IonLoading isOpen={true} />;
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
          {articles &&
            articles.map((article) => {
              return (
                <ArticleItem
                  key={article.id}
                  data={article}
                  setDrawerVisible={setDrawerVisible}
                  setDrawerData={setDrawerData}
                />
              );
            })}
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
