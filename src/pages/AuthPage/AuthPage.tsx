import "./AuthPage.scss";
import Button from "../../components/button/button.component";
import Character from "../../assets/img/auth_character.svg";
import City from "../../assets/img/auth_city.svg";
import Typist from "react-typist";
import { useCallback, useContext, useEffect, useState } from "react";
import { IonContent, IonPage } from "@ionic/react";
import { Redirect } from "react-router";
import { NavContext } from "@ionic/react";

const AuthPage: React.FC = () => {
  const [count, setCount] = useState(1);
  const { navigate } = useContext(NavContext);

  const toLogin = useCallback(() => navigate("/auth/login"), [navigate]);
  const toRegister = useCallback(() => navigate("/auth/register"), [navigate]);

  useEffect(() => {
    setCount(1);
  }, [count]);

  return (
    <IonPage>
      <IonContent>
        <div className="auth-page">
          <div className="auth-page__buttons">
            <div className="auth-page__title">
              <div>Explore the </div>
              <div>
                {count ? (
                  <Typist avgTypingDelay={50} onTypingDone={() => setCount(0)}>
                    <span> City.</span>
                    <Typist.Backspace count={20} delay={800} />
                    <span> Bars.</span>
                    <Typist.Backspace count={20} delay={800} />
                    <span> Hotels.</span>
                    <Typist.Backspace count={20} delay={800} />
                    <span> Cafe's.</span>
                    <Typist.Backspace count={20} delay={800} />
                  </Typist>
                ) : (
                  ""
                )}
              </div>
            </div>
            <Button type="primary" width="15em" text="REGISTER" />
            <div onClick={toLogin}>
              <Button type="secondary" width="15em" text="LOGIN" />
            </div>
          </div>
          <div className="auth-page__background">
            {/* <img className="auth-page__background--city" src={City} alt="city" /> */}
            <img
              className="auth-page__background--character"
              src={Character}
              alt="person browsing web"
            />
          </div>
        </div>
      </IonContent>
    </IonPage>
  );
};

export default AuthPage;
