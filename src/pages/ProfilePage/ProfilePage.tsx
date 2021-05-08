import React, { useState, useRef, useContext } from "react";
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
import ArticleItem from "../../components/deal-item/deal-item.component";

const ProfilePage: React.FC = () => {
  const { navigate } = useContext(NavContext);
  const { currentUser } = useAuth();
  const articlesRef = db.collection("articles");
  const [articles, setArticles] = useState<any>(null);

  articlesRef.get().then((item) => {
    const items = item.docs.map((doc) => doc.data());
    setArticles(items);
  });

  if (!currentUser) {
    return <Redirect to="/login" />;
  }

  if (!articles) {
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
        <div className="profile-page"></div>
      </IonContent>
    </IonPage>
  );
};

export default ProfilePage;
