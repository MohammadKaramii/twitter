// Import the functions you need from the SDKs you need
import { initializeApp, getApp, getApps } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getStorage } from "firebase/storage";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey:process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: "twitter-v1-f6e58.firebaseapp.com",
  projectId: "twitter-v1-f6e58",
  storageBucket: "twitter-v1-f6e58.appspot.com",
  messagingSenderId: "1096950276289",
  appId: "1:1096950276289:web:c650bab7d71499b690f440"
};

// Initialize Firebase
const app = !getApps().length ? initializeApp(firebaseConfig) : getApp()
const database = getFirestore()
const storage = getStorage()

export {app, database, storage}