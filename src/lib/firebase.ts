import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

// TODO: Replace with your actual Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyAG6u4dT1dHljnOO8rJGH4nD56cCBrBg_U",
    authDomain: "biounfiltered.firebaseapp.com",
    projectId: "biounfiltered",
    storageBucket: "biounfiltered.firebasestorage.app",
    messagingSenderId: "418435583388",
    appId: "1:418435583388:web:a3470428d2465299d84c59",
    measurementId: "G-FMZ1DL4PTX"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore(app);
