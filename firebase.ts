// Import the functions you need from the SDKs you need
import { getApp, getApps, initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
import { Storage } from '@google-cloud/storage';

const firebaseConfig = {
  apiKey: process.env.NEXT_PUBLIC_FIREBASE_API_KEY,
  authDomain: process.env.NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN ,
  projectId: process.env.NEXT_PUBLIC_FIREBASE_PROJECT_ID,
  storageBucket: process.env.NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET ,
  messagingSenderId: process.env.NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID ,
  appId: process.env.NEXT_PUBLIC_FIREBASE_APP_ID ,
  measurementId: process.env.NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID
};

// Initialize Firebase
const app = getApps().length === 0 ? initializeApp(firebaseConfig) : getApp()
export const auth = getAuth(app);
export const db = getFirestore(app)
auth.useDeviceLanguage()

// // Initialize GCP Storage
// const storage = new Storage({
//   projectId: 'addy-ai-433906',
//   credentials: JSON.parse(process.env.GOOGLE_SERVICE_ACCOUNT_KEY_JSON || '{}')
// });

// export const bucket = storage.bucket('addygcs');