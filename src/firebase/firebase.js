import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

// Firebase config
const firebaseConfig = {
    apiKey: "AIzaSyChLyw25A6zysvkUJzWbG2K6myDu1i1peo",
    authDomain: "colony-platform.firebaseapp.com",
    projectId: "colony-platform",
    storageBucket: "colony-platform.firebasestorage.app",
    messagingSenderId: "183151997888",
    appId: "1:183151997888:web:4ae8d8b4dbad8a348f8e25",
    measurementId: "G-S7KS4D8TYM"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);

export { app, auth };
