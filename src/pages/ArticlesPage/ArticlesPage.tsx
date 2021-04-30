import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonList,
  IonLoading,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import { useState, useEffect, useContext } from "react";
import "./ArticlesPage.styles.scss";
import ArticleItem from "../../components/article-item/article-item.component";
import CategorySquare from "../../components/category_square/category_square.component";
import DetailsLocation from "../../components/details-location/details-location.component";
import { Context } from "../../services/store";

const ArticlesPage: React.FC = () => {
  const { articleData } = useContext(Context);
  const [articles, setArticles] = articleData;
  const [drawerVisble, setDrawerVisible] = useState(false);
  const [drawerData, setDrawerData] = useState<any>([null]);

  if (!articles) {
    return <IonLoading isOpen={true} />;
  }

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
