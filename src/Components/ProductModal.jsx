// src/Components/ProductModal.jsx
import React, { useState } from "react";
import "./ProductModal.css";
import { X, ShoppingCart } from "lucide-react";
import { getColorImage } from "../data/realProductsAPI";

export default function ProductModal({ product, onClose, addToCart }) {
  // Initialize with the first color's name, not the object
  const [selectedColor, setSelectedColor] = useState(product.colors?.[0]?.name || "");
  const [quantity, setQuantity] = useState(1);
  const [imageLoading, setImageLoading] = useState(false);

  if (!product) return null;

  // Pass product object to getColorImage
  const currentImage = getColorImage(product, selectedColor) || product.imgsrc;

  const handleColorChange = (colorName) => {
    setImageLoading(true);
    setSelectedColor(colorName);
  };

  const handleAddToCart = () => {
    addToCart({
      ...product,
      selectedColor,
      quantity,
      imgsrc: currentImage,
    });
  };

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}><X size={22} /></button>

        <div className="modal-img">
          {imageLoading && <div className="spinner-overlay"><div className="spinner"></div></div>}
          <img
            src={currentImage}
            alt={`${product.name} - ${selectedColor}`}
            onLoad={() => setImageLoading(false)}
            onError={(e) => { e.target.src = `https://via.placeholder.com/300x400?text=${product.name}`; setImageLoading(false); }}
            style={{ opacity: imageLoading ? 0.5 : 1, transition: "opacity 0.3s" }}
          />
        </div>

        <div className="modal-info">
          <h2>{product.name}</h2>
          <p className="modal-price">₦ {product.price.toLocaleString()}</p>

          {product.colors?.length > 0 && (
            <div className="color-section">
              <h4>Choose Color</h4>
              <div className="color-options">
                {product.colors.map((c) => (
                  <button
                    key={c.name}
                    className={`color-btn ${selectedColor === c.name ? "active" : ""}`}
                    onClick={() => handleColorChange(c.name)}
                  >
                    {c.name}
                  </button>
                ))}
              </div>
            </div>
          )}

          <div className="qty-section">
            <h4>Quantity</h4>
            <div className="qty-box">
              <button onClick={() => setQuantity(q => Math.max(1, q - 1))}>-</button>
              <span>{quantity}</span>
              <button onClick={() => setQuantity(q => q + 1)}>+</button>
            </div>
          </div>

          {product.details && (
            <div className="details-section">
              <h4>About This Product</h4>
              <p>{product.details}</p>
            </div>
          )}

          {product.specs && (
            <div className="specs-section">
              <h4>Specifications</h4>
              <div className="specs-grid">
                {Object.entries(product.specs).map(([k, v]) => (
                  <div key={k} className="spec-item">
                    <span className="spec-label">{k.charAt(0).toUpperCase() + k.slice(1)}:</span>
                    <span className="spec-value">{v}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          <button className="modal-addcart" onClick={handleAddToCart}>
            <ShoppingCart size={18} /> Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}