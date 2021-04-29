import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonList,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useState, useEffect } from "react";
import "./ArticlesPage.styles.scss";
import ArticleItem from "../../components/article-item/article-item.component";
import CategorySquare from "../../components/category_square/category_square.component";
import DetailsLocation from "../../components/details-location/details-location.component";
import { allArticles } from "../../services/firestore";

const ArticlesPage: React.FC = () => {
  const [articles, setArticles] = useState<any>([]);
  const [drawerVisble, setDrawerVisible] = useState(false);
  const [drawerData, setDrawerData] = useState<any>([null]);

  useEffect(() => {
    allArticles().then((res) => setArticles(res));
  }, []);

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
      <IonContent forceOverscroll={true}>
        <div className="deals-page">
          <div className="deals-page__header" slot="fixed">
            <h4>CATEGORY</h4>
            <CategorySquare filter={null} filterStatus={null} />
          </div>
          <hr className="main-hr" />
          {articles.map((article: any) => (
            <div key={article.dateTime}>
              <ArticleItem
                data={article}
                setDrawerVisible={setDrawerVisible}
                setDrawerData={setDrawerData}
              />
              <hr className="side-hr" />
            </div>
          ))}
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

export default ArticlesPage;
