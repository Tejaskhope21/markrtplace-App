import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "./Add_b2c.css";

const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const Add_b2c = () => {
  const [categories, setCategories] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    subcategory: "",
    price: "", // Using string for controlled input
    description: "",
    brand: "",
    stock: "", // Using string for controlled input
    rating: "0", // Using string for controlled input
    images: [],
    supplier: {
      name: "",
      location: "",
    },
    specifications: {
      material: "",
      height: "",
    },
    shipping: {
      free_shipping_above: "0", // Using string for controlled input
      cost: "", // Using string for controlled input
    },
    isFeatured: false,
  });

  useEffect(() => {
    axios
      .get(`${API_URL}/api/categoriesb2c`)
      .then((response) => {
        if (response.data.success) {
          setCategories(response.data.data);
        } else {
          toast.error("Failed to fetch categories");
        }
      })
      .catch(() => toast.error("Error fetching categories"));
  }, []);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const handleNestedChange = (e) => {
    const { name, value } = e.target;
    const [field, subField] = name.split(".");
    setFormData((prev) => ({
      ...prev,
      [field]: { ...prev[field], [subField]: value },
    }));
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

    // Validation
    if (
      !formData.name ||
      !formData.category ||
      !formData.subcategory ||
      !formData.price ||
      !formData.description ||
      !formData.brand ||
      !formData.stock ||
      !formData.supplier.name ||
      !formData.supplier.location ||
      !formData.specifications.material ||
      !formData.specifications.height ||
      !formData.shipping.cost ||
      formData.images.length === 0
    ) {
      alert("Please fill in all required fields.");
      return;
    }

    if (
      isNaN(Number(formData.price)) ||
      isNaN(Number(formData.stock)) ||
      isNaN(Number(formData.shipping.cost)) ||
      isNaN(Number(formData.shipping.free_shipping_above)) ||
      isNaN(Number(formData.rating))
    ) {
      alert(
        "Please enter valid numbers for price, stock, rating, and shipping fields."
      );
      return;
    }

    const data = new FormData();
    data.append("name", formData.name);
    data.append("category", formData.category);
    data.append("subcategory", formData.subcategory);
    data.append("price", formData.price);
    data.append("description", formData.description);
    data.append("brand", formData.brand);
    data.append("stock", formData.stock);
    data.append("rating", formData.rating);
    data.append("supplier", JSON.stringify(formData.supplier));
    data.append("specifications", JSON.stringify(formData.specifications));
    data.append("shipping", JSON.stringify(formData.shipping));
    data.append("isFeatured", formData.isFeatured);
    formData.images.forEach((file) => data.append("images", file));

    try {
      const response = await axios.post(`${API_URL}/api/itemsb2c/add`, data, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (response.data.success) {
        alert("Item added successfully!");
        setFormData({
          name: "",
          category: "",
          subcategory: "",
          price: "",
          description: "",
          brand: "",
          stock: "",
          rating: "0",
          images: [],
          supplier: { name: "", location: "" },
          specifications: { material: "", height: "" },
          shipping: { free_shipping_above: "0", cost: "" },
          isFeatured: false,
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
      <h2>Add B2C Item</h2>
      <form onSubmit={handleSubmit}>
        <label>Name:</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleChange}
          required
        />

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

        <label>Subcategory:</label>
        <input
          type="text"
          name="subcategory"
          value={formData.subcategory}
          onChange={handleChange}
          required
        />

        <label>Price:</label>
        <input
          type="number"
          name="price"
          value={formData.price}
          onChange={handleChange}
          required
        />

        <label>Description:</label>
        <textarea
          name="description"
          value={formData.description}
          onChange={handleChange}
          required
        />

        <label>Brand:</label>
        <input
          type="text"
          name="brand"
          value={formData.brand}
          onChange={handleChange}
          required
        />

        <label>Stock:</label>
        <input
          type="number"
          name="stock"
          value={formData.stock}
          onChange={handleChange}
          required
        />

        <label>Rating:</label>
        <input
          type="number"
          name="rating"
          min="0"
          max="5"
          value={formData.rating}
          onChange={handleChange}
        />

        <label>Images:</label>
        <input
          type="file"
          name="images"
          multiple
          onChange={handleImageChange}
          required
        />

        <label>Supplier Name:</label>
        <input
          type="text"
          name="supplier.name"
          value={formData.supplier.name}
          onChange={handleNestedChange}
          required
        />

        <label>Supplier Location:</label>
        <input
          type="text"
          name="supplier.location"
          value={formData.supplier.location}
          onChange={handleNestedChange}
          required
        />

        <label>Material:</label>
        <input
          type="text"
          name="specifications.material"
          value={formData.specifications.material}
          onChange={handleNestedChange}
          required
        />

        <label>Height:</label>
        <input
          type="text"
          name="specifications.height"
          value={formData.specifications.height}
          onChange={handleNestedChange}
          required
        />

        <label>Free Shipping Above:</label>
        <input
          type="number"
          name="shipping.free_shipping_above"
          value={formData.shipping.free_shipping_above}
          onChange={handleNestedChange}
        />

        <label>Shipping Cost:</label>
        <input
          type="number"
          name="shipping.cost"
          value={formData.shipping.cost}
          onChange={handleNestedChange}
          required
        />

        <label>Featured:</label>
        <input
          type="checkbox"
          name="isFeatured"
          checked={formData.isFeatured}
          onChange={handleChange}
        />

        <button type="submit">Add Item</button>
      </form>
    </div>
  );
};

export default Add_b2c;
