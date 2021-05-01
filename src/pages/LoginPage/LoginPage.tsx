import React, { useState, useRef, useContext } from "react";
import { useAuth } from "../../providers/AuthProvider";
import { IonContent, IonPage } from "@ionic/react";
import "./LoginPage.scss";
import { Redirect } from "react-router-dom";
import { NavContext } from "@ionic/react";

const LoginPage: React.FC = () => {
  const { navigate } = useContext(NavContext);
  const emailRef = useRef<any>(null);
  const passwordRef = useRef<any>(null);
  const { login, currentUser } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Login");
    try {
      // setError("");
      // setLoading(true);
      login(emailRef.current.value, passwordRef.current.value);
      // history.push("/");
    } catch {
      // setError("Failed to log in");
    }
    // setLoading(false);
  };

  if (currentUser) {
    return <Redirect to="/" />;
  }

  return (
    <IonPage>
      <IonContent>
        <div className="login-page">
          <div className="login-page__inputs">
            <form>
              <div className="login-page__inputs--login">
                <input
                  ref={emailRef}
                  type="email"
                  name="email"
                  placeholder="E-mail"
                />
              </div>
              <div className="login-page__inputs--password">
                <input
                  ref={passwordRef}
                  type="password"
                  name="password"
                  placeholder="Password"
                />
              </div>
              <div className="login-page_inputs--button">
                <button onClick={handleSubmit} type="submit">
                  LOGIN
                </button>
              </div>
            </form>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default LoginPage;
