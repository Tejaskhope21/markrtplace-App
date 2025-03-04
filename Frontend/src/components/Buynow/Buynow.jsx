import React, { useState } from "react";
import "./Buynow.css"; // Update CSS filename as well

const product = {
  name: "Hot Single Core Copper PVC House Wire BVR",
  description: "Electrical Wire and Building Cable",
  prices: {
    small: "₹16.91",
    medium: "₹16.02",
    bulk: "₹15.13",
  },
  colors: [
    {
      name: "Red",
      hex: "#FF0000",
      image:
        "https://s.alicdn.com/@sc04/kf/H8f82f7eda3524bb09f63713480268cdcm.jpg_720x720q50.jpg",
    },
    {
      name: "Blue",
      hex: "#0000FF",
      image:
        "https://s.alicdn.com/@sc04/kf/H898141e114214063bd28ee39f69218baF.jpg_720x720q50.jpg",
    },
    {
      name: "Yellow",
      hex: "#FFD700",
      image:
        "https://s.alicdn.com/@sc04/kf/H0610bdb0df3946c1b4c28ff1ad6510c8B.jpg_720x720q50.jpg",
    },
    {
      name: "Green",
      hex: "#00FF00",
      image:
        "https://s.alicdn.com/@sc04/kf/H3b439e83c05c4cbf956ce86da7e86a1eQ.jpg_720x720q50.jpg",
    },
  ],
};

const Buynow = () => {
  const [selectedColor, setSelectedColor] = useState(product.colors[0]);

  return (
    <div className="buycontainer">
      {/* Left Side - Image Gallery */}
      <div className="gallery">
        <div className="thumbnails">
          {product.colors.map((color, index) => (
            <img
              key={index}
              src={color.image}
              alt={color.name}
              className={`thumbnail ${
                color.name === selectedColor.name ? "active" : ""
              }`}
              onClick={() => setSelectedColor(color)}
            />
          ))}
        </div>
        <div className="main-image">
          <img src={selectedColor.image} alt="Product" />
        </div>
      </div>

      {/* Right Side - Product Details */}
      <div className="details">
        <h1>{product.name}</h1>
        <p className="description">{product.description}</p>

        {/* Pricing */}
        <div className="pricing">
          <p>
            <b>10 - 999 meters:</b> {product.prices.small}
          </p>
          <p>
            <b>1000 - 9999 meters:</b> {product.prices.medium}
          </p>
          <p>
            <b>≥ 10,000 meters:</b> {product.prices.bulk}
          </p>
        </div>

        {/* Color Selection */}
        <div className="color-options">
          <p>
            <b>Color:</b> {selectedColor.name}
          </p>
          <div className="colors">
            {product.colors.map((color, index) => (
              <button
                key={index}
                className={`color-box ${
                  color.name === selectedColor.name ? "active" : ""
                }`}
                style={{ backgroundColor: color.hex }}
                onClick={() => setSelectedColor(color)}
              ></button>
            ))}
          </div>
        </div>

        {/* Product Info */}
        <p>
          <b>Length:</b> 1m
        </p>
        <p>
          <b>Number of Cores:</b> Single-Core
        </p>

        {/* Action Buttons */}
        <div className="buttons">
          <button className="inquiry">Buy Now</button>
          <button className="inquiry">Send Inquiry</button>
          <button className="inquiry">Call Now</button>
        </div>
      </div>
    </div>
  );
};

export default Buynow;
