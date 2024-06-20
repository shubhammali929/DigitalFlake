import React, { useEffect, useState } from 'react';
import axios from 'axios';
import edit from '../assets/edit.png';
import { Link } from 'react-router-dom';

function SubCategory() {
  const [subcategories, setSubcategories] = useState([]);
  const [categories, setCategories] = useState([]);
  const [showPopup, setShowPopup] = useState(false);
  const [subcategoryToDelete, setSubcategoryToDelete] = useState(null);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/categories');
        setCategories(response.data);
      } catch (error) {
        console.error('Error fetching categories:', error.message);
      }
    };

    const fetchSubcategories = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/subcategories');
        setSubcategories(response.data);
      } catch (error) {
        console.error('Error fetching subcategories:', error.message);
      }
    };

    fetchCategories();
    fetchSubcategories();
  }, []);

  const handleDeleteClick = (subcategory) => {
    setSubcategoryToDelete(subcategory);
    setShowPopup(true);
  };

  const handleConfirmDelete = async () => {
    if (subcategoryToDelete) {
      try {
        await axios.patch(`http://localhost:5000/api/subcategories/${subcategoryToDelete._id}/status`);
        setSubcategories(subcategories.map(subcat =>
          subcat._id === subcategoryToDelete._id ? { ...subcat, status: 'inactive' } : subcat
        ));
        setShowPopup(false);
        setSubcategoryToDelete(null);
      } catch (error) {
        console.error('Error updating subcategory status:', error.message);
      }
    }
  };

  const handleCancelDelete = () => {
    setShowPopup(false);
    setSubcategoryToDelete(null);
  };

  const getCategoryName = (categoryId) => {
    const category = categories.find(cat => cat._id === categoryId);
    return category ? category.name : 'Unknown Category';
  };

  return (
    <div className="categoryMain">
      <div className="categoryHead">
        <img src="https://img.icons8.com/?size=160&id=cksgiVxzNe4j&format=png" alt="" />
        <span>Sub-Category</span>
        <input type="text" placeholder="Search ..." />
        <button><Link to="/dashboard/addsubcategory">Add new</Link></button>
      </div>
      <br />
      <div className="categoryData">
        <table className="table">
          <thead>
            <tr>
              <th scope="col">Id</th>
              <th scope="col">Category</th>
              <th scope="col">Subcategory</th>
              <th scope="col">Status</th>
              <th scope="col">Action</th>
            </tr>
          </thead>
          <tbody>
            {subcategories.map((subcategory) => (
              <tr key={subcategory._id}>
                <td className="productrow">{subcategory._id}</td>
                <td className="productrow">{getCategoryName(subcategory.category)}</td>
                <td className="productrow">{subcategory.name}</td>
                <td className="productrow">{subcategory.status}</td>
                <td className="productrow" style={{display:"flex"}}>
                  <img className="editIcon" src={edit} alt="EDITICON" />
                </td>
                <td className="productrow">
                  <img
                    className="editIcon"
                    src="https://img.icons8.com/?size=48&id=99961&format=png"
                    alt="DELETEICON"
                    onClick={() => handleDeleteClick(subcategory)}
                  />
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

export default SubCategory;
