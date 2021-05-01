import { db } from "../services/firebase";

const articlesRef = db.collection("articles");
const usersRef = db.collection("users");
const tagsDocId = "keywords";
const tagsRef = db.collection(tagsDocId);

export const getSingleArticle = async (id) => {
  return articlesRef.doc(id).get();
};

export const allArticles = async () => {
  let articles = null;
  await articlesRef.get().then((snapshot) => {
    articles = snapshot.docs.map((doc) => doc.data());
  });
  return articles;
};

export const addLikedArticle = async (articleId, userId) => {
  await usersRef
    .doc(userId)
    .update({ likedArticles: { articleId: articleId } });
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
