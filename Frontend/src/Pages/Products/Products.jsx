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

        if (Array.isArray(response.data)) {
          setItems(response.data);
          const uniqueSubcategories = [
            ...new Set(response.data.map((item) => item.subcategory || item.category)),
          ];
          setSubcategories(uniqueSubcategories);
        } else if (response.data.success === false) {
          setError(response.data.message);
          setItems([]);
        } else {
          throw new Error("Unexpected response format");
        }
      } catch (err) {
        console.error("Error fetching items:", err);
        setError(err.message === "Network Error" ? "Failed to connect to the server. Please ensure the backend is running." : err.response?.data?.message || "Failed to load items.");
        setItems([]);
      } finally {
        setLoading(false);
      }
    };

    fetchItems();
  }, [selectedCategory]);

  const filteredItems =
    selectedSubcategory === "all"
      ? items
      : items.filter((item) => item.subcategory === selectedSubcategory);

  const handleCategoryClick = (id) => {
    navigate(`/buy?id=${id}`);
  };

  return (
    <div className="products-container">
      <h1 className="products-title">{selectedCategory} Items</h1>

      {subcategories.length > 0 && (
        <div className="subcategory-filter">
          <button
            onClick={() => setSelectedSubcategory("all")}
            className={selectedSubcategory === "all" ? "active" : ""}
          >
            All
          </button>
          {subcategories.map((subcategory, index) => (
            <button
              key={index}
              onClick={() => setSelectedSubcategory(subcategory)}
              className={selectedSubcategory === subcategory ? "active" : ""}
            >
              {subcategory}
            </button>
          ))}
        </div>
      )}

      {loading ? (
        <p>Loading...</p>
      ) : error ? (
        <p>{error}</p>
      ) : (
        <div className="product-flex-container">
          {filteredItems.length > 0 ? (
            filteredItems.map((item) => (
              <div key={item._id} className="product-card">
                <img
                  src={item.images[0]}
                  alt={item.name}
                  className="product-image"
                  onError={(e) => {
                    console.error(`Failed to load image: ${item.images[0]}`);
                    e.target.src = "https://via.placeholder.com/150";
                  }}
                />
                <h2>{item.name}</h2>
                <p className="product-description">
                  {item.description || "No description available."}
                </p>
                <p>Price: ₹{item.price || Object.values(item.price_per_piece)[0]}</p>
                <p>Rating: {item.rating || "N/A"} / 5</p>
                <button onClick={() => handleCategoryClick(item._id)}>
                  View Details
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