import React, { useEffect, useState } from 'react';
import axios from 'axios';
import edit from '../assets/edit.png';
import { Link } from 'react-router-dom';

function Category() {
  const [categories, setCategories] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [categoryToDelete, setCategoryToDelete] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/categories');
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error.message);
      }
    };

    fetchCategories();
  }, []);

  const handleDeleteClick = (category) => {
    setCategoryToDelete(category);
    setShowPopup(true);
  };

  const handleConfirmDelete = async () => {
    if (categoryToDelete) {
      try {
        await axios.patch(`http://localhost:5000/api/categories/${categoryToDelete._id}/status`);
        setCategories(categories.map(category =>
          category._id === categoryToDelete._id ? { ...category, status: 'inactive' } : category
        ));
        setShowPopup(false);
        setCategoryToDelete(null);
      } catch (error) {
        console.error('Error updating category status:', error.message);
      }
    }
  };

  const handleCancelDelete = () => {
    setShowPopup(false);
    setCategoryToDelete(null);
  };

  return (
    <div className="categoryMain">
      <div className="categoryHead">
        <img src="https://img.icons8.com/?size=48&id=2bbPBbZvbi8l&format=png" alt="" />
        <span>Category</span>
        <input type="text" placeholder="Search ..." />
        <button><Link to="/dashboard/addcategory">Add new</Link></button>
      </div>
      <br />
      <div className="categoryData">
        <table border="1" style={{width:"100%"}}>
          <thead>
            <tr>
              <th>Id</th>
              <th>Category name</th>
              <th>Status</th>
              <th colSpan="2">Action</th>
            </tr>
          </thead>
          <tbody>
            {categories.map((category) => (
              <tr key={category._id}>
                <td className="productrow">{category._id}</td>
                <td className="productrow">{category.name}</td>
                <td className="productrow">{category.status}</td>
                <td className="productrow"><img className="editIcon" src={edit} alt="EDITICON" /></td>
                <td className="productrow" onClick={() => handleDeleteClick(category)}>
                  <img className="editIcon" src="https://img.icons8.com/?size=48&id=99961&format=png" alt="DELETEICON" />
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>

      {showPopup && (
        <div className="popup">
          <div className="popup-inner">
            <h2>Are you sure you want to delete this item?</h2>
            <button onClick={handleConfirmDelete}>Yes</button>
            <button onClick={handleCancelDelete}>No</button>
          </div>
        </div>
      )}
    </div>
  );
}

export default Category;
