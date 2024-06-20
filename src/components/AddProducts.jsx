import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import leftarr from '../assets/leftArr.png';
import products from '../assets/product.png';
import axios from 'axios';

function Products() {
  const [name, setName] = useState('');
  const [subcategory, setSubcategory] = useState('');
  const [category, setCategory] = useState('');
  const [status, setStatus] = useState('active'); // Default status
  const [categories, setCategories] = useState([]);
  const [subcategories, setSubcategories] = useState([]);

  // Fetch categories from the database
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const categoryResponse = await axios.get('http://localhost:5000/api/categories');
        setCategories(categoryResponse.data);
      } catch (error) {
        console.error('Error fetching categories:', error.message);
      }
    };

    fetchCategories();
  }, []);

  // Fetch subcategories based on the selected category
  useEffect(() => {
    const fetchSubcategories = async () => {
      try {
        if (category) {
          const subcategoryResponse = await axios.get(`http://localhost:5000/api/subcategories?category_id=${category}`);
          setSubcategories(subcategoryResponse.data);
        } else {
          setSubcategories([]);
        }
      } catch (error) {
        console.error('Error fetching subcategories:', error.message);
      }
    };

    fetchSubcategories();
  }, [category]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const newProduct = {
        name,
        subcategory,
        category,
        status,
      };

      const response = await axios.post('http://localhost:5000/api/products', newProduct, {
        headers: {
          'Content-Type': 'application/json',
        },
      });

      console.log('Product added:', response.data);
      setName('');
      setSubcategory('');
      setCategory('');
      setStatus('active');
      alert('Product uploaded successfully');
    } catch (error) {
      console.error('Error adding product:', error.message);
      alert('Failed to upload product');
    }
  };

  return (
    <div>
      <div className="row1">
        <Link to="/dashboard/viewproducts">
          <img src={leftarr} alt="" />
        </Link>
        <img src={products} alt="" />
        <span>Add New Product</span>
      </div>
      <hr />
      <form onSubmit={handleSubmit}>
        <div className="addproductfields">
          <div className="productNameField">
            <label>Name:</label>
            <input type="text" value={name} onChange={(e) => setName(e.target.value)} required />
          </div>
          <div>
            <label>Category:</label>
            <select value={category} onChange={(e) => setCategory(e.target.value)} required>
              <option value="">Select Category</option>
              {categories.map((cat) => (
                <option key={cat._id} value={cat._id}>
                  {cat.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label>Subcategory:</label>
            <select value={subcategory} onChange={(e) => setSubcategory(e.target.value)} required>
              <option value="">Select Subcategory</option>
              {subcategories.map((subcat) => (
                <option key={subcat._id} value={subcat._id}>
                  {subcat.name}
                </option>
              ))}
            </select>
          </div>
        </div>
        <div className="row2">
          <div>
            <label>Status:</label>
            <select value={status} onChange={(e) => setStatus(e.target.value)}>
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
        </div>
        <button className="productBtn" type="submit">Add Product</button>
      </form>
    </div>
  );
}

export default Products;
