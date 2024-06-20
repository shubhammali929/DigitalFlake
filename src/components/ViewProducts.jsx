import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import product from '../assets/product.png';
import delimg from '../assets/delete.png'
import edit from '../assets/edit.png'
function ViewProducts() {
  const [products, setProducts] = useState([]);

  // Fetch products from the backend
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/products');
        setProducts(response.data);
      } catch (error) {
        console.error('Error fetching products:', error.message);
      }
    };

    fetchProducts();
  }, []);

  return (
    <div>
      <div className="categoryHead">
        <img src={product} alt="" />
        <span>Products</span>
        <input type="text" placeholder="Search ..."/>
        <button><Link to="/dashboard/editproducts">Add new</Link></button>
      </div>
      <br />
      <h2>View Products</h2>
      <table className="w100 productTable">
        <thead>
          <tr>
            <th>Name</th>
            <th>Category</th>
            <th>Subcategory</th>
            <th>Status</th>
            <th>Action</th>
          </tr>
        </thead>
        <tbody>
          {products.map((product) => (
            <tr key={product._id}>
              <td className="productrow">{product.name}</td>
              <td className="productrow">{product.category?.name}</td>
              <td className="productrow">{product.subcategory?.name}</td>
              <td className="productrow">{product.status}</td>
              <td className="editIcon productrow" >
                <img src={edit} alt="Edit" />
                <img src={delimg} alt="" />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default ViewProducts;
