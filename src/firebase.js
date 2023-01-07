import firebase from "firebase/compat/app";
import "firebase/compat/auth";
import "firebase/compat/firestore";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBq6cVAUxpFAv__vDvkKC7iTNgdD6qcyZI",
  authDomain: "whatsapp-clone-project-5beef.firebaseapp.com",
  projectId: "whatsapp-clone-project-5beef",
  storageBucket: "whatsapp-clone-project-5beef.appspot.com",
  messagingSenderId: "446153952034",
  appId: "1:446153952034:web:5b2612f809e488f282b37b",
  measurementId: "G-F47PFDGDH3",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();

const auth = firebase.auth();

const provider = new firebase.auth.GoogleAuthProvider();

export { db, auth, provider };
