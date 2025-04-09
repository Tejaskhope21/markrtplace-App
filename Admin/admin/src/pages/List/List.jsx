import React, { useState, useEffect, useRef } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "./List.css";

function List() {
  const url = "http://localhost:5000";
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [editingItemId, setEditingItemId] = useState(null);
  const [updatedData, setUpdatedData] = useState({});
  const [updatedImages, setUpdatedImages] = useState({});
  const imageRefs = useRef({});

  const fetchItems = async () => {
    try {
      const response = await axios.get(`${url}/api/items/item`);
      if (response.data.success) {
        setItems(response.data.data);
      } else {
        toast.error("Failed to load items.");
      }
    } catch (error) {
      toast.error("Error loading items.");
    } finally {
      setLoading(false);
    }
  };

  const removeItem = async (itemId) => {
    try {
      const response = await axios.delete(`${url}/api/items/remove/${itemId}`);
      if (response.data.success) {
        toast.success("Item removed.");
        fetchItems();
      }
    } catch (error) {
      toast.error("Failed to remove item.");
    }
  };

  const updateItem = async (itemId) => {
    try {
      const formData = new FormData();

      for (const key in updatedData) {
        if (["price_per_piece", "specifications", "supplier", "shipping"].includes(key)) {
          formData.append(key, JSON.stringify(updatedData[key]));
        } else {
          formData.append(key, updatedData[key]);
        }
      }

      // Fixed image upload with index tracking
      Object.entries(updatedImages).forEach(([index, file]) => {
        formData.append("images", file); // Image file
        formData.append("imageIndexes", index); // Corresponding index
      });

      const response = await axios.put(`${url}/api/items/update/${itemId}`, formData, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.data.success) {
        toast.success("Item updated.");
        fetchItems();
        setEditingItemId(null);
        setUpdatedImages({});
      } else {
        toast.error("Update failed.");
      }
    } catch (error) {
      toast.error("Error updating item.");
    }
  };

  const handleEditClick = (item) => {
    setEditingItemId(item._id);
    setUpdatedData({
      name: item.name,
      category: item.category,
      product_category: item.product_category,
      description: item.description,
      MOQ: item.MOQ,
      b2b_menu: item.b2b_menu,
      price_per_piece: item.price_per_piece,
      specifications: item.specifications,
      supplier: item.supplier,
      shipping: item.shipping,
    });
    setUpdatedImages({});
  };

  const handleChange = (e, parentKey = null) => {
    const { name, value } = e.target;
    if (parentKey) {
      setUpdatedData((prev) => ({
        ...prev,
        [parentKey]: {
          ...prev[parentKey],
          [name]: value,
        },
      }));
    } else {
      setUpdatedData((prev) => ({
        ...prev,
        [name]: value,
      }));
    }
  };

  const handleImageClick = (index) => {
    if (imageRefs.current[index]) {
      imageRefs.current[index].click();
    }
  };

  const handleImageChange = (e, index) => {
    const file = e.target.files[0];
    if (file) {
      setUpdatedImages((prev) => ({
        ...prev,
        [index]: file,
      }));
    }
  };

  useEffect(() => {
    fetchItems();
  }, []);

  if (loading) return <div>Loading...</div>;

  return (
    <div className="list-container">
      {items.map((item) => (
        <div key={item._id} className="list-card">
          <div className="images-grid">
            {[0, 1, 2, 3, 4].map((i) => (
              <div key={i} className="image-wrapper">
                <img
                  src={
                    updatedImages[i]
                      ? URL.createObjectURL(updatedImages[i])
                      : `${url}/uploads/${item.images?.[i] || "placeholder.jpg"}`
                  }
                  alt={`Product ${i}`}
                  onClick={() => handleImageClick(i)}
                />
                <input
                  type="file"
                  accept="image/*"
                  ref={(el) => (imageRefs.current[i] = el)}
                  style={{ display: "none" }}
                  onChange={(e) => handleImageChange(e, i)}
                />
              </div>
            ))}
          </div>

          {editingItemId === item._id ? (
            <div className="item-details">
              <input name="name" value={updatedData.name} onChange={handleChange} placeholder="Name" />
              <input name="category" value={updatedData.category} onChange={handleChange} placeholder="Category" />
              <input name="product_category" value={updatedData.product_category} onChange={handleChange} placeholder="Product Category" />
              <textarea name="description" value={updatedData.description} onChange={handleChange} placeholder="Description" />
              <input name="MOQ" value={updatedData.MOQ} onChange={handleChange} placeholder="MOQ" />
              <input name="b2b_menu" value={updatedData.b2b_menu} onChange={handleChange} placeholder="B2B Menu" />

              <input name="20-199" value={updatedData.price_per_piece["20-199"]} onChange={(e) => handleChange(e, "price_per_piece")} placeholder="Price 20-199" />
              <input name="200-999" value={updatedData.price_per_piece["200-999"]} onChange={(e) => handleChange(e, "price_per_piece")} placeholder="Price 200-999" />
              <input name="1000+" value={updatedData.price_per_piece["1000+"]} onChange={(e) => handleChange(e, "price_per_piece")} placeholder="Price 1000+" />

              <button onClick={() => updateItem(item._id)}>Save</button>
              <button onClick={() => setEditingItemId(null)}>Cancel</button>
            </div>
          ) : (
            <div className="item-details">
              <h3>{item.name}</h3>
              <p>{item.description}</p>
              <p>Category: {item.category}</p>
              <p>MOQ: {item.MOQ}</p>
              <p>B2B Menu: {item.b2b_menu}</p>
              <p>Price: 20-199: {item.price_per_piece["20-199"]}</p>
              <button onClick={() => handleEditClick(item)}>Edit</button>
              <button onClick={() => removeItem(item._id)}>Delete</button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
}

export default List;
