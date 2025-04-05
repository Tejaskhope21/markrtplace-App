import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "./List.css"; // Ensure this file exists

function List() {
  const url = "http://localhost:5000";
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchItems = async () => {
    try {
      console.log("Fetching items from:", `${url}/api/items/item`);
      const response = await axios.get(`${url}/api/items/item`, {
        timeout: 5000, // Add timeout to catch slow responses
      });
      console.log("API response:", response.data);

      if (response.data.success && Array.isArray(response.data.data)) {
        if (response.data.data.length === 0) {
          toast.info("No food items found.");
        }
        setItems(response.data.data);
      } else {
        toast.error("Invalid data format received from the server");
      }
    } catch (error) {
      console.error("Error fetching items:", error.message, error.response?.data);
      toast.error(
        error.code === "ECONNABORTED"
          ? "Request timed out. Please check your server."
          : error.response?.data?.message || "Failed to fetch items. Please try again."
      );
    } finally {
      setLoading(false);
    }
  };

  const removeItem = async (itemId) => {
    try {
      console.log("Removing item with ID:", itemId);
      const response = await axios.post(`${url}/api/items/remove/`, { id: itemId });
      console.log("Remove response:", response.data);

      if (response.data.success) {
        toast.success(response.data.message || "Item removed successfully");
        await fetchItems();
      } else {
        toast.error(response.data.message || "Failed to remove item");
      }
    } catch (error) {
      console.error("Error removing item:", error);
      toast.error("Something went wrong. Please try again.");
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      {items.length === 0 ? (
        <p>No items available.</p>
      ) : (
        items.map((item) => (
          <div key={item._id} className="list-table-row">
            <div className="list-table-column">
              <img
                src={`${url}/uploads/${item.images?.[0]}`}
                alt={item.name}
                className="item-image"
                onError={(e) => {
                  console.error(`Failed to load image: ${item.images?.[0]}`);
                  e.target.src = "https://via.placeholder.com/150";
                }}
              />
            </div>
            <div className="list-table-column">{item.name}</div>
            <div className="list-table-column">{item.category}</div>
            <div className="list-table-column">
              <div>MOQ: {item.MOQ}</div>
              <div>B2B Menu: {item.b2b_menu}</div>
            </div>
            <div className="list-table-column">
              <div>20-199: ${item.price_per_piece?.["20-199"] || "N/A"}</div>
              <div>200-999: ${item.price_per_piece?.["200-999"] || "N/A"}</div>
              <div>1000+: ${item.price_per_piece?.["1000+"] || "N/A"}</div>
            </div>
            <div className="list-table-column">
              <div>Color: {item.specifications?.color || "N/A"}</div>
              <div>Weight: {item.specifications?.weight || "N/A"}</div>
              <div>Battery: {item.specifications?.battery || "N/A"}</div>
            </div>
            <div className="list-table-column">
              <div>Supplier: {item.supplier?.name || "N/A"}</div>
              <div>Location: {item.supplier?.location || "N/A"}</div>
            </div>
            <div className="list-table-column">
              <div>
                Free Shipping Above: ${item.shipping?.free_shipping_above || "N/A"}
              </div>
              <div>Shipping Cost: ${item.shipping?.cost || "N/A"}</div>
            </div>
            <div className="list-table-column">
              <button onClick={() => removeItem(item._id)} className="remove-button">
                X
              </button>
            </div>
          </div>
        ))
      )}
    </div>
  );
}

export default List;