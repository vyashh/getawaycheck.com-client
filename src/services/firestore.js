import { db } from "../services/firebase";
import firebase from "firebase/app";
import dayjs from "dayjs";

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

export const handleLikeArticle = async (article, currentUserId) => {
  const articleExists = article.likedBy.includes(currentUserId);

  if (articleExists) {
    console.log("like removed: ", articleExists);
    return articlesRef.doc(article.id).update({
      likedBy: firebase.firestore.FieldValue.arrayRemove(currentUserId),
    });
  }

  console.log("like added: ", articleExists);
  return articlesRef.doc(article.id).update({
    likedBy: firebase.firestore.FieldValue.arrayUnion(currentUserId),
  });
};

// OUDE HANDLELIKEARTICLE()

// const toLike = { article_id: articleId, date_time: dayjs().format() };

// if (currentUserLikeData !== undefined) {
//   currentUserLikeData.map((like) => {
//     console.log(like.article_id === articleId);
//     if (like.article_id === articleId) {
//       const foundLike = currentUserLikeData.filter(
//         (like) => like.article_id === articleId
//       );
//       return db
//         .collection("users")
//         .doc(currentUserId)
//         .update({
//           liked_articles: firebase.firestore.FieldValue.arrayRemove(
//             foundLike
//           ),
//         });
//     }
//   });
// }

// return db
//   .collection("users")
//   .doc(currentUserId)
//   .update({
//     liked_articles: firebase.firestore.FieldValue.arrayUnion(toLike),
//   });

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
