import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore'; 

const firebaseConfig = {
    apiKey: "AIzaSyC_e9tq0gsyKprq3oLTBCluzW2pgLnC1Js",
    authDomain: "todolist-bf00d.firebaseapp.com",
    projectId: "todolist-bf00d",
    storageBucket: "todolist-bf00d.firebasestorage.app",
    messagingSenderId: "353513439896",
    appId: "1:353513439896:web:b6e8b7e3318beb651dc6ed",
    measurementId: "G-WX1WH87MBZ"
};

const app = initializeApp(firebaseConfig);
let analytics;

if (typeof window !== 'undefined') {
    analytics = getAnalytics(app);
}

const auth = getAuth(app);
const db = getFirestore(app);

export { app, auth, analytics, db };