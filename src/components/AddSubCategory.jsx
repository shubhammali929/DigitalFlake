import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import leftarr from '../assets/leftArr.png';
import list from '../assets/list.png';

function AddSubCategory() {
  const [categories, setCategories] = useState([]);
  const [subcategoryName, setSubcategoryName] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('');
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchCategories() {
      try {
        const response = await fetch('http://localhost:5000/api/categories');
        const data = await response.json();
        setCategories(data);
      } catch (error) {
        console.error('Error fetching categories:', error);
      }
    }
    fetchCategories();
  }, []);

  const handleInputChange = (e) => {
    setSubcategoryName(e.target.value);
  };

  const handleSelectChange = (e) => {
    setSelectedCategory(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/subcategories', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: subcategoryName, category_id: selectedCategory }),
      });

      if (response.ok) {
        alert('Subcategory added successfully');
        navigate('/dashboard/subcategory'); // Navigate back to the subcategory dashboard
      } else {
        const errorData = await response.json();
        alert('Error adding subcategory: ' + errorData.error);
      }
    } catch (error) {
      alert('Error adding subcategory: ' + error.message);
    }
  };

  return (
    <div className="addSubCatMain">
      <div className="row1">
        <Link to="/dashboard/subcategory">
          <img src={leftarr} alt="" />
        </Link>
        <img src={list} alt="" />
        <span>Add Sub Category</span>
      </div>

      <form onSubmit={handleSubmit}>
        <div className="row2">
          <div className="inputContainer">
            <label htmlFor="subcategory">Sub Category</label>
            <input
              type="text"
              id="subcategory"
              className="styled-input"
              placeholder=""
              value={subcategoryName}
              onChange={handleInputChange}
            />
          </div>
          <div className="inputContainer catdropdown">
            <label htmlFor="category">Category</label>
            <select
              name="category"
              className="styled-input"
              id="category"
              value={selectedCategory}
              onChange={handleSelectChange}
            >
              <option value="" disabled>Select Category</option>
              {categories.map((category) => (
                <option key={category._id} value={category._id}>{category.name}</option>
              ))}
            </select>
          </div>
        </div>

        
        
        <div className="addSubCatBottom">
          <button type="submit" id="btn1">Save</button>
          <button type="button" id="btn2" onClick={() => navigate('/dashboard/subcategory')}>Cancel</button>
        </div>
      </form>
    </div>
  );
}

export default AddSubCategory;
