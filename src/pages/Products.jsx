import React, { useEffect, useState, useContext } from "react";
import "./Products.css";
import { CartContext } from "../lib/cart";
import ProductModal from "../Components/ProductModal";
import { ShoppingCart, Search, Loader, AlertCircle } from "lucide-react";
import { 
  fetchAllProducts, 
  searchProducts,
  fetchProductDetails
} from "../data/realProductsAPI";

export default function Products({ limit = null, compact = false }) {
  const { addToCart } = useContext(CartContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [products, setProducts] = useState([]);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch products on mount
  useEffect(() => {
    const loadProducts = async () => {
      try {
        setLoading(true);
        setError(null);
        
        const data = await fetchAllProducts();

        if (!data || data.length === 0) {
          setError("No products available. Please try again later.");
          setProducts([]);
        } else {
          setProducts(data);
        }
      } catch (err) {
        setError(`Failed to load products: ${err.message}`);
        setProducts([]);
      } finally {
        setLoading(false);
      }
    };

    loadProducts();
  }, []);

  // Handle search
  const handleSearch = async (term) => {
    setSearchTerm(term);

    if (term.trim() === "") {
      setProducts(await fetchAllProducts());
    } else {
      const allProducts = await fetchAllProducts();
      const results = await searchProducts(term, allProducts);
      setProducts(results);
    }
  };

  // Filter products (can add category filtering here if needed)
  const filteredProducts = products;

  // Apply limit if provided
  const finalProducts = limit
    ? filteredProducts.slice(-limit).reverse() // take last N products and reverse to show newest first
    : filteredProducts;

  // OPEN MODAL (FETCH FULL DETAILS)
  const openModal = async (product) => {
    setLoading(true);
    const full = await fetchProductDetails(product.id);

    if (full) {
      setSelectedProduct(full);
    } else {
      alert("Could not load product details.");
    }
    setLoading(false);
  };

  // CLOSE MODAL
  const closeModal = () => setSelectedProduct(null);

  // Add to Cart
  const handleAddToCart = (productData) => {
    addToCart(productData);
    closeModal();
  };

  // Loading state
  if (loading && products.length === 0) {
    return (
      <section className="products-section">
        <h2>{compact ? "Latest Products" : "All Products"}</h2>
        <div className="loading-container">
          <Loader size={50} className="spinner" />
          <p>Loading products...</p>
        </div>
      </section>
    );
  }

  // Error state
  if (error && products.length === 0) {
    return (
      <section className="products-section">
        <h2>{compact ? "Latest Products" : "All Products"}</h2>
        <div className="error-container">
          <AlertCircle size={40} className="error-icon" />
          <p className="error-message">{error}</p>
          <button 
            className="retry-btn" 
            onClick={() => window.location.reload()}
          >
            Retry
          </button>
        </div>
      </section>
    );
  }

  return (
    <section
      id={compact ? "LatestProducts" : "Products"}
      className="products-section"
    >
      <h2>{compact ? "Latest Products" : "All Products"}</h2>

      {error && (
        <div className="warning-banner">
          <AlertCircle size={18} />
          <span>{error}</span>
        </div>
      )}

      {!compact && (
        <div className="Search-bar">
          <Search size={18} className="search-icon" />
          <input
            type="text"
            placeholder="Search phones, accessories..."
            value={searchTerm}
            onChange={(e) => handleSearch(e.target.value)}
          />
        </div>
      )}

      {finalProducts.length === 0 ? (
        <div className="no-products">
          <p>No products found. Try a different search term.</p>
        </div>
      ) : (
        <div className={`products ${compact ? "Latest" : ""}`}>
          {finalProducts.map((product) => (
            <div
              key={product.id}
              className="prod"
              onClick={() => openModal(product)}
            >
              <div className="prod-img">
                <img 
                  src={product.imgsrc} 
                  alt={product.name}
                  onError={(e) => {
                    e.target.src = `https://via.placeholder.com/200x250?text=${product.name}`;
                  }}
                />
              </div>
              <h3 className="product-title">{product.name}</h3>
              <p className="product-price">
                ₦ {product.price.toLocaleString()}
              </p>
              <button
                className="addcart"
                onClick={(e) => {
                  e.stopPropagation();
                  handleAddToCart(product);
                }}
              >
                <ShoppingCart size={16} /> Add to Cart
              </button>
            </div>
          ))}
        </div>
      )}

      {/* Product Modal */}
      {selectedProduct && (
        <ProductModal
          product={selectedProduct}
          onClose={closeModal}
          addToCart={handleAddToCart}
        />
      )}
    </section>
  );
}