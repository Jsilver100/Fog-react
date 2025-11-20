import React, { useEffect, useState, useContext } from "react";
import { useNavigate } from "react-router-dom";
import { motion, AnimatePresence } from "framer-motion";
import { CartContext } from "../lib/cart";
import { X, Trash2, Plus, Minus, ShoppingCart, ArrowRight } from "lucide-react";
import "./CartPanel.css";

export default function CartPanel() {
  const navigate = useNavigate();
  const { cartItems, removeFromCart, updateQuantity, clearCart } = useContext(CartContext);
  const [showCart, setShowCart] = useState(false);

  useEffect(() => {
    const toggleHandler = () => {
      setShowCart((prev) => {
        const newState = !prev;
        document.body.style.overflow = newState ? 'hidden' : 'auto';
        return newState;
      });
    };
    
    window.addEventListener("toggleCart", toggleHandler);
    return () => {
      window.removeEventListener("toggleCart", toggleHandler);
      document.body.style.overflow = 'auto';
    };
  }, []);

  const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);

  const cartVariants = {
    hidden: { x: "100%" },
    visible: { x: 0 },
    exit: { x: "100%" },
  };

  const itemVariants = {
    hidden: { opacity: 0, x: 20 },
    visible: { opacity: 1, x: 0 },
    exit: { opacity: 0, x: 20 },
  };

  const handleCheckout = () => {
    if (cartItems.length === 0) {
      alert("Your cart is empty!");
      return;
    }

    setShowCart(false);
    navigate("/checkout");
  };

  return (
    <>
      <AnimatePresence>
        {showCart && (
          <motion.div
            className="cart-overlay active"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={() => setShowCart(false)}
          />
        )}
      </AnimatePresence>

      <motion.div
        className={`cart ${showCart ? "showcart" : ""}`}
        variants={cartVariants}
        initial="hidden"
        animate={showCart ? "visible" : "hidden"}
        exit="hidden"
        transition={{ type: "spring", damping: 25, stiffness: 300 }}
      >
        {/* Cart Header */}
        <motion.div className="cart-header" initial={{ opacity: 0, y: -10 }} animate={showCart ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.1 }}>
          <div className="cart-title-section">
            <ShoppingCart size={24} />
            <div>
              <h2>Your Cart</h2>
              <p className="cart-items-count">{totalItems} {totalItems === 1 ? "item" : "items"}</p>
            </div>
          </div>
          <motion.button className="close-btn" onClick={() => setShowCart(false)} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.95 }}>
            <X size={24} />
          </motion.button>
        </motion.div>

        {/* Cart Items */}
        <motion.div className="cart-items-container">
          {cartItems.length === 0 ? (
            <motion.div className="empty-cart" initial={{ opacity: 0, scale: 0.8 }} animate={{ opacity: 1, scale: 1 }}>
              <ShoppingCart size={48} />
              <p>Your cart is empty</p>
              <span>Start shopping to add items!</span>
            </motion.div>
          ) : (
            <motion.div className="cart-items">
              <AnimatePresence>
                {cartItems.map((item, idx) => (
                  <motion.div key={`${item.id}-${item.selectedColor || idx}`} className="cart-item" variants={itemVariants} initial="hidden" animate="visible" exit="exit" transition={{ delay: idx * 0.05 }} layout>
                    <motion.div className="item-image" whileHover={{ scale: 1.05 }}>
                      <img src={item.img || item.imgsrc} alt={item.title} onError={(e) => { e.target.src = `https://via.placeholder.com/80x100?text=${item.title}`; }} />
                    </motion.div>

                    <div className="item-details">
                      <h3 className="item-title">{item.title}</h3>
                      {item.selectedColor && <div className="item-color">Color: <strong>{item.selectedColor}</strong></div>}
                      <div className="item-price">₦ {item.price.toLocaleString()}</div>

                      <div className="item-controls">
                        <div className="quantity-control">
                          <motion.button className="qty-btn" onClick={() => updateQuantity(item.id, item.quantity - 1)} disabled={item.quantity <= 1} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                            <Minus size={16} />
                          </motion.button>
                          <span className="qty-display">{item.quantity}</span>
                          <motion.button className="qty-btn" onClick={() => updateQuantity(item.id, item.quantity + 1)} whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }}>
                            <Plus size={16} />
                          </motion.button>
                        </div>

                        <motion.button className="delete-btn" onClick={() => removeFromCart(item.id)} whileHover={{ scale: 1.15, backgroundColor: "rgba(211, 47, 47, 0.2)" }} whileTap={{ scale: 0.9 }}>
                          <Trash2 size={18} />
                        </motion.button>
                      </div>

                      <div className="item-total">Total: ₦ {(item.price * item.quantity).toLocaleString()}</div>
                    </div>
                  </motion.div>
                ))}
              </AnimatePresence>
            </motion.div>
          )}
        </motion.div>

        {/* Cart Footer */}
        {cartItems.length > 0 && (
          <motion.div className="cart-footer" initial={{ opacity: 0, y: 20 }} animate={showCart ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.2 }}>
            <div className="price-breakdown">
              <div className="price-row total">
                <span>Subtotal:</span>
                <span>₦ {subtotal.toLocaleString()}</span>
              </div>
            </div>

            <motion.button className="checkout-btn" onClick={handleCheckout} whileHover={{ scale: 1.02, boxShadow: "0 15px 40px rgba(211, 47, 47, 0.3)" }} whileTap={{ scale: 0.98 }}>
              Proceed to Checkout
              <ArrowRight size={18} />
            </motion.button>

            <motion.button className="continue-shopping-btn" onClick={() => setShowCart(false)} whileHover={{ backgroundColor: "rgba(211, 47, 47, 0.08)" }} whileTap={{ scale: 0.98 }}>
              Continue Shopping
            </motion.button>

            <motion.button className="clear-cart-btn" onClick={clearCart} whileHover={{ color: "#d32f2f" }} whileTap={{ scale: 0.98 }}>
              Clear Cart
            </motion.button>
          </motion.div>
        )}
      </motion.div>
    </>
  );
}