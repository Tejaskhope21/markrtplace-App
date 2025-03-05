import React from "react";
import { item_list, menu_list } from "../../assets/data";
import { Link } from "react-router-dom";
import "./HomeFabric.css";

function HomeFabric() {
  return (
    <div className="category-container">
      {menu_list
        .filter((menuItem) => menuItem.menu_item === "Fabric") // Filter only Fabric category
        .map((menuItem, index) => {
          const filteredItems = item_list.filter(
            (item) => item.category.toLowerCase() === "fabric"
          );

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
                    pathname: "/fabric",
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

export default HomeFabric;
