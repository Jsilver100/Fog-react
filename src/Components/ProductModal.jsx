import React, { useState } from "react";
import "./ProductModal.css";
import { X, ShoppingCart } from "lucide-react";

export default function ProductModal({ product, onClose, addToCart }) {
  const [selectedColor, setSelectedColor] = useState(product.colors?.[0] || "");
  const [quantity, setQuantity] = useState(1);

  if (!product) return null;

  const handleAddToCart = () => {
    addToCart({
      ...product,
      selectedColor,
      quantity,
      id: product.id,
      name: product.name,
      price: product.price,
      imgsrc: product.imgsrc,
      img: product.imgsrc,
      title: product.name
    });
  };

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

          {/* Colors Section */}
          {product.colors && product.colors.length > 0 && (
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

          {/* Quantity Section */}
          <div className="qty-section">
            <h4>Quantity</h4>
            <div className="qty-box">
              <button onClick={() => setQuantity(q => Math.max(1, q - 1))}>-</button>
              <span>{quantity}</span>
              <button onClick={() => setQuantity(q => q + 1)}>+</button>
            </div>
          </div>

          {/* Product Description */}
          {product.details && (
            <div className="details-section">
              <h4>About This Product</h4>
              <p className="details-text">{product.details}</p>
            </div>
          )}

          {/* Product Specifications */}
          {product.specs && (
            <div className="specs-section">
              <h4>Specifications</h4>
              <div className="specs-grid">
                {Object.entries(product.specs).map(([key, value]) => (
                  <div key={key} className="spec-item">
                    <span className="spec-label">{key.charAt(0).toUpperCase() + key.slice(1)}:</span>
                    <span className="spec-value">{value}</span>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Add to Cart Button */}
          <button className="modal-addcart" onClick={handleAddToCart}>
            <ShoppingCart size={18} />
            Add to Cart
          </button>
        </div>
      </div>
    </div>
  );
}