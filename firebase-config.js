// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import firebase from "firebase/compat";
import 'firebase/compat/auth';
import 'firebase/compat/firestore';
import { getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
export const firebaseConfig = {
  apiKey: "AIzaSyA0EcJtuHfrfsgrR5gxbiTEWQkSYbAKQXM",
  authDomain: "dinnerisnear-9291d.firebaseapp.com",
  projectId: "dinnerisnear-9291d",
  storageBucket: "dinnerisnear-9291d.appspot.com",
  messagingSenderId: "459801935444",
  appId: "1:459801935444:web:fd8aa4205a14d381ec37c1"
};

if (!firebase.apps.length) {
  const app = firebase.initializeApp(firebaseConfig);
} else {
  const app = firebase.app();
}