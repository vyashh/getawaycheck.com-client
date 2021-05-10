import React, { useState, useRef, useContext, useCallback } from "react";
import { useAuth } from "../../providers/AuthProvider";
import { IonContent, IonPage } from "@ionic/react";
import "./RegisterPage.scss";
import { Redirect } from "react-router-dom";
import { NavContext } from "@ionic/react";
import Button from "../../components/button/button.component";
import { db } from "../../services/firebase";

const LoginPage: React.FC = () => {
  const { navigate } = useContext(NavContext);
  const usersRef = db.collection("users");
  const emailRef = useRef<any>(null);
  const firstNameRef = useRef<any>(null);
  const lastNameRef = useRef<any>(null);
  const passwordRef = useRef<any>(null);
  const { signup, currentUser } = useAuth();
  const toLogin = useCallback(() => navigate("/auth/login"), [navigate]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("register");
    const firstName = firstNameRef.current.value;
    const lastName = lastNameRef.current.value;

    try {
      // setError("");
      // setLoading(true);

      signup(
        emailRef.current.value,
        passwordRef.current.value,
        firstName,
        lastName
      ).then((user) => {
        user = user.user;
        const userRef = usersRef.doc(user.uid);
        userRef.get().then((snapshot) => {
          if (!snapshot.exists) {
            userRef.set({
              uid: user.uid,
              first_name: firstName,
              last_name: lastName,
              likes: [],
            });
          }
        });
      });
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
            <h2>Welcome!</h2>
            <p>
              Start exploring the world<span>.</span>
            </p>
          </div>
          <div className="login-page__inputs">
            <form>
              <div className="login-page__inputs--first_name">
                <input
                  ref={firstNameRef}
                  type="text"
                  name="first_name"
                  placeholder="First name"
                />
              </div>
              <div className="login-page__inputs--last_name">
                <input
                  ref={lastNameRef}
                  type="text"
                  name="last_name"
                  placeholder="Last name"
                />
              </div>
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
                <p style={{ fontSize: ".8em", textAlign: "center" }}>
                  Already have an account?
                  <span style={{ fontWeight: "bold" }} onClick={toLogin}>
                    {" "}
                    Login
                  </span>
                </p>
                {/* <button type="submit">
                  LOGIN
                </button> */}
                <div onClick={handleSubmit}>
                  <Button type="primary" width="20em" text="Register" />
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
