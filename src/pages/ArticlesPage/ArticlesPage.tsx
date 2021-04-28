import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useState } from "react";
import "./ArticlesPage.styles.scss";
import ArticleItem from "../../components/article-item/article-item.component";
import CategorySquare from "../../components/category_square/category_square.component";
import { allArticles } from "../../services/firestore";

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
        <div className="deals-page">
          <h4>CATEGORY</h4>
          <CategorySquare filter={null} filterStatus={null} />
          <hr className="main-hr" />
          <ArticleItem />
          <hr className="side-hr" />
          <ArticleItem />
          <hr className="side-hr" />
          <ArticleItem />
          <hr className="side-hr" />
          <ArticleItem />
          <hr className="side-hr" />
        </div>
      </IonContent>
    </IonPage>
  );
};

export default ArticlesPage;
