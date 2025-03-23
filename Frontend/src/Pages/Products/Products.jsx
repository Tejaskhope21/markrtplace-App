import React, { useState, useEffect } from "react";
import { useLocation, useNavigate } from "react-router-dom";
import axios from "axios";
import "./Products.css";

const Products = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const selectedCategory = queryParams.get("category");

  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [selectedSubcategory, setSelectedSubcategory] = useState("all");
  const [subcategories, setSubcategories] = useState([]);

  useEffect(() => {
    const fetchItems = async () => {
      try {
        if (!selectedCategory) throw new Error("No category selected");

        const url = `http://localhost:5000/api/items?category=${encodeURIComponent(
          selectedCategory
        )}`;
        console.log("Fetching from:", url);

        const response = await axios.get(url);
        setItems(response.data);

        // Extract unique subcategories
        const uniqueSubcategories = [
          ...new Set(response.data.map((item) => item.subcategory)),
        ];
        setSubcategories(uniqueSubcategories);
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load items.");
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, [selectedCategory]);

  // Filter items based on selected subcategory
  const filteredItems =
    selectedSubcategory === "all"
      ? items
      : items.filter((item) => item.subcategory === selectedSubcategory);

  return (
    <div className="products-container">
      <h1 className="products-title">{selectedCategory} Items</h1>

      {/* Subcategory Filter */}
      {subcategories.length > 0 && (
        <div className="subcategory-filter">
          <label>Filter by Subcategory:</label>
          <select
            value={selectedSubcategory}
            onChange={(e) => setSelectedSubcategory(e.target.value)}
          >
            <option value="all">All</option>
            {subcategories.map((sub, index) => (
              <option key={index} value={sub}>
                {sub}
              </option>
            ))}
          </select>
        </div>
      )}

      {/* Loading & Error Handling */}
      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <div className="product-flex-container">
          {filteredItems.length > 0 ? (
            filteredItems.map((item) => (
              <div key={item._id} className="product-card">
                {/* <img
                  src={item.images[0]}
                  alt={item.name}
                  className="product-image"
                /> */}
                <img
                  src={`http://localhost:5000/uploads/${item.images[0]}`}
                  alt={item.name}
                  className="product-image"
                />

                <h2>{item.name}</h2>
                <p className="product-description">
                  {item.description || "No description available."}
                </p>
                <p>Price: ₹{Object.values(item.price_per_piece)[0]}</p>
                <button onClick={() => navigate(`/buy?id=${item._id}`)}>
                  Buy
                </button>
              </div>
            ))
          ) : (
            <p>No items found for this subcategory.</p>
          )}
        </div>
      )}
    </div>
  );
};

export default Products;
