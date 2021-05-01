import React, { useState, useEffect } from "react";
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

  const fetchArticleData = () => {
    articlesRef.get().then((item) => {
      const items = item.docs.map((doc) => doc.data());
      setArticleData(items);
      setLoadingIndicator(false);
    });
  };

  useEffect(() => {
    fetchArticleData();
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
      }}
    >
      {children}
    </Context.Provider>
  );
};

export default Store;
