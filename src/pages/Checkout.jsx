import React, { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../lib/cart";
import { ArrowLeft, Truck, Store, MapPin, Package, CreditCard, ArrowRight, ShoppingBag } from "lucide-react";
import "./Checkout.css";

// Store locations
const STORE_LOCATIONS = [
  { id: 1, name: "Ikeja Store", address: "123 Allen Avenue, Ikeja, Lagos", fee: 0 },
  { id: 2, name: "Victoria Island Store", address: "45 Adeola Odeku Street, VI, Lagos", fee: 0 },
  { id: 3, name: "Lekki Store", address: "78 Admiralty Way, Lekki Phase 1, Lagos", fee: 0 },
  { id: 4, name: "Surulere Store", address: "32 Adeniran Ogunsanya Street, Surulere, Lagos", fee: 0 }
];

// Delivery areas
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

export default function Checkout() {
  const navigate = useNavigate();
  const { cartItems, clearCart } = useContext(CartContext);
  const [deliveryMethod, setDeliveryMethod] = useState("pickup");
  const [selectedStore, setSelectedStore] = useState(STORE_LOCATIONS[0]);
  const [selectedArea, setSelectedArea] = useState(null);
  const [customerInfo, setCustomerInfo] = useState({
    name: "",
    phone: "",
    address: ""
  });

  const subtotal = cartItems.reduce((total, item) => total + item.price * item.quantity, 0);
  const shippingFee = deliveryMethod === "pickup" ? 0 : (selectedArea?.fee || 0);
  const totalPrice = subtotal + shippingFee;

  const handleCompleteOrder = () => {
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
    
    alert(`Order placed successfully!\n\nDelivery Method: ${deliveryMethod === "pickup" ? "Store Pickup" : "Home Delivery"}\nTotal: ₦${totalPrice.toLocaleString()}\n\nYou will receive a confirmation shortly.`);
    
    clearCart();
    navigate("/");
  };

  if (cartItems.length === 0) {
    return (
      <div className="checkout-page">
        <div className="checkout-container">
          <div className="empty-checkout">
            <ShoppingBag size={64} />
            <h2>Your cart is empty</h2>
            <p>Add items to your cart before checking out</p>
            <button className="back-btn" onClick={() => navigate("/products")}>
              Continue Shopping
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="checkout-page">
      <div className="checkout-container">
        <button className="back-btn" onClick={() => navigate(-1)}>
          <ArrowLeft size={20} />
          Back
        </button>

        <h1 className="checkout-title">Checkout</h1>

        <div className="checkout-grid">
          {/* Left Column - Delivery & Payment */}
          <div className="checkout-left">
            {/* Delivery Method Section */}
            <div className="checkout-section">
              <h2 className="section-title">
                <Package size={24} />
                Delivery Method
              </h2>

              <div className="delivery-options">
                <div 
                  className={`delivery-option ${deliveryMethod === "pickup" ? "active" : ""}`}
                  onClick={() => setDeliveryMethod("pickup")}
                >
                  <div className="option-header">
                    <Store size={24} />
                    <div>
                      <h4>Store Pickup</h4>
                      <p>Pick up from any of our stores</p>
                    </div>
                  </div>
                  <span className="option-badge">FREE</span>
                </div>

                <div 
                  className={`delivery-option ${deliveryMethod === "delivery" ? "active" : ""}`}
                  onClick={() => setDeliveryMethod("delivery")}
                >
                  <div className="option-header">
                    <Truck size={24} />
                    <div>
                      <h4>Home Delivery</h4>
                      <p>Get it delivered to your doorstep</p>
                    </div>
                  </div>
                  <span className="option-badge">From ₦1,500</span>
                </div>
              </div>

              {/* Store Selection */}
              {deliveryMethod === "pickup" && (
                <div className="location-selector">
                  <h4 className="selector-title">
                    <MapPin size={18} />
                    Select Pickup Location
                  </h4>
                  <div className="location-options">
                    {STORE_LOCATIONS.map((store) => (
                      <div
                        key={store.id}
                        className={`location-card ${selectedStore?.id === store.id ? "selected" : ""}`}
                        onClick={() => setSelectedStore(store)}
                      >
                        <div className="location-icon">
                          <Store size={20} />
                        </div>
                        <div className="location-info">
                          <h5>{store.name}</h5>
                          <p>{store.address}</p>
                        </div>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Delivery Area Selection */}
              {deliveryMethod === "delivery" && (
                <div className="location-selector">
                  <h4 className="selector-title">
                    <MapPin size={18} />
                    Delivery Information
                  </h4>
                  
                  <select 
                    className="area-dropdown" 
                    value={selectedArea?.id || ""} 
                    onChange={(e) => setSelectedArea(DELIVERY_AREAS.find(a => a.id === parseInt(e.target.value)))}
                  >
                    <option value="">Choose your area...</option>
                    {DELIVERY_AREAS.map((area) => (
                      <option key={area.id} value={area.id}>
                        {area.area} - ₦{area.fee.toLocaleString()}
                      </option>
                    ))}
                  </select>

                  <div className="customer-info-form">
                    <input 
                      type="text" 
                      placeholder="Full Name *" 
                      value={customerInfo.name}
                      onChange={(e) => setCustomerInfo({...customerInfo, name: e.target.value})}
                      className="info-input"
                      required
                    />
                    <input 
                      type="tel" 
                      placeholder="Phone Number *" 
                      value={customerInfo.phone}
                      onChange={(e) => setCustomerInfo({...customerInfo, phone: e.target.value})}
                      className="info-input"
                      required
                    />
                    <textarea 
                      placeholder="Delivery Address *" 
                      value={customerInfo.address}
                      onChange={(e) => setCustomerInfo({...customerInfo, address: e.target.value})}
                      className="info-input info-textarea"
                      rows="3"
                      required
                    />
                  </div>
                </div>
              )}
            </div>

            {/* Payment Method Section */}
            <div className="checkout-section">
              <h2 className="section-title">
                <CreditCard size={24} />
                Payment Method
              </h2>
              <div className="payment-option active">
                <div className="option-header">
                  <CreditCard size={24} />
                  <div>
                    <h4>Pay on Delivery</h4>
                    <p>Cash payment when you receive your order</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Right Column - Order Summary */}
          <div className="checkout-right">
            <div className="order-summary">
              <h2>Order Summary</h2>

              <div className="summary-items">
                {cartItems.map((item, idx) => (
                  <div key={idx} className="summary-item">
                    <img src={item.img || item.imgsrc} alt={item.title} />
                    <div className="item-details">
                      <h4>{item.title}</h4>
                      {item.selectedColor && <p className="item-color">{item.selectedColor}</p>}
                      <p className="item-qty">Qty: {item.quantity}</p>
                    </div>
                    <p className="item-price">₦{(item.price * item.quantity).toLocaleString()}</p>
                  </div>
                ))}
              </div>

              <div className="summary-totals">
                <div className="total-row">
                  <span>Subtotal:</span>
                  <span>₦{subtotal.toLocaleString()}</span>
                </div>
                <div className="total-row">
                  <span>Shipping:</span>
                  <span className={shippingFee === 0 ? "free" : ""}>
                    {shippingFee === 0 ? "FREE" : `₦${shippingFee.toLocaleString()}`}
                  </span>
                </div>
                <div className="total-row grand-total">
                  <span>Total:</span>
                  <span>₦{totalPrice.toLocaleString()}</span>
                </div>
              </div>

              <button className="complete-order-btn" onClick={handleCompleteOrder}>
                Complete Order
                <ArrowRight size={20} />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}