import React, { useState, useRef, useContext, useCallback } from "react";
import { useAuth } from "../../providers/AuthProvider";
import { IonContent, IonPage } from "@ionic/react";
import "./LoginPage.scss";
import { Redirect } from "react-router-dom";
import { NavContext } from "@ionic/react";
import Button from "../../components/button/button.component";

const LoginPage: React.FC = () => {
  const { navigate } = useContext(NavContext);
  const emailRef = useRef<any>(null);
  const passwordRef = useRef<any>(null);
  const { login, currentUser } = useAuth();
  const toRegister = useCallback(() => navigate("/auth/register"), [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Login");
    try {
      // setError("");
      // setLoading(true);
      login(emailRef.current.value, passwordRef.current.value);
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
          <div className="login-page__header" style={{ marginLeft: "2em" }}>
            <h2>Welcome back!</h2>
            <p>
              We missed you<span>.</span>
            </p>
          </div>
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

              <div className="login-page__inputs--button">
                <p
                  style={{
                    fontSize: ".8em",
                    textAlign: "center",
                    color: "white",
                  }}
                >
                  Don't have an account?
                  <span style={{ fontWeight: "bold" }} onClick={toRegister}>
                    {" "}
                    Register
                  </span>
                </p>
                {/* <button type="submit">
                  LOGIN
                </button> */}
                <div onClick={handleSubmit}>
                  <Button type="primary" width="20em" text="Login" />
                </div>
              </div>
            </form>
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default LoginPage;
