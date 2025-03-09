import React from "react";
import { menu_list } from "../../assets/data.js";
import { useNavigate } from "react-router-dom";
import "./Category.css";

const Category = () => {
  const navigate = useNavigate();

  const handleCategoryClick = (category) => {
    navigate(`/products?category=${category}`); // Navigate with query params
  };

  return (
    <div className="category-container">
      <h1>B2B order now</h1>
      {menu_list.map((menu) => (
        <div
          key={menu.menu_item}
          className="category-card"
          onClick={() => handleCategoryClick(menu.menu_item)}
        >
          <img
            src={menu.menu_img}
            alt={menu.menu_item}
            className="category-image"
          />
          <h2 className="category-title">{menu.menu_item}</h2>
        </div>
      ))}
    </div>
  );
};

export default Category;
