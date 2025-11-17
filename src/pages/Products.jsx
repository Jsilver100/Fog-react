import React, { useEffect, useState, useContext } from "react"; import "./Products.css"; import { CartContext } from "../lib/cart"; import productsData from "../data/Products"; import { ShoppingCart, Search, X } from "lucide-react";

export default function Products({ limit = null, compact = false }) { const { addToCart } = useContext(CartContext); const [searchTerm, setSearchTerm] = useState(""); const [products, setProducts] = useState([]);

const [selectedProduct, setSelectedProduct] = useState(null); const [selectedColor, setSelectedColor] = useState(""); const [quantity, setQuantity] = useState(1);

useEffect(() => { setProducts(productsData); }, []);

const filteredProducts = compact ? products : products.filter((p) => p.name.toLowerCase().includes(searchTerm.toLowerCase()));

const finalProducts = limit ? filteredProducts.slice(0, limit) : filteredProducts;

const openModal = (product) => { setSelectedProduct(product); setSelectedColor(product.colors?.[0] || ""); setQuantity(1); };

const closeModal = () => { setSelectedProduct(null); };

const handleAddToCart = () => { addToCart({ ...selectedProduct, selectedColor, quantity }); closeModal(); };

return ( <section id={compact ? "LatestProducts" : "Products"} className="products-section"> <h2>{compact ? "Latest Products" : "Products"}</h2>

{!compact && (
    <div className="Search-bar">
      <Search size={18} className="search-icon" />
      <input
        type="text"
        placeholder="Search products..."
        value={searchTerm}
        onChange={(e) => setSearchTerm(e.target.value)}
      />
    </div>
  )}

  <div className={`products ${compact ? "Latest" : ""}`}>
    {finalProducts.length === 0 && <p>No products found.</p>}

    {finalProducts.map((product) => (
      <div key={product.id} className="prod" onClick={() => openModal(product)}>
        <div className="prod-img"><img src={product.imgsrc} alt={product.name} /></div>
        <h3 className="product-title">{product.name}</h3>
        <p className="product-price">₦ {product.price.toLocaleString()}</p>
        <button className="addcart" onClick={(e) => {e.stopPropagation(); addToCart(product);}}>
          <ShoppingCart size={16} /> Add to Cart
        </button>
      </div>
    ))}
  </div>

  {selectedProduct && (
    <div className="product-modal-overlay" onClick={closeModal}>
      <div className="product-modal" onClick={(e) => e.stopPropagation()}>
        <button className="modal-close" onClick={closeModal}><X size={20} /></button>

        <img src={selectedProduct.imgsrc} className="modal-img" alt={selectedProduct.name} />
        <h2>{selectedProduct.name}</h2>
        <p className="modal-price">₦ {selectedProduct.price.toLocaleString()}</p>

        {selectedProduct.colors && (
          <div className="modal-section">
            <label>Choose Color:</label>
            <select value={selectedColor} onChange={(e) => setSelectedColor(e.target.value)}>
              {selectedProduct.colors.map((c) => (
                <option key={c} value={c}>{c}</option>
              ))}
            </select>
          </div>
        )}

        <div className="modal-section">
          <label>Quantity:</label>
          <input
            type="number"
            min="1"
            value={quantity}
            onChange={(e) => setQuantity(parseInt(e.target.value))}
          />
        </div>

        <div className="modal-section details">
          <h3>Product Details</h3>
          <p>{selectedProduct.details || "No additional details available."}</p>
        </div>

        <button className="confirm-add" onClick={handleAddToCart}>
          <ShoppingCart size={16} /> Add to Cart
        </button>
      </div>
    </div>
  )}
</section>

); }