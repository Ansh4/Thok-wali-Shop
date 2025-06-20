// src/firebase.js
import { initializeApp } from "firebase/app";

const firebaseConfig = {
  apiKey: "AIzaSyCvnWLNizS4PVG_env9BFo1iiKDjSXMk1g",
  authDomain: "thok-wali-shop.firebaseapp.com",
  projectId: "thok-wali-shop",
  storageBucket: "thok-wali-shop.appspot.com",
  messagingSenderId: "879597631260",
  appId: "1:879597631260:web:48131ccd7f5d839b5422d9"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export default app;
