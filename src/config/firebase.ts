// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// This web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyD53dlcmYrEFrfGGK2VgebhSxMNWpR7_Bk",
  authDomain: "match-point-league-project.firebaseapp.com",
  projectId: "match-point-league-project",
  storageBucket: "match-point-league-project.firebasestorage.app",
  messagingSenderId: "376639051132",
  appId: "1:376639051132:web:65e8ca53f1b6008042c0f9",
  measurementId: "G-XT3ZCNTJFG"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);