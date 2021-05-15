import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";
import "./ContactPage.scss";

const ContactPage: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons>
            <IonBackButton />
            <IonTitle>Contact</IonTitle>
          </IonButtons>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <div className="contact-page">
          Wij zijn voor zakelijke vragen bereikbaar via e-mailadres:{" "}
          <a href="mailto:getawaycheck@gmail.com">getawaycheck@gmail.com</a>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default ContactPage;
