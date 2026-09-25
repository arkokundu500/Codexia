
import { initializeApp } from "firebase/app";
import { getAuth, GoogleAuthProvider } from "firebase/auth"
const firebaseConfig = {
    apiKey: import.meta.env.VITE_FIREBASE_API_KEY,
    authDomain: "codexia-b19b3.firebaseapp.com",
    projectId: "codexia-b19b3",
    storageBucket: "codexia-b19b3.firebasestorage.app",
    messagingSenderId: "416702906977",
    appId: "1:416702906977:web:64b5cbe340d767b5e02020"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const auth = getAuth(app)
export const googleProvider = new GoogleAuthProvider()

