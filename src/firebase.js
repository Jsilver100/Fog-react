// src/firebase.js

// Import Firebase SDK
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

// Your Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyAU7rLH5TTLs6_RgIstdqlEXlPe7FQWkfU",
  authDomain: "fog-6b990.firebaseapp.com",
  projectId: "fog-6b990",
  storageBucket: "fog-6b990.appspot.com",
  messagingSenderId: "579290291640",
  appId: "1:579290291640:web:aae889d51299153e7c434d",
  measurementId: "G-Q51JEXQ45F"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Analytics (optional)
const analytics = getAnalytics(app);

// Firestore database
export const db = getFirestore(app);

// Export app if needed elsewhere
export default app;