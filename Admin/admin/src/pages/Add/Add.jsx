import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { toast } from 'react-toastify';
import './Add.css';

const Add = () => {
  const url = "http://localhost:5000";
  const [images, setImages] = useState([]);
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    category: '',
    product_category: '',
    price_per_piece: { '20-199': 0, '200-999': 0, '1000+': 0 },
    MOQ: '',
    specifications: {
      description: '',
      weight: '',
      dimensions: [],
      material: '',
      color_temperature: [],
      input_voltage: '',
      type: [],
      rated_current: [],
      length: [],
      wire_type: '',
      plug_type: '',
      power: [],
      phase: '',
      thickness: [],
      sizes: [],
      grades: [],
      colors: [],
      packaging: [],
      strength: []
    },
    supplier: { name: '', location: '' },
    shipping: { free_shipping_above: 0, cost: 0 },
    b2b_menu: '',
    images: []
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
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value
    }));
  };

  const handleNestedChange = (e) => {
    const { name, value } = e.target;
    const [field, subField] = name.split('.');
    setFormData((prev) => ({
      ...prev,
      [field]: {
        ...prev[field],
        [subField]: value
      }
    }));
  };

  const handleSpecChange = (e) => {
    const { name, value } = e.target;
    const arrayFields = [
      'dimensions',
      'color_temperature',
      'type',
      'rated_current',
      'length',
      'power',
      'thickness',
      'sizes',
      'grades',
      'colors',
      'packaging',
      'strength'
    ];

    setFormData((prev) => ({
      ...prev,
      specifications: {
        ...prev.specifications,
        [name]: arrayFields.includes(name)
          ? value ? value.split(',').map(item => item.trim()) : []
          : value
      }
    }));
  };

  const handlePriceChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      price_per_piece: {
        ...prev.price_per_piece,
        [name]: Number(value)
      }
    }));
  };

  const handleImageChange = (e, index) => {
    const file = e.target.files[0];
    if (file) {
      const newImages = [...images];
      newImages[index] = file;
      setImages(newImages);

      const newFormDataImages = [...formData.images];
      newFormDataImages[index] = file;
      setFormData((prev) => ({
        ...prev,
        images: newFormDataImages
      }));
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!formData.supplier.name || !formData.supplier.location) {
      toast.error('Supplier name and location are required.');
      return;
    }

    const formDataToSend = new FormData();
    formDataToSend.append("category", formData.b2b_menu);

    for (let key in formData) {
      if (key === 'price_per_piece') {
        formDataToSend.append(`price_per_piece[20-199]`, formData.price_per_piece['20-199']);
        formDataToSend.append(`price_per_piece[200-999]`, formData.price_per_piece['200-999']);
        formDataToSend.append(`price_per_piece[1000+]`, formData.price_per_piece['1000+']);
      } else if (key === 'supplier') {
        formDataToSend.append('supplier_name', formData.supplier.name);
        formDataToSend.append('supplier_location', formData.supplier.location);
      } else if (key === 'shipping') {
        formDataToSend.append('free_shipping_above', formData.shipping.free_shipping_above);
        formDataToSend.append('shipping_cost', formData.shipping.cost);
      } else if (key === 'specifications') {
        formDataToSend.append('specifications', JSON.stringify(formData.specifications));
      } else if (key === 'images') {
        formData.images.forEach((image, index) => {
          if (image instanceof File) {
            formDataToSend.append(`image${index}`, image);
          }
        });
      } else if (key !== 'b2b_menu') {
        formDataToSend.append(key, formData[key]);
      }
    }

    try {
      const response = await axios.post(`${url}/api/items`, formDataToSend, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      if (response.data.success) {
        setFormData({
          id: '',
          name: '',
          category: '',
          product_category: '',
          price_per_piece: { '20-199': 0, '200-999': 0, '1000+': 0 },
          MOQ: '',
          specifications: {
            description: '',
            weight: '',
            dimensions: [],
            material: '',
            color_temperature: [],
            input_voltage: '',
            type: [],
            rated_current: [],
            length: [],
            wire_type: '',
            plug_type: '',
            power: [],
            phase: '',
            thickness: [],
            sizes: [],
            grades: [],
            colors: [],
            packaging: [],
            strength: []
          },
          supplier: { name: '', location: '' },
          shipping: { free_shipping_above: 0, cost: 0 },
          b2b_menu: '',
          images: []
        });
        setImages([]);
        toast.success(response.data.message);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      console.error('Error adding item:', error);
      toast.error('Failed to add item. Please try again.');
    }
  };

  return (
    <div className="add">
      <form className="flex-col" onSubmit={handleSubmit}>
        <div className="add-img flex-col">
          <p>Upload Images (up to 5)</p>
          <div className="image-upload-grid">
            {[...Array(5)].map((_, index) => (
              <div key={index} className="image-upload-slot">
                <label htmlFor={`image-${index}`}>
                  <img
                    src={
                      images[index]
                        ? URL.createObjectURL(images[index])
                        : 'https://via.placeholder.com/120?text=Upload+Image'
                    }
                    alt={`Upload Preview ${index + 1}`}
                    style={{ width: '120px', height: '120px', objectFit: 'cover' }}
                  />
                </label>
                <input
                  type="file"
                  id={`image-${index}`}
                  accept="image/*"
                  onChange={(e) => handleImageChange(e, index)}
                  hidden
                />
              </div>
            ))}
          </div>
        </div>

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

        <div className="add-name flex-col">
          <p>Product ID</p>
          <input
            type="number"
            name="id"
            value={formData.id}
            onChange={handleChange}
            placeholder="Enter ID"
            required
          />
        </div>

        <div className="add-category-price">
          <div className="add-category flex-col">
            <p>B2B Category</p>
            {loading ? (
              <p>Loading categories...</p>
            ) : error ? (
              <p style={{ color: 'red' }}>{error}</p>
            ) : (
              <select
                name="b2b_menu"
                value={formData.b2b_menu}
                onChange={handleChange}
                required
              >
                <option value="">Select Category</option>
                {categories.map((cat, index) => (
                  <option key={index} value={cat.menu_item}>
                    {cat.menu_item}
                  </option>
                ))}
              </select>
            )}
          </div>

          <div className="add-category flex-col">
            <p>Product Category</p>
            <input
              type="text"
              name="product_category"
              value={formData.product_category}
              onChange={handleChange}
              placeholder="Type here"
              required
            />
          </div>
        </div>

        <div className="add-category-price">
          <div className="add-price flex-col">
            <p>Price (20-199 units)</p>
            <input
              type="number"
              name="20-199"
              value={formData.price_per_piece['20-199']}
              onChange={handlePriceChange}
              placeholder="Enter price"
              required
            />
          </div>
          <div className="add-price flex-col">
            <p>Price (200-999 units)</p>
            <input
              type="number"
              name="200-999"
              value={formData.price_per_piece['200-999']}
              onChange={handlePriceChange}
              placeholder="Enter price"
              required
            />
          </div>
          <div className="add-price flex-col">
            <p>Price (1000+ units)</p>
            <input
              type="number"
              name="1000+"
              value={formData.price_per_piece['1000+']}
              onChange={handlePriceChange}
              placeholder="Enter price"
              required
            />
          </div>
        </div>

        <div className="add-name flex-col">
          <p>MOQ (Minimum Order Quantity)</p>
          <input
            type="number"
            name="MOQ"
            value={formData.MOQ}
            onChange={handleChange}
            placeholder="Enter MOQ"
            required
          />
        </div>

        <h3>Product Information</h3>

        <div className="add-category-price">
          <div className="add-name flex-col">
            <p>Field 1</p>
            <input
              type="text"
              name="description"
              value={formData.specifications.description}
              onChange={handleSpecChange}
              placeholder=""
            />
          </div>
          <div className="add-name flex-col">
            <p>Field 2</p>
            <input
              type="text"
              name="weight"
              value={formData.specifications.weight}
              onChange={handleSpecChange}
              placeholder=""
            />
          </div>
        </div>

        <div className="add-category-price">
          <div className="add-name flex-col">
            <p>Field 3</p>
            <input
              type="text"
              name="dimensions"
              value={formData.specifications.dimensions.join(', ')}
              onChange={handleSpecChange}
              placeholder=""
            />
          </div>
          <div className="add-name flex-col">
            <p>Field 4</p>
            <input
              type="text"
              name="material"
              value={formData.specifications.material}
              onChange={handleSpecChange}
              placeholder=""
            />
          </div>
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

        <button type="submit" className="add-btn">Add Item</button>
      </form>
    </div>
  );
};

export default Add;