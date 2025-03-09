import React, { useRef, useState, useEffect } from "react";
import { product } from "../../assets/b_to_c_data";
import { useNavigate } from "react-router-dom";
import "@fortawesome/fontawesome-free/css/all.min.css";
import "./B2C_Category.css";

const B2C_Category = () => {
  const navigate = useNavigate();
  const scrollRef = useRef(null);
  const [isLeftDisabled, setIsLeftDisabled] = useState(true);
  const [isRightDisabled, setIsRightDisabled] = useState(false);

  const handleCategoryClick = (category) => {
    navigate(`/shop?category=${category}`);
  };

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
      <h3 className="title">B2C Shop Now</h3>
      <div className="category-container">
        <button
          className="nav-arrow left"
          onClick={() => scroll("left")}
          disabled={isLeftDisabled}
        >
          <i className="fa-regular fa-circle-left"></i>
        </button>

        <div className="scroll-wrapper" ref={scrollRef}>
          {product.map((menu) => (
            <div
              key={menu.product_name}
              className="category-card"
              onClick={() => handleCategoryClick(menu.product_name)}
            >
              <img
                src={menu.product_img}
                alt={menu.product_name}
                className="category-image"
              />
              <h2 className="category-title">{menu.product_name}</h2>
            </div>
          ))}
        </div>

        <button
          className="nav-arrow right"
          onClick={() => scroll("right")}
          disabled={isRightDisabled}
        >
          <i className="fa-regular fa-circle-right"></i>
        </button>
      </div>
    </>
  );
};

export default B2C_Category;
