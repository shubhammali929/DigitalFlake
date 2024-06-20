import React from 'react';
import { Route, Routes } from 'react-router-dom';
import Actionbar from './Actionbar';
import Home from './Home';
import Category from './Category';
import SubCategory from './SubCategory';
import AddProducts from './AddProducts';
import EditSubCategory from './EditSubCategory';
import AddSubCategory from './AddSubCategory';
import ViewProducts from './ViewProducts';
import AddCategory from './AddCategory';

function Dashboard() {
  return (
    <div className="dashboard">
      <Actionbar/>
      <div className="content">
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="home" element={<Home />} />
          <Route path="category" element={<Category />} />
          <Route path="subcategory" element={<SubCategory />} />
          <Route path="editproducts" element={<AddProducts />} />
          <Route path="addsubcategory" element={<AddSubCategory/>} />
          <Route path="editsubcategory" element={<EditSubCategory/>} />
          <Route path="viewproducts" element={<ViewProducts/> } />
          <Route path="addcategory" element={<AddCategory/>} />
          
        </Routes>
      </div>
    </div>
  );
}

export default Dashboard;
