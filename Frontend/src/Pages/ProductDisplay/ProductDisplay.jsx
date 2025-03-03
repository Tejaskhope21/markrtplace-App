import React from "react";
import "./ProductDisplay.css";
import { categories, products } from "../../Tempdata.js";
import { Link } from "react-router-dom";
import SorceCategory from "../../components/SorceCategory/SorceCategory.jsx";

const ProductDisplay = () => {
  return (
    <div className="electronics-page">
      <h2>Electronics Deals</h2>

      <div className="electrical-page">
        {/* Background Section */}
        <div className="hero-section">
          <h1>Electrical Equipment & Supplies</h1>
          <p>Discover new and trending products</p>
        </div>

        {/* Category Section */}

        <SorceCategory/>
      </div>

      <Link className="links" to="/productdetails">
        <div className="product-grid">
          {products.map((product) => (
            <div key={product.id} className="product-card">
              <img
                src={product.image}
                alt={product.name}
                className="product-image"
              />
              <h3 className="product-name">{product.name}</h3>
              <p className="product-price">
                <span className="current-price">₹{product.price}</span>
              </p>
              <p className="product-rating">
                ⭐ {product.rating} ({product.reviews})
              </p>
            </div>
          ))}
        </div>
      </Link>
    </div>
  );
};

export default ProductDisplay;
