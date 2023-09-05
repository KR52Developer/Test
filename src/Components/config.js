// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore";
import { getAuth } from "firebase/auth";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAu4eA4b9O1ZAOLen0wZ_YR9KGtDWJOawc",
    authDomain: "quiz-app-f2250.firebaseapp.com",
    projectId: "quiz-app-f2250",
    storageBucket: "quiz-app-f2250.appspot.com",
    messagingSenderId: "120811295265",
    appId: "1:120811295265:web:3b533e1ae4538ed282c960"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);