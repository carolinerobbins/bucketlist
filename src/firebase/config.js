// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyCGC3neTMW5bZeJA-zHdGciJ6DN7qEBJrM",
  authDomain: "bucketlist-bd89c.firebaseapp.com",
  projectId: "bucketlist-bd89c",
  storageBucket: "bucketlist-bd89c.appspot.com",
  messagingSenderId: "368933317754",
  appId: "1:368933317754:web:4805283dec3c9596c21fc3",
  measurementId: "G-ND5P45LVF1"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const auth = getAuth(app);