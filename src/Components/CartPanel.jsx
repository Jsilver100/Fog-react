import React, { useEffect, useState, useContext } from "react";
import { CartContext } from "../lib/cart";
import { X, Trash2 } from "lucide-react";
import "./CartPanel.css";

export default function CartPanel() {
  const { cartItems, removeFromCart, updateQuantity } = useContext(CartContext);
  const [showCart, setShowCart] = useState(false);

  useEffect(() => {
    const toggleHandler = () => setShowCart((prev) => !prev);
    window.addEventListener("toggleCart", toggleHandler);
    return () => window.removeEventListener("toggleCart", toggleHandler);
  }, []);

  const totalPrice = cartItems.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  return (
    <div className={`cart ${showCart ? "showcart" : ""}`}>
      <h2>
        Your Cart ({cartItems.length})
        <button className="cancelcart" onClick={() => setShowCart(false)}>
          <X size={20} />
        </button>
      </h2>

      <div className="product">
        {cartItems.length === 0 && <span className="emptycart">Your cart is empty</span>}

        {cartItems.map((item, idx) => (
          <div key={idx} className="cart-details">
            <img 
              src={item.img || item.imgsrc} 
              className="prodimg" 
              alt={item.title}
              onError={(e) => {
                e.target.src = `https://via.placeholder.com/55x70?text=${item.title}`;
              }}
            />
            <div className="quantity">
              <h3 className="product-title">{item.title}</h3>
              
              {/* Show selected color if available */}
              {item.selectedColor && (
                <span style={{ fontSize: "12px", color: "#888", marginTop: "-5px" }}>
                  Color: <strong>{item.selectedColor}</strong>
                </span>
              )}
              
              <span className="price">
                <b>₦ {item.price.toLocaleString()}</b>
                <Trash2
                  className="deleteprod"
                  size={18}
                  onClick={() => removeFromCart(item.id)}
                  style={{ cursor: "pointer" }}
                />
              </span>

              <div className="increment">
                <button
                  className="decrease"
                  onClick={() => updateQuantity(item.id, item.quantity - 1)}
                  disabled={item.quantity <= 1}
                >
                  -
                </button>
                <span className="cartnum">{item.quantity}</span>
                <button
                  className="increase"
                  onClick={() => updateQuantity(item.id, item.quantity + 1)}
                >
                  +
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {cartItems.length > 0 && (
        <>
          <span className="totalprice">Total: ₦ {totalPrice.toLocaleString()}</span>
          <button className="proceed">Proceed To Payment</button>
        </>
      )}
    </div>
  );
}