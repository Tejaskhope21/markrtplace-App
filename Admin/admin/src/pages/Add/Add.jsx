import React, { useEffect, useState } from "react";
import axios from "axios";
import "./Add.css";

const Add = () => {
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    product_category: "",
    description: "",
    price_per_piece: { "20-199": "", "200-999": "", "1000+": "" },
    MOQ: "",
    specifications: { color: "", weight: "", battery: "" },
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
    const keys = name.split(".");

    setFormData((prev) => {
      let newState = { ...prev };
      let temp = newState;

      for (let i = 0; i < keys.length - 1; i++) {
        if (!temp[keys[i]]) temp[keys[i]] = {};
        temp = temp[keys[i]];
      }

      temp[keys[keys.length - 1]] = value;
      return { ...newState };
    });
  };

  const handleImageChange = (e) => {
    const files = Array.from(e.target.files);
    setFormData((prev) => ({
      ...prev,
      images: files,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (
      !formData.name ||
      !formData.category ||
      !formData.product_category ||
      !formData.description ||
      !formData.MOQ ||
      !formData.b2b_menu ||
      formData.images.length === 0 ||
      !formData.supplier.name ||
      !formData.supplier.location ||
      !formData.shipping.cost
    ) {
      alert(
        "Please fill in all required fields including at least one image, supplier name, location, and shipping cost."
      );
      return;
    }

    const priceFields = ["20-199", "200-999", "1000+"];
    for (let field of priceFields) {
      if (
        !formData.price_per_piece[field] ||
        isNaN(Number(formData.price_per_piece[field]))
      ) {
        alert(`Please enter a valid price for ${field} units.`);
        return;
      }
    }

    const data = new FormData();
    data.append("name", formData.name);
    data.append("category", formData.category);
    data.append("product_category", formData.product_category);
    data.append("description", formData.description);
    data.append("MOQ", formData.MOQ);
    data.append("b2b_menu", formData.b2b_menu);

    // Send price_per_piece as a nested object
    data.append("price_per_piece", JSON.stringify(formData.price_per_piece));

    // Send specifications as a nested object
    data.append("specifications", JSON.stringify(formData.specifications));

    // Send supplier as a nested object
    data.append("supplier", JSON.stringify(formData.supplier));

    // Send shipping as a nested object
    data.append("shipping", JSON.stringify(formData.shipping));

    formData.images.forEach((file) => data.append("images", file));

    console.log("FormData being sent:");
    for (let [key, value] of data.entries()) {
      console.log(`${key}: ${value instanceof File ? value.name : value}`);
    }

    try {
      const response = await axios.post(
        "http://localhost:5000/api/items/add",
        data,
        {
          headers: { "Content-Type": "multipart/form-data" },
        }
      );

      if (response.data.success) {
        alert("Item added successfully!");
        setFormData({
          name: "",
          category: "",
          product_category: "",
          description: "",
          price_per_piece: { "20-199": "", "200-999": "", "1000+": "" },
          MOQ: "",
          specifications: { color: "", weight: "", battery: "" },
          images: [],
          supplier: { name: "", location: "" },
          shipping: { free_shipping_above: 0, cost: "" },
          b2b_menu: "",
        });
      } else {
        alert("Failed to add item: " + response.data.message);
      }
    } catch (error) {
      console.error(
        "Error adding item:",
        error.response?.data || error.message
      );
      alert(
        "Error adding item: " + (error.response?.data?.message || error.message)
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

        <div className="form-group">
          <label>Description:</label>
          <textarea
            name="description"
            value={formData.description}
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
          <label>B2B Menu:</label>
          <input
            type="text"
            name="b2b_menu"
            value={formData.b2b_menu}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Images:</label>
          <input
            type="file"
            name="images"
            multiple
            onChange={handleImageChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Supplier Name:</label>
          <input
            type="text"
            name="supplier.name"
            value={formData.supplier.name}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Supplier Location:</label>
          <input
            type="text"
            name="supplier.location"
            value={formData.supplier.location}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Free Shipping Above (optional):</label>
          <input
            type="number"
            name="shipping.free_shipping_above"
            value={formData.shipping.free_shipping_above}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Shipping Cost:</label>
          <input
            type="number"
            name="shipping.cost"
            value={formData.shipping.cost}
            onChange={handleChange}
            required
          />
        </div>

        <div className="form-group">
          <label>Specifications - Color (optional):</label>
          <input
            type="text"
            name="specifications.color"
            value={formData.specifications.color}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Specifications - Weight (optional):</label>
          <input
            type="text"
            name="specifications.weight"
            value={formData.specifications.weight}
            onChange={handleChange}
          />
        </div>

        <div className="form-group">
          <label>Specifications - Battery (optional):</label>
          <input
            type="text"
            name="specifications.battery"
            value={formData.specifications.battery}
            onChange={handleChange}
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
