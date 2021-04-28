import { db } from "../services/firebase";

const articlesRef = db.collection("articles");
const tagsDocId = "keywords";
const tagsRef = db.collection(tagsDocId);

export const getSingleArticle = async (id) => {
  return articlesRef.doc(id).get();
};

export const allArticles = async () => {
  const articles = [];
  articlesRef.then((snapshot) => {
    const items = snapshot.docs.map((doc) => doc.data());
    articles = items;
  });
  return articles;
};

export const addArticle = async (article) => {
  const id = articlesRef.doc().id;
  const handleArticle = await articlesRef.doc(id).set({ ...article, id: id });
};

export const getTags = async () => {
  await tagsRef.get().then((items) => {
    return items.docs.map((item) => item.data().suggestions);
  });
};

export const addTags = async (tags) => {
  const handleTags = await tagsRef.doc(tagsDocId).set({ suggestions: tags });
};

export const updateArticle = async (id, data) => {
  const doc = articlesRef.doc(id);
  return doc.update(data);
};

export const deleteArticle = async (id) => {
  const doc = articlesRef.doc(id);
  return doc.delete();
};
