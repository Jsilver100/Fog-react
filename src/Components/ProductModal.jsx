import React, { useState } from "react";
import "./ProductModal.css";
import { X, ShoppingCart } from "lucide-react";

export default function ProductModal({ product, onClose, addToCart }) {
  const [selectedColor, setSelectedColor] = useState(product.colors?.[0] || "");
  const [quantity, setQuantity] = useState(1);

  if (!product) return null;

  return (
    <div className="modal-overlay" onClick={onClose}>
      <div className="modal-box" onClick={(e) => e.stopPropagation()}>
        <button className="close-btn" onClick={onClose}>
          <X size={22} />
        </button>

        <div className="modal-img">
          <img src={product.imgsrc} alt={product.name} />
        </div>

        <div className="modal-info">
          <h2>{product.name}</h2>
          <p className="modal-price">₦ {product.price.toLocaleString()}</p>

          {/* Colors */}
          {product.colors && (
            <div className="color-section">
              <h4>Choose Color</h4>
              <div className="color-options">
                {product.colors.map((color) => (
                  <button
                    key={color}
                    className={`color-btn ${selectedColor === color ? "active" : ""}`}
                    onClick={() => setSelectedColor(color)}
                  >
                    {color}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Quantity */}
          <div className="qty-section">
            <h4>Quantity</h4>
            <div className="qty-box">
              <button onClick={() => setQuantity(q => Math.max(1, q - 1))}>-</button>
              <span>{quantity}</span>
              <button onClick={() => setQuantity(q => q + 1)}>+</button>
            </div>
          </div>

          {/* Add to Cart */}
          <button
            className="modal-addcart"
            onClick={() =>
              addToCart({ ...product, selectedColor, quantity })
            }
          >
            <ShoppingCart size={18} />
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}