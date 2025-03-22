import React, { useRef, useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./Category.css";
import "@fortawesome/fontawesome-free/css/all.min.css";

const Category = () => {
  const navigate = useNavigate();
  const scrollRef = useRef(null);
  const [categories, setCategories] = useState([]);
  const [isLeftDisabled, setIsLeftDisabled] = useState(true);
  const [isRightDisabled, setIsRightDisabled] = useState(false);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchCategories = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);

      const response = await axios.get(
        "http://localhost:5000/api/categories", // Change from 6000 to 5000
        {
          timeout: 5000,
          headers: {
            "Cache-Control": "no-cache",
          },
        }
      );

      const categoryData = Array.isArray(response.data.data)
        ? response.data.data
        : [];

      setCategories(categoryData);
    } catch (error) {
      console.error("Error fetching categories:", error);
      setError(
        error.response?.data?.message ||
          "Failed to load categories. Please check your connection and try again."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  const handleCategoryClick = useCallback(
    (categoryName) => {
      navigate(`/products?category=${encodeURIComponent(categoryName)}`);
      window.scrollTo({ top: 0, behavior: "smooth" });
    },
    [navigate]
  );

  const scroll = useCallback((direction) => {
    if (scrollRef.current) {
      const scrollAmount = 300;
      scrollRef.current.scrollTo({
        left:
          direction === "left"
            ? scrollRef.current.scrollLeft - scrollAmount
            : scrollRef.current.scrollLeft + scrollAmount,
        behavior: "smooth",
      });
    }
  }, []);

  useEffect(() => {
    const checkScroll = () => {
      if (scrollRef.current) {
        const { scrollLeft, clientWidth, scrollWidth } = scrollRef.current;
        setIsLeftDisabled(scrollLeft === 0);
        setIsRightDisabled(scrollLeft + clientWidth >= scrollWidth - 1);
      }
    };

    const currentRef = scrollRef.current;
    if (currentRef) {
      currentRef.addEventListener("scroll", checkScroll);
      checkScroll();
    }

    return () => {
      if (currentRef) {
        currentRef.removeEventListener("scroll", checkScroll);
      }
    };
  }, []);

  if (loading) {
    return (
      <div className="loading-container">
        <h3 className="title">B2B Order Now</h3>
        <p>Loading categories...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="error-container">
        <h3 className="title">B2B Order Now</h3>
        <p className="error">{error}</p>
        <button onClick={fetchCategories} className="retry-button">
          Retry
        </button>
      </div>
    );
  }

  return (
    <>
      <h3 className="title">B2B Order Now</h3>
      <div className="category-container">
        <button
          className="nav-arrow left"
          onClick={() => scroll("left")}
          disabled={isLeftDisabled}
          aria-label="Scroll left"
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
                role="button"
                tabIndex={0}
                onKeyPress={(e) =>
                  e.key === "Enter" && handleCategoryClick(category.name)
                }
              >
                <img
                  src={category.image}
                  alt={category.name}
                  className="category-image"
                  onError={(e) => {
                    e.target.src = "/fallback-image.jpg";
                  }}
                  loading="lazy" // Improve performance
                />
                <h2 className="category-title">{category.name}</h2>
              </div>
            ))
          ) : (
            <p>No categories available at the moment.</p>
          )}
        </div>

        <button
          className="nav-arrow right"
          onClick={() => scroll("right")}
          disabled={isRightDisabled}
          aria-label="Scroll right"
        >
          <i className="fa-regular fa-circle-right"></i>
        </button>
      </div>
    </>
  );
};

export default Category;
