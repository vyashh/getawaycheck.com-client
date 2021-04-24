import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import "./ArticlesPage.styles.scss";
import ArticleItem from "../../components/article-item/article-item.component";

const sideHrStyling = {
  border: "none",
  height: "2px",
  background: "#3A3A3A",
};

const hrStyling = {
  border: "none",
  height: "2px",
  width: "50%",
  background: "#3A3A3A",
};

const ArticlesPage: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons>
            <IonBackButton />
          </IonButtons>
          <IonTitle>Articles</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <ArticleItem />
        <hr className="side-hr" />
        <ArticleItem />

        <ArticleItem />
        <ArticleItem />
      </IonContent>
    </IonPage>
  );
};

export default ArticlesPage;
