import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Your Firebase config
const firebaseConfig = {
    apiKey: "AIzaSyCIQbiAW3RDBXv-IW8gygMr3zqYAaq3phk",
    authDomain: "colony-b66cc.firebaseapp.com",
    projectId: "colony-b66cc",
    storageBucket: "colony-b66cc.firebasestorage.app",
    messagingSenderId: "1038200757108",
    appId: "1:1038200757108:web:b44a0ab80d18c58b57aa21",
    measurementId: "G-WQPM6RGFE7",
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { app, auth };
