import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios"; // ✅ Import Axios for API requests
import "./Category.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

const Category = () => {
  const navigate = useNavigate();
  const scrollRef = useRef(null);
  const [categories, setCategories] = useState([]); // ✅ Dynamic categories state
  const [isLeftDisabled, setIsLeftDisabled] = useState(true);
  const [isRightDisabled, setIsRightDisabled] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // ✅ Fetch categories from the backend
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/categories/list"
        ); // Replace with actual backend URL
        setCategories(response.data);
      } catch (error) {
        console.error("Failed to fetch categories:", error);
        setError("Failed to load categories.");
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  // ✅ Handle category click and navigate
  const handleCategoryClick = (category) => {
    navigate(`/products?category=${category}`);
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  // ✅ Scroll functionality
  const scroll = (direction) => {
    if (scrollRef.current) {
      const scrollAmount = 300;
      const newScrollPosition =
        direction === "left"
          ? scrollRef.current.scrollLeft - scrollAmount
          : scrollRef.current.scrollLeft + scrollAmount;

      scrollRef.current.scrollTo({
        left: newScrollPosition,
        behavior: "smooth",
      });
    }
  };

  // ✅ Monitor scroll position to enable/disable arrows
  useEffect(() => {
    const checkScroll = () => {
      if (scrollRef.current) {
        setIsLeftDisabled(scrollRef.current.scrollLeft === 0);
        setIsRightDisabled(
          scrollRef.current.scrollLeft + scrollRef.current.clientWidth >=
            scrollRef.current.scrollWidth - 1
        );
      }
    };

    if (scrollRef.current) {
      scrollRef.current.addEventListener("scroll", checkScroll);
      checkScroll();
    }

    return () => {
      if (scrollRef.current) {
        scrollRef.current.removeEventListener("scroll", checkScroll);
      }
    };
  }, []);

  return (
    <>
      <h3 className="title">B2B Order Now</h3>

      {loading ? (
        <p>Loading categories...</p>
      ) : error ? (
        <p className="error">{error}</p>
      ) : (
        <div className="category-container">
          <button
            className="nav-arrow left"
            onClick={() => scroll("left")}
            disabled={isLeftDisabled}
          >
            <i className="fa-regular fa-circle-left"></i>
          </button>

          <div className="scroll-wrapper" ref={scrollRef}>
            {categories.length > 0 ? (
              categories.map((category) => (
                <div
                  key={category._id}
                  className="category-card"
                  onClick={() => handleCategoryClick(category.name)}
                >
                  <img
                    src={category.image}
                    alt={category.name}
                    className="category-image"
                  />
                  <h2 className="category-title">{category.name}</h2>
                </div>
              ))
            ) : (
              <p>No categories available.</p>
            )}
          </div>

          <button
            className="nav-arrow right"
            onClick={() => scroll("right")}
            disabled={isRightDisabled}
          >
            <i className="fa-regular fa-circle-right"></i>
          </button>
        </div>
      )}
    </>
  );
};

export default Category;
