import React from 'react';
import { Link } from 'react-router-dom';
import home from '../assets/home.png'
import group from '../assets/Group.png'
import list from '../assets/list.png'
import product from '../assets/product.png'

function Actionbar() {
  return (
    <div className='actionbarMain'>
        <div className="actionCategory action1">
            <img src={home} alt="" />
            <p><Link to="/dashboard/home">Home</Link></p>
        </div>
        <div className="actionCategory action2">
            <img src={group} alt="" />
            <p><Link to="/dashboard/category">Category</Link></p>
        </div>
        <div className="actionCategory action3">
            <img src={list} alt="" />
            <p><Link to="/dashboard/subcategory">SubCategory</Link></p>
        </div>
        <div className="actionCategory action4">
            <img src={product} alt="" />
            <p ><Link to="/dashboard/viewproducts">Products</Link></p>
        </div>
    </div>
  );
}

export default Actionbar;
