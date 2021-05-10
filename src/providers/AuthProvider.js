import React, { useContext, useState, useEffect } from "react";
import { Context } from "../services/store";
import { auth, db } from "../services/firebase";

const AuthContext = React.createContext();

export function useAuth() {
  return useContext(AuthContext);
}

export function AuthProvider({ children }) {
  const { errorLogin, loadingIndicator, userData, userLikeData } = useContext(
    Context
  );
  const [currentUserData, setCurrentUserData] = userData;
  const [currentUserLikeData, setCurrentUserLikeData] = userLikeData;
  const [loginError, setLoginError] = errorLogin;
  const [currentUser, setCurrentUser] = useState();
  const [loading, setLoading] = loadingIndicator;

  function signup(email, password) {
    return auth.createUserWithEmailAndPassword(email, password);
  }

  function login(email, password, firstName, lastName) {
    return auth.signInWithEmailAndPassword(email, password);
  }

  function logout() {
    return auth.signOut();
  }

  function resetPassword(email) {
    return auth.sendPasswordResetEmail(email);
  }

  function updateEmail(email) {
    return currentUser.updateEmail(email);
  }

  function updatePassword(password) {
    return currentUser.updatePassword(password);
  }

  function getUserData(uid) {
    db.collection("users")
      .doc(uid)
      .get()
      .then((res) => {
        const userData = res.data();
        setCurrentUserData(userData);
      });
  }

  useEffect(() => {
    setLoading(true);
    const unsubscribe = auth.onAuthStateChanged((user) => {
      setCurrentUser(user);
      setLoading(false);
      console.log(user);
      getUserData(user.uid);
    });

    return unsubscribe;
  }, []);

  const value = {
    currentUser,
    login,
    signup,
    logout,
    resetPassword,
    updateEmail,
    updatePassword,
  };

  return (
    // add the functions to the context via the value parameter. Children can use this the functions if wrapped as parent.
    <AuthContext.Provider value={value}>
      {!loading && children}
    </AuthContext.Provider>
  );
}
