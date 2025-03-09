import React, { useState } from 'react';
import './ShoppingProduct.css';
import { useLocation } from 'react-router-dom';
import { productcategory } from '../../assets/b_to_c_data';
import { useNavigate } from 'react-router-dom';

function ShoppingProduct() {
  const navigate = useNavigate();

  const handleCategoryClick = (id) => {
    navigate(`/buy?id=${id}`); // Pass only the ID
  };

  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const selectedCategory = queryParams.get('category');

  // Filter products based on the selected category
  const filterproduct = productcategory.filter(
    (product) => product.category === selectedCategory
  );

  // Get unique subcategories (if any)
  const uniqueSubcategories = [
    ...new Set(filterproduct.map((item) => item.subcategory || item.category)),
  ];

  // State for subcategory filtering
  const [shopcategory, setShopcategory] = useState('all');

  // Filter products based on the selected subcategory
  const proFilter = filterproduct.filter(
    (item) =>
      shopcategory === 'all' || item.subcategory === shopcategory
  );

  return (
    <div className="shopping-product">
      <h1>Products in {selectedCategory}</h1>

      {/* Subcategory Filter */}
      <div className="subcategory-filter">
        <button onClick={() => setShopcategory('all')}>All</button>
        {uniqueSubcategories.map((subcategory, index) => (
          <button key={index} onClick={() => setShopcategory(subcategory)}>
            {subcategory}
          </button>
        ))}
      </div>

      {/* Display Filtered Products */}
      <div className="product-list">
        {proFilter.map((product) => (
          <div key={product.name} className="product-card">
            <img
              src={product.images[0]}
              alt={product.name}
              className="product-image"
            />
            <h2>{product.name}</h2>
            <p>{product.description}</p>
            <p>Price: ${product.price}</p>
            <p>Rating: {product.rating} / 5</p>
            <button onClick={() => handleCategoryClick(product.id)}>Buy Product</button>
          </div>
        ))}
      </div>
    </div>
  );
}

export default ShoppingProduct;