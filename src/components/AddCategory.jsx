import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import leftarr from '../assets/leftArr.png';
import group from '../assets/Group.png';

function AddCategory() {
  const [categoryName, setCategoryName] = useState('');
  const navigate = useNavigate();

  const handleInputChange = (e) => {
    setCategoryName(e.target.value);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:5000/api/categories', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name: categoryName, status: 'active' }),
      });

      if (response.ok) {
        alert('Category added successfully');
        navigate('/dashboard/category'); // Navigate back to the category dashboard
      } else {
        const errorData = await response.json();
        alert('Error adding category: ' + errorData.error);
      }
    } catch (error) {
      alert('Error adding category: ' + error.message);
    }
  };

  return (
    <div className="addSubCatMain">
      <div className="row1">
        <Link to="/dashboard/category">
          <img src={leftarr} alt="" />
        </Link>
        <img src={group} alt="" />
        <span>Add Category</span>
      </div>

      <div className="row2">
        <div className="inputContainer">
          <label htmlFor="category">Category Name</label>
          <input
            type="text"
            id="category"
            className="styled-input"
            placeholder=""
            value={categoryName}
            onChange={handleInputChange}
          />
        </div>
      </div>

      <div className="addSubCatBottom">
        <button id="btn1" onClick={handleSubmit}>Save</button>
        <button id="btn2" onClick={() => navigate('/dashboard/category')}>Cancel</button>
      </div>
    </div>
  );
}

export default AddCategory;
