// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBJwEB5zqYqbpDJbMOvN8m_p5ibvZK5LNo",
  authDomain: "book-rental-system-78763.firebaseapp.com",
  projectId: "book-rental-system-78763",
  storageBucket: "book-rental-system-78763.appspot.com",
  messagingSenderId: "452178439478",
  appId: "1:452178439478:web:8cca5d9552bf583a0a1797",
  measurementId: "G-6ZNGZF1QXL"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app); 