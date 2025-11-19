import React, { useEffect, useState, useContext } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { CartContext } from "../lib/cart";
import { X, Trash2, Plus, Minus, ShoppingCart, ArrowRight, Truck, Store, MapPin, Package } from "lucide-react";
import "./CartPanel.css";

// Store locations with shipping fees
const STORE_LOCATIONS = [
  { id: 1, name: "Ikeja Store", address: "123 Allen Avenue, Ikeja, Lagos", fee: 0 },
  { id: 2, name: "Victoria Island Store", address: "45 Adeola Odeku Street, VI, Lagos", fee: 0 },
  { id: 3, name: "Lekki Store", address: "78 Admiralty Way, Lekki Phase 1, Lagos", fee: 0 },
  { id: 4, name: "Surulere Store", address: "32 Adeniran Ogunsanya Street, Surulere, Lagos", fee: 0 }
];

// Lagos areas with delivery fees
const DELIVERY_AREAS = [
  { id: 1, area: "Ikeja", fee: 2000 },
  { id: 2, area: "Victoria Island", fee: 2500 },
  { id: 3, area: "Lekki", fee: 3000 },
  { id: 4, area: "Surulere", fee: 2000 },
  { id: 5, area: "Yaba", fee: 1500 },
  { id: 6, area: "Ikoyi", fee: 2500 },
  { id: 7, area: "Ajah", fee: 3500 },
  { id: 8, area: "Mushin", fee: 2000 },
  { id: 9, area: "Apapa", fee: 2500 },
  { id: 10, area: "Festac", fee: 2500 },
  { id: 11, area: "Ikorodu", fee: 4000 },
  { id: 12, area: "Other Areas", fee: 3000 }
];

