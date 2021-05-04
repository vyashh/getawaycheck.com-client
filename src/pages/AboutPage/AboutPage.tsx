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
        <div
          style={{ marginRight: "1em", marginLeft: "1em", marginTop: "1em" }}
        >
          Getaway Check is het platform waarmee je de leukste trendy hotspots in
          Amsterdam vindt, gebaseerd op jouw huidige locatie. Door middel van
          een zoekfilter kun je precies vinden waar je op dat moment naar op
          zoek bent. Ook is het mogelijk om deze hotspots op te slaan en te
          liken via je persoonlijke account. Van restaurants en cafés tot
          hotels. Alles wat je zoekt tijdens een bezoek aan Amsterdam. Snel,
          simpel, betrouwbaar en passend aanbod. Check!
        </div>
      </IonContent>
    </IonPage>
  );
};

export default AboutPage;
