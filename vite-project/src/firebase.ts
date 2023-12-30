import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";

const firebaseConfig = {
    apiKey: "AIzaSyDkyegHBaIQSbmyTSDM87ciImSHDKd3sKs",
    authDomain: "bom-app-8cd7b.firebaseapp.com",
    projectId: "bom-app-8cd7b",
    storageBucket: "bom-app-8cd7b.appspot.com",
    messagingSenderId: "653935348200",
    appId: "1:653935348200:web:453461eb5581edaa3f3c5d"
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);