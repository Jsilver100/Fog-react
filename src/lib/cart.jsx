import React, { createContext, useState, useEffect } from "react";

// Create the Cart Context
export const CartContext = createContext();

export const CartProvider = ({ children }) => {
  const [cartItems, setCartItems] = useState([]);

  // Load cart from localStorage on mount
  useEffect(() => {
    const storedCart = JSON.parse(localStorage.getItem("cartItems")) || [];
    setCartItems(storedCart);
  }, []);

  // Save cart to localStorage whenever it changes
  useEffect(() => {
    localStorage.setItem("cartItems", JSON.stringify(cartItems));
  }, [cartItems]);

  const addToCart = (product) => {
    // Create unique key: product id + color (if available)
    const itemKey = product.selectedColor 
      ? `${product.id}-${product.selectedColor}`
      : product.id;

    const exists = cartItems.find((item) => {
      const existingKey = item.selectedColor 
        ? `${item.id}-${item.selectedColor}`
        : item.id;
      return existingKey === itemKey;
    });

    if (exists) {
      // If already in cart with same color, increase quantity
      setCartItems((prev) =>
        prev.map((item) => {
          const existingKey = item.selectedColor 
            ? `${item.id}-${item.selectedColor}`
            : item.id;
          return existingKey === itemKey
            ? { ...item, quantity: item.quantity + 1 }
            : item;
        })
      );
    } else {
      // Add new item
      setCartItems((prev) => [
        ...prev,
        {
          ...product,
          quantity: product.quantity || 1,
          cartKey: itemKey // Store unique key for removal
        }
      ]);
    }

    // Show success message
    console.log(`✅ Added ${product.name}${product.selectedColor ? ` (${product.selectedColor})` : ""} to cart`);
  };

  const removeFromCart = (productId) => {
    setCartItems((prev) => 
      prev.filter((item) => item.id !== productId)
    );
  };

  const updateQuantity = (productId, quantity) => {
    if (quantity < 1) return;
    
    setCartItems((prev) =>
      prev.map((item) =>
        item.id === productId ? { ...item, quantity } : item
      )
    );
  };

  const clearCart = () => {
    setCartItems([]);
  };

  return (
    <CartContext.Provider
      value={{ cartItems, addToCart, removeFromCart, updateQuantity, clearCart }}
    >
      {children}
    </CartContext.Provider>
  );
};