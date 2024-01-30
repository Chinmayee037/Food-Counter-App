// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAJli-3BGWU93avy9MrTfnnK1ICih2oOUc",
  authDomain: "foodcounterapp-cd05e.firebaseapp.com",
  projectId: "foodcounterapp-cd05e",
  storageBucket: "foodcounterapp-cd05e.appspot.com",
  messagingSenderId: "1010785246328",
  appId: "1:1010785246328:web:9e9c2f18bfe35ac2f6e18d",
  measurementId: "G-T9J01QVYWW"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);