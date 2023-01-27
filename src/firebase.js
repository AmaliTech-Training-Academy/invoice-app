// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";

// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB5xJqPN_xwShPoF_n-ufEHYroSDVyQxxE",
  authDomain: "invoice-app-81e2f.firebaseapp.com",
  projectId: "invoice-app-81e2f",
  storageBucket: "invoice-app-81e2f.appspot.com",
  messagingSenderId: "888480825983",
  appId: "1:888480825983:web:fe8a0e83d45508a5acf54a"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig); 
export const db = getFirestore(app)