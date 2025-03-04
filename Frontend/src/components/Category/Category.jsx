import React from "react";
import { item_list, menu_list } from "../../assets/data";
import { Link } from "react-router-dom";
import "./Category.css";

function Category() {
  return (
    <div className="category-container">
      {menu_list.map((menuItem, index) => {
        // Filter items based on the current menu item
        const filteredItems = item_list.filter(
          (item) => item.category.toLowerCase() === menuItem.menu_item.toLowerCase()
        );

        console.log("Menu Item:", menuItem.menu_item);
        console.log("Filtered Items:", filteredItems);

        return (
          <div key={index} className="card">
            <img
              src={menuItem.menu_img}
              alt={menuItem.menu_item}
              className="card-image"
            />
            <h2 className="card-heading">{menuItem.menu_item}</h2>

            {/* Render Link only if there are items in the category */}
            {filteredItems.length > 0 ? (
              <Link
                to={{
                  pathname: "/productdisplay",
                  state: { items: filteredItems }, // Pass data as state
                }}
              >
                View Products
              </Link>
            ) : (
              <p>No products available in this category.</p>
            )}
          </div>
        );
      })}
    </div>
  );
}

export default Category;
