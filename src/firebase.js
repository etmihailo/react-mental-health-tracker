import {initializeApp} from 'firebase/app';
import {getAuth, GoogleAuthProvider} from 'firebase/auth';
import {getFirestore} from 'firebase/firestore';

const firebaseConfig = {
    apiKey: "AIzaSyDOlA0eX0ZnEmEwX_MgJjerBmeqlyiQ2xA",
    authDomain: "react-mental-health-tracker.firebaseapp.com",
    projectId: "react-mental-health-tracker",
    storageBucket: "react-mental-health-tracker.firebasestorage.app",
    messagingSenderId: "560194585250",
    appId: "1:560194585250:web:eb34db29b1d71552f44dfb",
    measurementId: "G-Q8Q0XC6YR6"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const firestore = getFirestore(app);
export const googleProvider = new GoogleAuthProvider();


