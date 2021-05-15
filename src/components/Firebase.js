import firebase from "firebase";

const firebaseApp = firebase.initializeApp({
  apiKey: "AIzaSyDJlc3kWcE-nD46ppkB6SDDa9c_yytwnDM",
  authDomain: "instagram-clone-6acb1.firebaseapp.com",
  projectId: "instagram-clone-6acb1",
  storageBucket: "instagram-clone-6acb1.appspot.com",
  messagingSenderId: "1067992587759",
  appId: "1:1067992587759:web:666012bb5807ffed29ea1a",
  measurementId: "G-EVV35KMG2Q",
});

const db = firebaseApp.firestore();

const auth = firebaseApp.auth();

const storage = firebaseApp.storage();

export {db,auth,storage}
