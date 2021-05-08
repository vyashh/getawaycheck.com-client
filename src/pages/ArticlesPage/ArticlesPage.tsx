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
import { db } from "../../services/firebase";
import { useAuth } from "../../providers/AuthProvider";
import { useState, useEffect, useContext } from "react";
import "./ArticlesPage.styles.scss";
import ArticleItem from "../../components/article-item/article-item.component";
import CategorySquare from "../../components/category_square/category_square.component";
import DetailsLocation from "../../components/details-location/details-location.component";
import FlipMove from "react-flip-move";
import { Context } from "../../services/store";

const ArticlesPage: React.FC = () => {
  const { currentUser } = useAuth();
  const [userData, setUserData] = useState<any>(null);
  const usersRef = db.collection("users");
  const articlesRef = db.collection("articles");
  const { articleData } = useContext(Context);
  const [articles, setArticles] = articleData;
  const [filteredLocations, setFilteredLocations] = useState(articles);
  const [filter, setFilter]: any[] = useState(["drinks", "hotel", "food"]);
  const [drawerVisble, setDrawerVisible] = useState(false);
  const [drawerData, setDrawerData] = useState<any>([null]);

  const getLocations = () => {
    articlesRef.get().then((snapshot) => {
      const items = snapshot.docs.map((doc) => doc.data());
      setArticles(items);
      setFilteredLocations(items);
    });
  };

  const getUserData = async () => {
    await usersRef
      .doc(currentUser.uid)
      .get()
      .then((doc) => setUserData(doc.data()));
  };

  const applyFilter = () => {
    setFilteredLocations(
      articles.filter((location: any) => filter.includes(location.category))
    );
  };

  const filterLocations = (category: string) => {
    // search index of category. if exists remove else add to array. the filter array is later used in applyFilter() to filter.
    const index = filter.indexOf(category);
    const locations = filter;

    if (index >= 0) {
      locations.splice(index, 1);
    } else {
      locations.push(category);
    }

    setFilter(locations);
    applyFilter();
    console.log(filteredLocations);
  };

  useEffect(() => {
    getLocations();
    if (currentUser !== null) {
      getUserData();
    }
  }, []);

  if (!filteredLocations) {
    return <IonLoading isOpen={true} />;
  }

  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons>
            <IonBackButton />
            <IonTitle>Articles</IonTitle>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent forceOverscroll={true}>
        <div className="articles-page">
          <div className="articles-page__header" slot="fixed">
            <h4>CATEGORY</h4>
            <CategorySquare filter={filterLocations} filterStatus={filter} />
          </div>
          <hr className="main-hr" />
          {/* <FlipMove> */}
          {filteredLocations.map((article: any) => {
            if (article.isPublic) {
              return (
                <div key={article.address}>
                  <ArticleItem
                    data={article}
                    setDrawerVisible={setDrawerVisible}
                    setDrawerData={setDrawerData}
                  />
                  <hr className="side-hr" />
                </div>
              );
            }
          })}
          {/* </FlipMove> */}
          <DetailsLocation
            isVisible={drawerVisble}
            setIsVisible={setDrawerVisible}
            data={drawerData}
            getLocations={getLocations}
          />
        </div>
      </IonContent>
    </IonPage>
  );
};

export default ArticlesPage;
