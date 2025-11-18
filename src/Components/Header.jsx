// src/Components/Header.jsx
import React, { useState, useContext } from "react";
import { ShoppingCart, Menu, X, Home, Package, ListOrdered, Info } from "lucide-react";
import { CartContext } from "../lib/cart";
import logo from "../assets/logo.png";
import "./Header.css";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const { cartItems } = useContext(CartContext);
  const toggleMenu = () => setMenuOpen((prev) => !prev);

  return (
    <>
      <header className="header">
        <div className="header-left">
          <img src={logo} className="logo" alt="Logo" />
        </div>

        <nav className={`nav-links ${menuOpen ? "open" : ""}`}>
          <a href="/" onClick={() => setMenuOpen(false)} className="nav-item">
            <Home size={18} />
            <span>Home</span>
          </a>
          <a href="/products" onClick={() => setMenuOpen(false)} className="nav-item">
            <Package size={18} />
            <span>Products</span>
          </a>
          <a href="/orders" onClick={() => setMenuOpen(false)} className="nav-item">
            <ListOrdered size={18} />
            <span>Orders</span>
          </a>
          <a href="#about" onClick={() => setMenuOpen(false)} className="nav-item">
            <Info size={18} />
            <span>About</span>
          </a>
        </nav>

        <div className="header-right">
          <div className="cart-container">
            <button 
              className="cart-btn"
              onClick={() => window.dispatchEvent(new Event("toggleCart"))}
              aria-label="Shopping cart"
            >
              <ShoppingCart size={28} strokeWidth={1.5} />
              {cartItems.length > 0 && (
                <span className="cart-badge">{cartItems.length}</span>
              )}
            </button>
          </div>

          <button className="menu-toggle" onClick={toggleMenu} aria-label="Toggle menu">
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </button>
        </div>
      </header>

      {/* Mobile overlay */}
      <div className={`mobile-overlay ${menuOpen ? "active" : ""}`} onClick={toggleMenu}></div>
    </>
  );
}