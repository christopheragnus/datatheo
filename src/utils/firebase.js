import firebase from "firebase/app";
import "firebase/firebase-firestore";

firebase.initializeApp({
  apiKey: process.env.REACT_APP_FIREBASE_API,
  authDomain: "datatheo-f43b7.firebaseapp.com",
  databaseURL: "https://datatheo-f43b7.firebaseio.com",
  projectId: "datatheo-f43b7",
  storageBucket: "datatheo-f43b7.appspot.com",
  messagingSenderId: "1026083185471",
  appId: "1:1026083185471:web:d7b0122ce710ca8e"
});

export const db = firebase.firestore();
