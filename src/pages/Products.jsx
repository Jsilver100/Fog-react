import React, { useEffect, useState, useContext } from "react";
import "./Products.css";
import { CartContext } from "../lib/cart";
import productsData from "../data/Products";
import { ShoppingCart, Search } from "lucide-react"; // added search icon

export default function Products({ limit = null, compact = false }) {
  const { addToCart } = useContext(CartContext);
  const [searchTerm, setSearchTerm] = useState("");
  const [products, setProducts] = useState([]);

  useEffect(() => {
    setProducts(productsData);
  }, []);

  const filteredProducts = compact
    ? products
    : products.filter((product) =>
        product.name.toLowerCase().includes(searchTerm.toLowerCase())
      );

  const finalProducts = limit
    ? filteredProducts.slice(0, limit)
    : filteredProducts;

  return (
    <section
      id={compact ? "LatestProducts" : "Products"}
      className="products-section"
    >
      <h2>{compact ? "Latest Products" : "Products"}</h2>

      {!compact && (
        <div className="Search-bar">
          <Search size={18} className="search-icon" />
          <input
            id="searchInput"
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
          <div key={product.id} className="prod">
            <div className="prod-img">
              <img src={product.imgsrc} alt={product.name} />
            </div>

            <h3 className="product-title">{product.name}</h3>

            <p className="product-price">₦ {product.price.toLocaleString()}</p>

            <button className="addcart" onClick={() => addToCart(product)}>
              <ShoppingCart size={16} style={{ marginRight: "6px" }} />
              Add to Cart
            </button>
          </div>
        ))}
      </div>
    </section>
  );
}