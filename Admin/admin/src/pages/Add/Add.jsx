import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Add.css";

const Add = () => {
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    product_category: "",
    price_per_piece: { "20-199": "", "200-999": "", "1000+": "" },
    MOQ: "",
    specifications: {},
    images: [],
    supplier: { name: "", location: "" },
    shipping: { free_shipping_above: 0, cost: "" },
    b2b_menu: "",
  });

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/categories")
      .then((response) => {
        if (response.data.success && Array.isArray(response.data.data)) {
          setCategories(response.data.data);
        } else {
          console.error("API did not return an array:", response.data);
        }
      })
      .catch((error) => console.error("Error fetching categories:", error));
  }, []);

  const handleChange = (e) => {
    const { name, value } = e.target;
    if (name.includes(".")) {
      const [parent, child] = name.split(".");
      setFormData((prev) => ({
        ...prev,
        [parent]: { ...prev[parent], [child]: value },
      }));
    } else {
      setFormData((prev) => ({ ...prev, [name]: value }));
    }
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setFormData((prev) => ({
      ...prev,
      images: files.map((file) => URL.createObjectURL(file)),
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5000/api/add",
        formData,
        {
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      if (response.data.success) {
        alert("Item added successfully!");
        setFormData({
          name: "",
          category: "",
          product_category: "",
          price_per_piece: { "20-199": "", "200-999": "", "1000+": "" },
          MOQ: "",
          specifications: {},
          images: [],
          supplier: { name: "", location: "" },
          shipping: { free_shipping_above: 0, cost: "" },
          b2b_menu: "",
        });
      } else {
        alert("Failed to add item.");
      }
    } catch (error) {
      console.error(
        "Error adding item:",
        error.response?.data || error.message
      );
    }
  };

  return (
    <div className="add-item-container">
      <h2>Add New Item</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Name:</label>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Category:</label>
          <select
            name="category"
            value={formData.category}
            onChange={handleChange}
            required
          >
            <option value="">Select a category</option>
            {categories.map((cat) => (
              <option key={cat._id} value={cat.name}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        <div className="form-group">
          <label>Product Category:</label>
          <input
            type="text"
            name="product_category"
            value={formData.product_category}
            onChange={handleChange}
            required
          />
        </div>

        <div className="price-group">
          <h3>Price Per Piece</h3>
          {["20-199", "200-999", "1000+"].map((range) => (
            <div className="form-group" key={range}>
              <label>{range} units:</label>
              <input
                type="number"
                name={`price_per_piece.${range}`}
                value={formData.price_per_piece[range]}
                onChange={handleChange}
                required
              />
            </div>
          ))}
        </div>

        <div className="form-group">
          <label>MOQ:</label>
          <input
            type="number"
            name="MOQ"
            value={formData.MOQ}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Images:</label>
          <input type="file" multiple onChange={handleImageChange} required />
        </div>

        <div className="supplier-group">
          <h3>Supplier Details</h3>
          <input
            type="text"
            name="supplier.name"
            value={formData.supplier.name}
            onChange={handleChange}
            required
            placeholder="Supplier Name"
          />
          <input
            type="text"
            name="supplier.location"
            value={formData.supplier.location}
            onChange={handleChange}
            required
            placeholder="Location"
          />
        </div>

        <div className="shipping-group">
          <h3>Shipping Details</h3>
          <input
            type="number"
            name="shipping.free_shipping_above"
            value={formData.shipping.free_shipping_above}
            onChange={handleChange}
          />
          <input
            type="number"
            name="shipping.cost"
            value={formData.shipping.cost}
            onChange={handleChange}
            required
            placeholder="Shipping Cost"
          />
        </div>

        <div className="form-group">
          <label>B2B Menu:</label>
          <input
            type="text"
            name="b2b_menu"
            value={formData.b2b_menu}
            onChange={handleChange}
            required
          />
        </div>

        <button type="submit" className="submit-btn">
          Add Item
        </button>
      </form>
    </div>
  );
};

export default Add;
