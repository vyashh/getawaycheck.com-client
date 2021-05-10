import { IonContent, IonHeader, IonItem, IonList, IonMenu } from "@ionic/react";
import { menuController } from "@ionic/core";
import React, { useContext } from "react";
import "./menu.styles.scss";
import {
  PersonCircleOutline,
  SettingsOutline,
  GiftOutline,
  NewspaperOutline,
  HeartOutline,
  LogOutOutline,
} from "react-ionicons";
import { Link } from "react-router-dom";
import { Context } from "../../services/store";
import { useAuth } from "../../providers/AuthProvider";

// interface Props {
//   isVisible: boolean;
//   setIsVisible: any;
//   data: any;
// }

const Menu: React.FC = () => {
  const { userData } = useContext(Context);
  const { logout } = useAuth();
  const [currentUser, setCurrentUser] = userData;

  const logoutHandler = () => {
    logout();
    window.location.reload();
  };

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
            <Link
              to="/deals"
              onClick={async () => await menuController.toggle()}
            >
              Deals
            </Link>
          </IonItem>
          {currentUser ? (
            <IonItem className="menu__item">
              <span>
                <PersonCircleOutline
                  color={"#ffffff"}
                  title="profile"
                  height="1em"
                  width="1em"
                />
              </span>
              <Link
                to="/profile"
                onClick={async () => await menuController.toggle()}
              >
                Profile
              </Link>
            </IonItem>
          ) : (
            <IonItem className="menu__item">
              <span>
                <PersonCircleOutline
                  color={"#ffffff"}
                  title="profile"
                  height="1em"
                  width="1em"
                />
              </span>
              <Link
                to="/auth"
                onClick={async () => await menuController.toggle()}
              >
                Profile
              </Link>
            </IonItem>
          )}
          {/* <IonItem className="menu__item">
            <span>
              <SettingsOutline
                color={"#ffffff"}
                title="settings"
                height="1em"
                width="1em"
              />
            </span>
            Settings
          </IonItem> */}
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
          {currentUser && (
            <IonItem className="menu__item" onClick={logoutHandler}>
              <span>
                <LogOutOutline
                  color={"#ffffff"}
                  title="profile"
                  height="1em"
                  width="1em"
                />
              </span>
              Logout
            </IonItem>
          )}
        </IonList>
      </IonContent>
    </IonMenu>
  );
};

export default Menu;
