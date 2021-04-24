import { useState } from "react";
import "./app.styles.scss";
import { Redirect, Route } from "react-router-dom";
import { IonApp, IonRouterOutlet } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import HomePage from "./pages/HomePage/HomePage";
import AboutPage from "./pages/AboutPage/AboutPage";
import ArticlesPage from "./pages/ArticlesPage/ArticlesPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import { AuthContext } from "./providers/AuthProvider";
import Menu from "./components/menu/menu.component";

const App: React.FC = () => {
  const [loggedIn, setLoggedIn] = useState(true);

  return (
    <IonApp>
      <AuthContext.Provider value={{ loggedIn }}>
        <IonReactRouter>
          <Menu />
          <IonRouterOutlet id="main">
            <Route exact path="/home">
              {loggedIn ? <HomePage /> : <Redirect to="/login" />}
            </Route>
            <Route exact path="/about">
              <AboutPage />
            </Route>
            <Route exact path="/articles">
              <ArticlesPage />
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
