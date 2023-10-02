// Import the functions you need from the SDKs you need
import { initializeApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
    apiKey: "AIzaSyCD65sLIQaqhH35JBK0_4jFx5UA8rNFs8c",
    authDomain: "glimpse-5c374.firebaseapp.com",
    projectId: "glimpse-5c374",
    storageBucket: "glimpse-5c374.appspot.com",
    messagingSenderId: "672001287263",
    appId: "1:672001287263:web:16fa4ea8f72ef94b8067ea",
    measurementId: "G-RF01G3C21E"
  };

// Initialize Firebase
let firebase_app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApps()[0];
const app2 = initializeApp(firebaseConfig);

const db = getFirestore(app2); 
const storage = getStorage(); 

export {firebase_app, db, storage};