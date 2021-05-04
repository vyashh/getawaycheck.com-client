import React, { useState, useEffect, useCallback } from "react";
import { db } from "./firebase";
import { getTags } from "./firestore";

export const Context = React.createContext();

const Store = ({ children }) => {
  const articlesRef = db.collection("articles");
  const usersRef = db.collection("users");
  const [errorLogin, setErrorLogin] = useState("");
  const [loadingIndicator, setLoadingIndicator] = useState(true);
  const [articleData, setArticleData] = useState();
  const [tagsData, setTagsData] = useState();
  const [alertMessage, setAlertMessage] = useState("");
  const [userData, setUserData] = useState();
  const [userLikeData, setUserLikeData] = useState();

  const fetchArticleData = useCallback(() => {
    articlesRef.get().then((item) => {
      console.log("store: read articles ");
      const items = item.docs.map((doc) => doc.data());

      setArticleData(items);
      setLoadingIndicator(false);
    });
  }, []);

  useEffect(() => {
    console.log("store: useEffect");
    // fetchArticleData();
  });

  return (
    <Context.Provider
      value={{
        errorLogin: [errorLogin, setErrorLogin],
        loadingIndicator: [loadingIndicator, setLoadingIndicator],
        articleData: [articleData, setArticleData],
        tagsData: [tagsData, setTagsData],
        alertMessage: [alertMessage, setAlertMessage],
        userData: [userData, setUserData],
        userLikeData: [userLikeData, setUserLikeData],
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default Store;
