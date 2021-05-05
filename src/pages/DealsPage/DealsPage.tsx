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
import ComingSoonImage from "../../assets/img/coming_soon.svg";

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
          {/* <h4>CATEGORY</h4>
          <hr className="main-hr" />
          <DealItem />
          <hr className="side-hr" />
          <DealItem />
          <hr className="side-hr" />
          <DealItem />
          <hr className="side-hr" />
          <DealItem />
          <hr className="side-hr" /> */}
          <div className="deals-page__coming-soon">
            <div>
              <img src={ComingSoonImage} alt="coming soon" />
            </div>
            <div>
              <h2>COMING SOON</h2>
            </div>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default DealsPage;
