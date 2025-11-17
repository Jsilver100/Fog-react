import { Routes, Route } from "react-router-dom";
import Header from "./Components/Header";
import Home from "./pages/Home";
import ProductsPage from "./pages/Products";
import OrdersPage from "./pages/Orders";
import CartPanel from "./Components/CartPanel";
import { CartProvider } from "./lib/cart";
import "./App.css";

export default function App() {
  return (
    <CartProvider>
      <Header />

      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/products" element={<ProductsPage />} />
        <Route path="/orders" element={<OrdersPage />} />
      </Routes>

      <CartPanel />
    </CartProvider>
  );
}