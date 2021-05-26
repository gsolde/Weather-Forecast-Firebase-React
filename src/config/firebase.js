import firebase from "firebase";
import "firebase/auth";

export const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyC18HRzjmoNIWYPEgJjBIAWnaYfX4GJFDw",
  authDomain: "iomedassignment.firebaseapp.com",
  databaseURL: "https://iomedassignment-default-rtdb.europe-west1.firebasedatabase.app",
  projectId: "iomedassignment",
  storageBucket: "iomedassignment.appspot.com",
  messagingSenderId: "510675597698",
  appId: "1:510675597698:web:2d23eb5d0774c1d596379b",
});

export const auth = firebaseApp.auth();
