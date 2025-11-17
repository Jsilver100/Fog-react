// src/data/realProductsAPI.js
import { db } from "../firebase.js";
import { collection, getDocs, doc, getDoc } from "firebase/firestore";

// Fetch all products
export async function fetchAllProducts() {
  const productsCol = collection(db, "products");
  const snapshot = await getDocs(productsCol);
  return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
}

// Fetch product details
export async function fetchProductDetails(productId) {
  const docRef = doc(db, "products", String(productId));
  const docSnap = await getDoc(docRef);
  return docSnap.exists() ? { id: docSnap.id, ...docSnap.data() } : null;
}

// Search products
export async function searchProducts(term) {
  const allProducts = await fetchAllProducts();
  const t = term.toLowerCase();
  return allProducts.filter(
    p => p.name.toLowerCase().includes(t) || p.category.toLowerCase().includes(t)
  );
}

// Get product by category
export async function getProductsByCategory(category) {
  const allProducts = await fetchAllProducts();
  return allProducts.filter(p => p.category.toLowerCase() === category.toLowerCase());
}

// Helper to get the image URL of a selected color
export function getColorImage(product, colorName) {
  const match = product.colors?.find(c => c.name === colorName);
  return match ? match.img : product.imgsrc;
}