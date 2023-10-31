// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyAxwbvIRgcsRHBvTMPnES3D7FKf6xIZxhY",
  authDomain: "tasks-401411.firebaseapp.com",
  projectId: "tasks-401411",
  storageBucket: "tasks-401411.appspot.com",
  messagingSenderId: "59770927207",
  appId: "1:59770927207:web:74cea3e3038e758911bcc2",
  measurementId: "G-KXQQKK64D2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
// Initialize Firebase Authentication and get a reference to the service
export default getAuth(app);
