import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

const firebaseConfig = {
	apiKey: import.meta.env.VITE_API_KEY,
	authDomain: import.meta.env.VITE_API_AUTHDOMAIN,
	projectId: import.meta.env.VITE_API_PROJECTID,
	storageBucket: import.meta.env.VITE_API_STORAGEBUCKET,
	messagingSenderId: import.meta.env.VITE_API_MESSAGINGSENDERID,
	appId: import.meta.env.VITE_API_APPID,
	measurementId: import.meta.env.VITE_API_MEASUREMENTID,
};

const app = initializeApp(firebaseConfig);

export const auth = getAuth(app);
export const firestore = getFirestore(app);
export const db = firestore;
