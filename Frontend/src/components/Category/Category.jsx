

            import React from "react";
import { item_list, menu_list } from "../../assets/data";
import { Link } from "react-router-dom";
import "./Category.css";

function Category() {
  return (
    <div className="category-container">
      {menu_list.map((menuItem, index) => {
        let filteredItems = [];


        // Use if-else condition to switch categories
        if (menuItem.menu_item === "Electrical Material") {
          filteredItems = item_list.filter(
            (item) => item.category.toLowerCase() === "electrical material"
          );
        } else if (menuItem.menu_item === "Industrial Material") {
          filteredItems = item_list.filter(
            (item) => item.category.toLowerCase() === "industrial material"
          );
        } else if (menuItem.menu_item === "Fabric") {
          filteredItems = item_list.filter(
            (item) => item.category.toLowerCase() === "fabric"
          );
        } else {
          console.log("Unknown category: ", menuItem.menu_item);
        }

        return (
          <div key={index} className="card">
            <img
              src={menuItem.menu_img}
              alt={menuItem.menu_item}
              className="card-image"
            />
            <h2 className="card-heading">{menuItem.menu_item}</h2>

            {filteredItems.length > 0 ? (
              <Link
                to={{
                  pathname: "/productdisplay",

                  state: { items: filteredItems },

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