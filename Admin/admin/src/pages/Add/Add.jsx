import React, { useState } from 'react';
import axios from 'axios';
import './Add.css';

const Add = () => {
  const [formData, setFormData] = useState({
    id: '',
    name: '',
    category: '',
    product_category: '',
    price_per_piece: { '20-199': 0, '200-999': 0, '1000+': 0 },
    MOQ: '',
    specifications: {},
    images: [''],
    supplier: { name: '', location: '' },
    shipping: { free_shipping_above: 0, cost: 0 },
    b2b_menu: '' // For category selection
  });

  const categories = [
    { menu_item: 'ElectricalMaterial', menu_img: 'https://images.pexels.com/photos/373543/pexels-photo-373543.jpeg' },
    { menu_item: 'IndustrialMaterial', menu_img: 'https://images.pexels.com/photos/5371455/pexels-photo-5371455.jpeg' },
    { menu_item: 'Fabric', menu_img: 'https://images.pexels.com/photos/2899611/pexels-photo-2899611.jpeg' }
  ];

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

  const handleImageChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      images: [e.target.files[0]] // Store the file object
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
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
      } else if (key === 'images' && formData.images[0] instanceof File) {
        formDataToSend.append('image', formData.images[0]);
      } else {
        formDataToSend.append(key, formData[key]);
      }
    }

    try {
      await axios.post('http://localhost:5000/api/items', formDataToSend, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      alert('Item added successfully!');
      setFormData({
        id: '',
        name: '',
        category: '',
        product_category: '',
        price_per_piece: { '20-199': 0, '200-999': 0, '1000+': 0 },
        MOQ: '',
        specifications: {},
        images: [''],
        supplier: { name: '', location: '' },
        shipping: { free_shipping_above: 0, cost: 0 },
        b2b_menu: ''
      });
    } catch (error) {
      console.error('Error adding item:', error);
      alert('Failed to add item.');
    }
  };

  return (
    <div className="admin-container">
      <h1>Admin Panel - Add B2B Item</h1>
      <form onSubmit={handleSubmit}>
        <div>
          <label>B2B Category:</label>
          <select name="b2b_menu" value={formData.b2b_menu} onChange={handleChange} required>
            <option value="">Select Category</option>
            {categories.map((cat, index) => (
              <option key={index} value={cat.menu_item}>{cat.menu_item}</option>
            ))}
          </select>
        </div>
        <div>
          <label>ID:</label>
          <input type="number" name="id" value={formData.id} onChange={handleChange} required />
        </div>
        <div>
          <label>Name:</label>
          <input type="text" name="name" value={formData.name} onChange={handleChange} required />
        </div>
        <div>
          <label>Product Category:</label>
          <input type="text" name="product_category" value={formData.product_category} onChange={handleChange} required />
        </div>
        <div>
          <label>Price (20-199):</label>
          <input type="number" name="20-199" value={formData.price_per_piece['20-199']} onChange={handlePriceChange} required />
        </div>
        <div>
          <label>Price (200-999):</label>
          <input type="number" name="200-999" value={formData.price_per_piece['200-999']} onChange={handlePriceChange} required />
        </div>
        <div>
          <label>Price (1000+):</label>
          <input type="number" name="1000+" value={formData.price_per_piece['1000+']} onChange={handlePriceChange} required />
        </div>
        <div>
          <label>MOQ:</label>
          <input type="number" name="MOQ" value={formData.MOQ} onChange={handleChange} required />
        </div>
        <div>
          <label>Image:</label>
          <input type="file" name="image" onChange={handleImageChange} required />
        </div>
        <div>
          <label>Supplier Name:</label>
          <input type="text" name="supplier.name" value={formData.supplier.name} onChange={handleNestedChange} required />
        </div>
        <div>
          <label>Supplier Location:</label>
          <input type="text" name="supplier.location" value={formData.supplier.location} onChange={handleNestedChange} required />
        </div>
        <div>
          <label>Shipping Cost:</label>
          <input type="number" name="shipping.cost" value={formData.shipping.cost} onChange={handleNestedChange} required />
        </div>
        <button type="submit">Add Item</button>
      </form>
    </div>
  );
};

export default Add;