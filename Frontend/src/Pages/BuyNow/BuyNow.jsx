import React from 'react';
import './BuyNow.css'; // Ensure you import the correct CSS file
import { productcategory } from '../../assets/b_to_c_data';
import { item_list } from '../../assets/data';
import { useLocation } from 'react-router-dom';

function BuyNow() {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);
  const selectedCategory = queryParams.get('id');

  // Convert selectedCategory to a number
  const productId = Number(selectedCategory);

  // Filter the product based on the ID from both arrays
  const showproductdetails = productcategory.filter(
    (item) => item.id === productId
  );

  const showproductdetails_1 = item_list.filter(
    (item) => item.id === productId
  );

  // Combine the results from both arrays
  const combinedProductDetails = [...showproductdetails, ...showproductdetails_1];

  return (
    <div className='buynow'>
      {combinedProductDetails.length > 0 ? (
        combinedProductDetails.map((item) => (
          <div className="buynow-content" key={item.id}>
            <h1>{item.name}</h1>
            {/* Display the first image */}
            <img src={item.images[0]} alt={item.name} />
            {/* Display the second image if it exists */}
            {item.images[1] && <img src={item.images[1]} alt={item.name} />}
            <p>{item.description}</p>
            <p>Price: ${item.price}</p>
            <p>Rating: {item.rating} / 5</p>
          </div>
        ))
      ) : (
        <p>No product found with ID: {selectedCategory}</p>
      )}
    </div>
  );
}

export default BuyNow;