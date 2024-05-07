// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";

import { getFirestore } from "firebase/firestore";
const firebaseConfig = {
  apiKey: "AIzaSyB3WhsHtpnKyW8Pzc56xREVOXFtIWYr-Qo",
  authDomain: "findingmapenzi.firebaseapp.com",
  projectId: "findingmapenzi",
  storageBucket: "findingmapenzi.appspot.com",
  messagingSenderId: "467318654164",
  appId: "1:467318654164:web:6ed3be4818821801026741",
  measurementId: "G-JB021473QV"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

export const firestore =getFirestore(app);