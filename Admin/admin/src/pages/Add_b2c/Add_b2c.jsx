import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import './Add.css';

const AddB2C = () => {
  const url = "http://localhost:5000";
  const [formData, setFormData] = useState({
    name: '',
    category: '',
    subcategory: '',
    price: '',
    description: '',
    brand: '',
    stock: '',
    rating: 0,
    images: ['', '', '', '', ''],
    supplier: { name: '', location: '' },
    specifications: { material: '', height: '' },
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
        const response = await axios.get(`${url}/api/categories`);
        if (response.data.success) {
          setCategories(response.data.data);
        } else {
          setError('Failed to fetch categories');
          toast.error('Failed to fetch categories');
        }
      } catch (err) {
        setError('Error fetching categories');
        toast.error('Error fetching categories');
        console.error('Error fetching categories:', err);
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, [url]);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value,
    }));
  };

  const handleNestedChange = (e) => {
    const { name, value } = e.target;
    const [field, subField] = name.split('.');
    setFormData((prev) => ({
      ...prev,
      [field]: {
        ...prev[field],
        [subField]: value,
      },
    }));
  };

  const handleImageChange = (e, index) => {
    const { value } = e.target;
    const newImages = [...formData.images];
    newImages[index] = value;
    setFormData((prev) => ({
      ...prev,
      images: newImages,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.supplier.name || !formData.supplier.location) {
      toast.error('Supplier name and location are required.');
      return;
    }

    if (formData.images.some((img) => img && !/^https?:\/\/[^\s$.?#].[^\s]*$/.test(img))) {
      toast.error('All image URLs must be valid.');
      return;
    }

    const formDataToSend = {
      name: formData.name,
      category: formData.category,
      subcategory: formData.subcategory,
      price: formData.price,
      description: formData.description,
      brand: formData.brand,
      stock: formData.stock,
      rating: formData.rating,
      images: formData.images.filter((img) => img !== ''),
      supplier: formData.supplier,
      specifications: formData.specifications,
      shipping: formData.shipping,
      isFeatured: formData.isFeatured,
    };

    try {
      const response = await axios.post(`${url}/api/productsadd`, formDataToSend);
      if (response.data.success) {
        setFormData({
          name: '',
          category: '',
          subcategory: '',
          price: '',
          description: '',
          brand: '',
          stock: '',
          rating: 0,
          images: ['', '', '', '', ''],
          supplier: { name: '', location: '' },
          specifications: { material: '', height: '' },
          shipping: { free_shipping_above: 0, cost: 0 },
          isFeatured: false,
        });
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error('Error adding B2C item:', error);
      toast.error('Failed to add item. Please try again.');
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
            <p>B2C Category</p> {/* Updated label */}
            {loading ? (
              <p>Loading categories...</p>
            ) : error ? (
              <p style={{ color: 'red' }}>{error}</p>
            ) : (
              <select
                name="category"
                value={formData.category}
                onChange={handleChange}
                required
              >
                <option value="">Select B2C Category</option>
                {categories.map((cat, index) => (
                  <option key={index} value={cat.menu_item}>
                    {cat.menu_item}
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
          <p>Image URLs (up to 5)</p>
          {formData.images.map((image, index) => (
            <input
              key={index}
              type="text"
              value={image}
              onChange={(e) => handleImageChange(e, index)}
              placeholder={`Image URL ${index + 1}`}
            />
          ))}
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

        <button type="submit" className="add-btn">Add B2C Item</button>
      </form>
    </div>
  );
};

export default AddB2C;