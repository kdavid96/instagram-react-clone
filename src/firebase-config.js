import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';
import { getStorage } from 'firebase/storage';
import "firebase/firestore";

const firebaseConfig = {

  apiKey: "AIzaSyBznIkehppBMmA7y_0qamZ7Inie0HCFASE",

  authDomain: "instagram-clone-28d99.firebaseapp.com",

  projectId: "instagram-clone-28d99",

  storageBucket: "instagram-clone-28d99.appspot.com",

  messagingSenderId: "872333062333",

  appId: "1:872333062333:web:32759792cb8f05f61dc7d4"

};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);
export const db = getFirestore();
export const storage = getStorage();