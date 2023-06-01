// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import {getAuth} from 'firebase/auth'
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyA6vg8r7sAegawaoPMiisFfbhJ8o0hsJuc",
  authDomain: "login-325f4.firebaseapp.com",
  projectId: "login-325f4",
  storageBucket: "login-325f4.appspot.com",
  messagingSenderId: "173032412856",
  appId: "1:173032412856:web:8950012a5d8d41db8ac64d",
  measurementId: "G-D932663204"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Firebase Authentication and get a reference to the service
export const auth = getAuth(app);
