import React from "react";
import { useLocation, useParams } from "react-router-dom";
import { item_list } from "../../assets/data"; // Import item_list to fetch items
import "./ProductDisplay.css";
import SorceCategory from "../../components/SorceCategory/SorceCategory.jsx";
import ShowCategory from "../../components/ShowCategory/ShowCategory.jsx";

const ProductDisplay = () => {
  const location = useLocation();
  const { category } = useParams();
  const { state } = location;

  console.log("Category from URL:", category);
  console.log("State in ProductDisplay:", state);

  // Capitalize the category name for display
  const categoryName = category
    ? category.charAt(0).toUpperCase() + category.slice(1)
    : "Unknown Category";

  // Use state.items if available; otherwise, fetch items based on category
  const items =
    state?.items ||
    item_list.filter(
      (item) => item.category.toLowerCase() === category?.toLowerCase()
    ) ||
    [];

  return (
    <div className="electronics-page">
      <h2>{categoryName}</h2>

      <div className="electrical-page">
        <div className="hero-section">
          <h1>{categoryName} Equipment & Supplies</h1>
          <p>Discover new and trending products</p>
        </div>
      </div>

      <SorceCategory items={items} />
      <ShowCategory />
    </div>
  );
};

export default ProductDisplay;