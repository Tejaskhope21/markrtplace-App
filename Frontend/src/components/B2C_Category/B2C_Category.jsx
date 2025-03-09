import React from 'react'
import './B2C_Category.css'
import { product } from '../../assets/b_to_c_data'
import { useNavigate } from "react-router-dom";
function B2C_Category() {
  const navigate = useNavigate();

  const handleCategoryClick = (category) => {
    navigate(`/shop?category=${category}`); // Navigate with query params
  };
  return (

  <div className="b2ccategory">
    <h1>B2C Shop now</h1>
        {product.map((menu) => (
          <div
            key={menu.product_name}
            className="category-card"
            onClick={()=>{handleCategoryClick(menu.product_name)}}
          >
            <img
              src={menu.product_img}
              alt={menu.product_img}
              className="category-image"
            />
            <h2 className="category-title">{menu.product_name}</h2>
          </div>
        ))}
      </div>
  )
}

export default B2C_Category
