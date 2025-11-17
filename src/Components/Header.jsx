// Header.jsx
import React, { useState } from "react";
import { ShoppingCart, Menu, X } from "lucide-react";
import logo from "../assets/logo.png";
import "./Header.css";

export default function Header() {
  const [menuOpen, setMenuOpen] = useState(false);
  const toggleMenu = () => setMenuOpen((prev) => !prev);

  return (
    <>
      <header className="header">
        <div className="header-left">
          <img src={logo} className="logo" alt="Logo" />
        </div>

        <nav className={`nav-links ${menuOpen ? "open" : ""}`}>
          <a href="#Home" onClick={() => setMenuOpen(false)}>Home</a>
          <a href="#Products" onClick={() => setMenuOpen(false)}>Products</a>
          <a href="#Orders" onClick={() => setMenuOpen(false)}>Orders</a>
          <a href="#About" onClick={() => setMenuOpen(false)}>About</a>
        </nav>

        <div className="header-right">
          <ShoppingCart
            className="cart-btn"
            size={28}
            strokeWidth={2.5}
            onClick={() => window.dispatchEvent(new Event("toggleCart"))}
          />

          <div className="menu-toggle" onClick={toggleMenu}>
            {menuOpen ? <X size={28} /> : <Menu size={28} />}
          </div>
        </div>
      </header>

      {/* Mobile overlay */}
      <div className={`mobile-overlay ${menuOpen ? "active" : ""}`} onClick={toggleMenu}></div>
    </>
  );
}