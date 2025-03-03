import React from "react";
import "./ProductDisplay.css";
import { categories, products } from "../Tempdata.js";
import { Link } from "react-router-dom";

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

        <div className="category-container">
          <h2>Source by category</h2>
          <div className="category-grid">
            {categories.map((category) => (
              <div key={category.id} className="category-card">
                <img
                  src={category.image}
                  alt={category.name}
                  className="category-image"
                />
                <p className="category-name">{category.name}</p>
              </div>
            ))}
          </div>
        </div>
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
