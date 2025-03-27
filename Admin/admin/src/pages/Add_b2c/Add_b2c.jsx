import React, { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import "./Add_b2c.css";

// Use environment variable for the API URL, with a fallback
const API_URL = import.meta.env.VITE_API_URL || "http://localhost:5000";

const Add = () => {
  const [formData, setFormData] = useState({
    name: "",
    category: "",
    subcategory: "",
    price: "",
    description: "",
    brand: "",
    stock: "",
    rating: 0,
    images: [],
    supplier: { name: "", location: "" },
    specifications: { material: "", height: "" },
    shipping: { free_shipping_above: 0, cost: 0 },
    isFeatured: false,
  });

  const [categories, setCategories] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      setLoading(true);
      try {
        const response = await axios.get(`${API_URL}/api/categoriesb2c`);
        if (response.data.success) {
          setCategories(response.data.data);
        } else {
          setError("Failed to fetch categories");
          toast.error("Failed to fetch categories");
        }
      } catch (err) {
        setError("Error fetching categories");
        toast.error("Error fetching categories");
        console.error("Error fetching categories:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
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
      [field]: {
        ...prev[field],
        [subField]: value,
      },
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

    // Validation based on schema
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
      !formData.shipping.cost
    ) {
      toast.error("All required fields must be filled.");
      return;
    }

    if (formData.images.length === 0) {
      toast.error("At least one image is required.");
      return;
    }

    if (isNaN(Number(formData.price)) || Number(formData.price) < 0) {
      toast.error("Price must be a valid number >= 0.");
      return;
    }

    if (isNaN(Number(formData.stock)) || Number(formData.stock) < 0) {
      toast.error("Stock must be a valid number >= 0.");
      return;
    }

    if (
      isNaN(Number(formData.rating)) ||
      Number(formData.rating) < 0 ||
      Number(formData.rating) > 5
    ) {
      toast.error("Rating must be a number between 0 and 5.");
      return;
    }

    if (
      isNaN(Number(formData.shipping.free_shipping_above)) ||
      Number(formData.shipping.free_shipping_above) < 0
    ) {
      toast.error("Free shipping above must be a valid number >= 0.");
      return;
    }

    if (
      isNaN(Number(formData.shipping.cost)) ||
      Number(formData.shipping.cost) < 0
    ) {
      toast.error("Shipping cost must be a valid number >= 0.");
      return;
    }

    // Create FormData object for file upload
    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name.trim());
    formDataToSend.append("category", formData.category);
    formDataToSend.append("subcategory", formData.subcategory.trim());
    formDataToSend.append("price", Number(formData.price));
    formDataToSend.append("description", formData.description.trim());
    formDataToSend.append("brand", formData.brand.trim());
    formDataToSend.append("stock", Number(formData.stock));
    formDataToSend.append("rating", Number(formData.rating));
    formData.images.forEach((image) => {
      formDataToSend.append("images", image);
    });
    formDataToSend.append(
      "supplier",
      JSON.stringify({
        name: formData.supplier.name.trim(),
        location: formData.supplier.location.trim(),
      })
    );
    formDataToSend.append(
      "specifications",
      JSON.stringify({
        material: formData.specifications.material.trim(),
        height: formData.specifications.height.trim(),
      })
    );
    formDataToSend.append(
      "shipping",
      JSON.stringify({
        free_shipping_above: Number(formData.shipping.free_shipping_above),
        cost: Number(formData.shipping.cost),
      })
    );
    formDataToSend.append("isFeatured", formData.isFeatured);

    try {
      const response = await axios.post(
        `${API_URL}/api/itemsb2c/addbtoc`,
        formDataToSend,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      if (response.data.success) {
        setFormData({
          name: "",
          category: "",
          subcategory: "",
          price: "",
          description: "",
          brand: "",
          stock: "",
          rating: 0,
          images: [],
          supplier: { name: "", location: "" },
          specifications: { material: "", height: "" },
          shipping: { free_shipping_above: 0, cost: 0 },
          isFeatured: false,
        });
        toast.success("Item added successfully!");
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error("Error adding item:", error);
      toast.error("Failed to add item. Please try again.");
    }
  };

  return (
    <div className="add">
      <form className="flex-col" onSubmit={handleSubmit}>
        <div className="add-name flex-col">
          <p>Product Name</p>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleChange}
            placeholder="Type here"
            required
          />
        </div>

        <div className="add-category-price">
          <div className="add-category flex-col">
            <p>Category</p>
            {loading ? (
              <p>Loading categories...</p>
            ) : error ? (
              <p style={{ color: "red" }}>{error}</p>
            ) : (
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
              >
                <option value="">Select Category</option>
                {categories.map((cat, index) => (
                  <option key={index} value={cat.name || cat.menu_item}>
                    {cat.name || cat.menu_item}
                  </option>
                ))}
              </select>
            )}
          </div>

          <div className="add-category flex-col">
            <p>Subcategory</p>
            <input
              type="text"
              name="subcategory"
              value={formData.subcategory}
              onChange={handleChange}
              placeholder="Type here"
              required
            />
          </div>
        </div>

        <div className="add-name flex-col">
          <p>Price</p>
          <input
            type="number"
            name="price"
            value={formData.price}
            onChange={handleChange}
            placeholder="Enter price"
            min="0"
            required
          />
        </div>

        <div className="add-name flex-col">
          <p>Description</p>
          <textarea
            name="description"
            value={formData.description}
            onChange={handleChange}
            placeholder="Type here"
            required
          />
        </div>

        <div className="add-name flex-col">
          <p>Brand</p>
          <input
            type="text"
            name="brand"
            value={formData.brand}
            onChange={handleChange}
            placeholder="Type here"
            required
          />
        </div>

        <div className="add-name flex-col">
          <p>Stock</p>
          <input
            type="number"
            name="stock"
            value={formData.stock}
            onChange={handleChange}
            placeholder="Enter stock"
            min="0"
            required
          />
        </div>

        <div className="add-name flex-col">
          <p>Rating (0-5)</p>
          <input
            type="number"
            name="rating"
            value={formData.rating}
            onChange={handleChange}
            min="0"
            max="5"
            placeholder="Enter rating"
          />
        </div>

        <div className="add-img flex-col">
          <p>Upload Images (at least 1 required)</p>
          <input
            type="file"
            name="images"
            onChange={handleImageChange}
            accept="image/*"
            multiple
          />
          {formData.images.length > 0 && (
            <p>{formData.images.length} image(s) selected</p>
          )}
        </div>

        <div className="add-category-price">
          <div className="add-name flex-col">
            <p>Supplier Name</p>
            <input
              type="text"
              name="supplier.name"
              value={formData.supplier.name}
              onChange={handleNestedChange}
              placeholder="Type here"
              required
            />
          </div>
          <div className="add-name flex-col">
            <p>Supplier Location</p>
            <input
              type="text"
              name="supplier.location"
              value={formData.supplier.location}
              onChange={handleNestedChange}
              placeholder="Type here"
              required
            />
          </div>
        </div>

        <div className="add-category-price">
          <div className="add-name flex-col">
            <p>Material</p>
            <input
              type="text"
              name="specifications.material"
              value={formData.specifications.material}
              onChange={handleNestedChange}
              placeholder="Type here"
              required
            />
          </div>
          <div className="add-name flex-col">
            <p>Height</p>
            <input
              type="text"
              name="specifications.height"
              value={formData.specifications.height}
              onChange={handleNestedChange}
              placeholder="Type here"
              required
            />
          </div>
        </div>

        <div className="add-category-price">
          <div className="add-price flex-col">
            <p>Free Shipping Above</p>
            <input
              type="number"
              name="shipping.free_shipping_above"
              value={formData.shipping.free_shipping_above}
              onChange={handleNestedChange}
              placeholder="Enter amount"
              min="0"
              required
            />
          </div>
          <div className="add-price flex-col">
            <p>Shipping Cost</p>
            <input
              type="number"
              name="shipping.cost"
              value={formData.shipping.cost}
              onChange={handleNestedChange}
              placeholder="Enter cost"
              min="0"
              required
            />
          </div>
        </div>

        <div className="add-name flex-col">
          <p>Featured Product</p>
          <label>
            <input
              type="checkbox"
              name="isFeatured"
              checked={formData.isFeatured}
              onChange={handleChange}
            />
            Yes
          </label>
        </div>

        <button type="submit" className="add-btn">
          Add Item
        </button>
      </form>
    </div>
  );
};

export default Add;
