import {
  IonBackButton,
  IonButtons,
  IonContent,
  IonHeader,
  IonPage,
  IonTitle,
  IonToolbar,
} from "@ionic/react";

const AboutPage: React.FC = () => {
  return (
    <IonPage>
      <IonHeader>
        <IonToolbar>
          <IonButtons>
            <IonBackButton />
          </IonButtons>
          <IonTitle>About us</IonTitle>
        </IonToolbar>
      </IonHeader>
      <IonContent>
        <div style={{ marginRight: "1em", marginLeft: "1em" }}>
          <br /> Getaway Check is het blog waarmee je op een gemakkelijke en
          snelle manier de leukste plekken in Amsterdam vindt, gebaseerd op jouw
          locatie. Van restaurants en cafés tot hotels. Alles wat je zoekt
          tijdens een bezoek aan Amsterdam. Snel, simpel, betrouwbaar en passend
          aanbod. Check!
        </div>
      </IonContent>
    </IonPage>
  );
};

export default AboutPage;