export default function CartPanel() {
  const { cartItems, removeFromCart, updateQuantity, clearCart } = useContext(CartContext);
  const [showCart, setShowCart] = useState(false);
  const [deliveryMethod, setDeliveryMethod] = useState("pickup"); // "pickup" or "delivery"
  const [selectedStore, setSelectedStore] = useState(STORE_LOCATIONS[0]);
  const [selectedArea, setSelectedArea] = useState(null);
  const [customerInfo, setCustomerInfo] = useState({
    name: "",
    phone: "",
    address: ""
  });

  useEffect(() => {
    const toggleHandler = () => setShowCart((prev) => !prev);
    window.addEventListener("toggleCart", toggleHandler);
    return () => window.removeEventListener("toggleCart", toggleHandler);
  }, []);

  const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  const totalItems = cartItems.reduce((total, item) => total + item.quantity, 0);
  
  // Calculate shipping fee
  const shippingFee = deliveryMethod === "pickup" ? 0 : (selectedArea?.fee || 0);
  const totalPrice = subtotal + shippingFee;

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

    if (deliveryMethod === "delivery" && !selectedArea) {
      alert("Please select a delivery area!");
      return;
    }

    if (deliveryMethod === "delivery" && (!customerInfo.name || !customerInfo.phone || !customerInfo.address)) {
      alert("Please fill in all delivery details!");
      return;
    }

    // Prepare order summary
    const orderSummary = {
      items: cartItems,
      deliveryMethod,
      location: deliveryMethod === "pickup" ? selectedStore : selectedArea,
      customerInfo: deliveryMethod === "delivery" ? customerInfo : null,
      subtotal,
      shippingFee,
      total: totalPrice
    };

    console.log("Order Summary:", orderSummary);
    
    // Here you would typically send this to your backend
    alert(`Order placed successfully!\n\nDelivery Method: ${deliveryMethod === "pickup" ? "Store Pickup" : "Home Delivery"}\nTotal: ₦${totalPrice.toLocaleString()}\n\nYou will receive a confirmation shortly.`);
    
    clearCart();
    setShowCart(false);
  };

  return (
    <>
      <AnimatePresence>
        {showCart && (
          <motion.div
            className="cart-overlay"
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
            <>
              {/* Cart Items List */}
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

              {/* Delivery Options */}
              <div className="delivery-section">
                <h3 className="section-title">
                  <Package size={20} />
                  Delivery Method
                </h3>

                <div className="delivery-options">
                  <motion.div className={`delivery-option ${deliveryMethod === "pickup" ? "active" : ""}`} onClick={() => setDeliveryMethod("pickup")} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <div className="option-header">
                      <Store size={24} />
                      <div>
                        <h4>Store Pickup</h4>
                        <p>Pick up from any of our stores</p>
                      </div>
                    </div>
                    <span className="option-badge">FREE</span>
                  </motion.div>

                  <motion.div className={`delivery-option ${deliveryMethod === "delivery" ? "active" : ""}`} onClick={() => setDeliveryMethod("delivery")} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                    <div className="option-header">
                      <Truck size={24} />
                      <div>
                        <h4>Home Delivery</h4>
                        <p>Get it delivered to your doorstep</p>
                      </div>
                    </div>
                    <span className="option-badge">From ₦1,500</span>
                  </motion.div>
                </div>

                {/* Store Selection (for pickup) */}
                {deliveryMethod === "pickup" && (
                  <motion.div className="location-selector" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}>
                    <h4 className="selector-title">
                      <MapPin size={18} />
                      Select Pickup Location
                    </h4>
                    <div className="location-options">
                      {STORE_LOCATIONS.map((store) => (
                        <motion.div key={store.id} className={`location-card ${selectedStore?.id === store.id ? "selected" : ""}`} onClick={() => setSelectedStore(store)} whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                          <div className="location-icon">
                            <Store size={20} />
                          </div>
                          <div className="location-info">
                            <h5>{store.name}</h5>
                            <p>{store.address}</p>
                          </div>
                        </motion.div>
                      ))}
                    </div>
                  </motion.div>
                )}

                {/* Delivery Area Selection (for home delivery) */}
                {deliveryMethod === "delivery" && (
                  <motion.div className="location-selector" initial={{ opacity: 0, height: 0 }} animate={{ opacity: 1, height: "auto" }} exit={{ opacity: 0, height: 0 }}>
                    <h4 className="selector-title">
                      <MapPin size={18} />
                      Select Delivery Area
                    </h4>
                    <select className="area-dropdown" value={selectedArea?.id || ""} onChange={(e) => setSelectedArea(DELIVERY_AREAS.find(a => a.id === parseInt(e.target.value)))}>
                      <option value="">Choose your area...</option>
                      {DELIVERY_AREAS.map((area) => (
                        <option key={area.id} value={area.id}>
                          {area.area} - ₦{area.fee.toLocaleString()}
                        </option>
                      ))}
                    </select>

                    {/* Customer Information Form */}
                    <div className="customer-info-form">
                      <input type="text" placeholder="Full Name *" value={customerInfo.name} onChange={(e) => setCustomerInfo({...customerInfo, name: e.target.value})} className="info-input" required />
                      <input type="tel" placeholder="Phone Number *" value={customerInfo.phone} onChange={(e) => setCustomerInfo({...customerInfo, phone: e.target.value})} className="info-input" required />
                      <textarea placeholder="Delivery Address *" value={customerInfo.address} onChange={(e) => setCustomerInfo({...customerInfo, address: e.target.value})} className="info-input info-textarea" rows="3" required />
                    </div>
                  </motion.div>
                )}
              </div>
            </>
          )}
        </motion.div>

        {/* Cart Footer */}
        {cartItems.length > 0 && (
          <motion.div className="cart-footer" initial={{ opacity: 0, y: 20 }} animate={showCart ? { opacity: 1, y: 0 } : {}} transition={{ delay: 0.2 }}>
            <div className="price-breakdown">
              <div className="price-row">
                <span>Subtotal:</span>
                <span>₦ {subtotal.toLocaleString()}</span>
              </div>
              <div className="price-row">
                <span>Shipping:</span>
                <span className={shippingFee === 0 ? "shipping-free" : ""}>
                  {shippingFee === 0 ? "FREE" : `₦ ${shippingFee.toLocaleString()}`}
                </span>
              </div>
              <div className="price-row total">
                <span>Total:</span>
                <span>₦ {totalPrice.toLocaleString()}</span>
              </div>
            </div>

            <motion.button className="checkout-btn" onClick={handleCheckout} whileHover={{ scale: 1.02, boxShadow: "0 15px 40px rgba(211, 47, 47, 0.3)" }} whileTap={{ scale: 0.98 }}>
              Complete Order
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