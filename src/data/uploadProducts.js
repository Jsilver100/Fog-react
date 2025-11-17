// src/data/uploadProducts.js
import { initializeApp } from "firebase/app";
import { getFirestore, collection, setDoc, doc } from "firebase/firestore";
import { jumiaProducts } from "./realProductsAPI.js"; // adjust path if needed

// Firebase config (from your firebase.js)
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
const db = getFirestore(app);

async function uploadProducts() {
  const colRef = collection(db, "products");

  for (let product of jumiaProducts) {
    await setDoc(doc(colRef, product.id.toString()), product);
    console.log(`Uploaded product: ${product.name}`);
  }

  console.log("✅ All products uploaded!");
}

uploadProducts();
