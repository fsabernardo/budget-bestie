// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"
import { getAuth } from "firebase/auth"
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDxPHuEEJqXOBketOe1ZAt9oi0dnZYv2Xg",
  authDomain: "budget-bestie-v2.firebaseapp.com",
  projectId: "budget-bestie-v2",
  storageBucket: "budget-bestie-v2.appspot.com",
  messagingSenderId: "221084138787",
  appId: "1:221084138787:web:db4eb89d52cbb930eba096"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);
const auth = getAuth(app);

export {app, db, auth};