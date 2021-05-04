import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import "./DealsPage.styles.scss";
import DealItem from "../../components/deal-item/deal-item.component";
import CategorySquare from "../../components/category_square/category_square.component";

const DealsPage: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons>
            <IonBackButton />
          </IonButtons>
          <IonTitle>DEALS</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <div className="deals-page">
          <h4>CATEGORY</h4>
          {/* <CategorySquare filter={null} filterStatus={null} /> */}
          <hr className="main-hr" />
          <DealItem />
          <hr className="side-hr" />
          <DealItem />
          <hr className="side-hr" />
          <DealItem />
          <hr className="side-hr" />
          <DealItem />
          <hr className="side-hr" />
        </div>
      </IonContent>
    </IonPage>
  );
};

export default DealsPage;
