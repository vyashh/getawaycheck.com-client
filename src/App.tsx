import { useState } from "react";
import "./app.styles.scss";
import { Redirect, Route } from "react-router-dom";
import { IonApp, IonRouterOutlet } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import HomePage from "./pages/HomePage/HomePage";
import LoginPage from "./pages/LoginPage/LoginPage";
import { AuthContext } from "./providers/AuthProvider";

const App: React.FC = () => {
  const [loggedIn, setLoggedIn] = useState(true);

  return (
    <IonApp>
      <AuthContext.Provider value={{ loggedIn }}>
        <IonReactRouter>
          <IonRouterOutlet>
            <Route exact path="/home">
              {loggedIn ? <HomePage /> : <Redirect to="/login" />}
            </Route>
            <Route exact path="/login">
              {loggedIn ? <Redirect to="/home" /> : <LoginPage />}
            </Route>
            <Route exact path="/">
              <Redirect to="/home" />
            </Route>
          </IonRouterOutlet>
        </IonReactRouter>
      </AuthContext.Provider>
    </IonApp>
  );
};

export default App;
