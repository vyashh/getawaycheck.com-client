import { useState } from "react";
import "./app.styles.scss";
import { Redirect, Route } from "react-router-dom";
import PrivateRoute from "./services/PrivateRoute";
import { IonApp, IonRouterOutlet } from "@ionic/react";
import { IonReactRouter } from "@ionic/react-router";
import HomePage from "./pages/HomePage/HomePage";
import AboutPage from "./pages/AboutPage/AboutPage";
import DealsPage from "./pages/DealsPage/DealsPage";
import ProfilePage from "./pages/ProfilePage/ProfilePage";
import ArticlesPage from "./pages/ArticlesPage/ArticlesPage";
import LoginPage from "./pages/LoginPage/LoginPage";
import AuthPage from "./pages/AuthPage/AuthPage";
import { AuthProvider } from "./providers/AuthProvider";
import Menu from "./components/menu/menu.component";

const App: React.FC = () => {
  return (
    <IonApp>
      <AuthProvider>
        <IonReactRouter>
          <Menu />
          <IonRouterOutlet id="main">
            {/* <PrivateRoute exact path="/" component={HomePage} /> */}
            <Route exact path="/">
              <HomePage />
            </Route>
            <Route path="/about">
              <AboutPage />
            </Route>
            <Route path="/deals">
              <DealsPage />
            </Route>
            <Route path="/profile">
              <ProfilePage />
            </Route>
            <Route path="/articles">
              <ArticlesPage />
            </Route>
            <Route exact path="/auth">
              <AuthPage />
            </Route>
            <Route path="/auth/login">
              <LoginPage />
            </Route>
          </IonRouterOutlet>
        </IonReactRouter>
      </AuthProvider>
    </IonApp>
  );
};

export default App;
