import { IonContent, IonHeader, IonItem, IonList, IonMenu } from "@ionic/react";
import { menuController } from "@ionic/core";
import React, { useState, useCallback } from "react";
import "./menu.styles.scss";
import {
  PersonCircleOutline,
  SettingsOutline,
  GiftOutline,
  NewspaperOutline,
  HeartOutline,
} from "react-ionicons";
import { Link } from "react-router-dom";

// interface Props {
//   isVisible: boolean;
//   setIsVisible: any;
//   data: any;
// }

const Menu: React.FC = () => {
  return (
    <IonMenu side="end" menuId="main" contentId="main">
      <IonHeader>
        {/* <IonToolbar color="light">
          <IonTitle>Start Menu</IonTitle>
        </IonToolbar> */}
      </IonHeader>
      <IonContent>
        <IonList className="menu" style={{ backgroundColor: "#121212" }}>
          <IonItem className="menu__item">
            <span>
              <NewspaperOutline
                color={"#ffffff"}
                title="settings"
                height="1em"
                width="1em"
              />
            </span>
            <Link
              to="/articles"
              onClick={async () => await menuController.toggle()}
            >
              Articles
            </Link>
          </IonItem>
          <IonItem className="menu__item">
            <span>
              <GiftOutline
                color={"#ffffff"}
                title="settings"
                height="1em"
                width="1em"
              />
            </span>
            Deals
          </IonItem>
          <IonItem className="menu__item">
            <span>
              <PersonCircleOutline
                color={"#ffffff"}
                title="profile"
                height="1em"
                width="1em"
              />
            </span>
            Profile
          </IonItem>
          <IonItem className="menu__item">
            <span>
              <SettingsOutline
                color={"#ffffff"}
                title="settings"
                height="1em"
                width="1em"
              />
            </span>
            Settings
          </IonItem>
          <IonItem className="menu__item">
            <span>
              <HeartOutline
                color={"#ffffff"}
                title="settings"
                height="1em"
                width="1em"
              />
            </span>
            <Link
              to="/about"
              onClick={async () => await menuController.toggle()}
            >
              About us
            </Link>
          </IonItem>
        </IonList>
      </IonContent>
    </IonMenu>
  );
};

export default Menu;
