import React from "react";
import { useLocation } from "react-router-dom";
import "./ProductDisplay.css";
import SorceCategory from "../../components/SorceCategory/SorceCategory.jsx";
import ShowCategory from "../../components/ShowCategory/ShowCategory.jsx";

const ProductDisplay = ({items}) => {
  const location = useLocation();
  const  item = location.state || { items: [] }; // Access passed data

  // Ensure items is not empty and extract the category name
  const categoryName = item.length > 0 ? item[0].category : "Unknown Category";

  return (
    <div className="electronics-page">
      {/* Display the category name */}
      <h2>{categoryName}</h2>

      <div className="electrical-page">
        <div className="hero-section">
          <h1>Electrical Equipment & Supplies</h1>
          <p>Discover new and trending products</p>
        </div>
      </div>

      {/* Pass the items to SorceCategory */}
      <SorceCategory items={items} />
      <ShowCategory />
    </div>
  );
};

export default ProductDisplay;