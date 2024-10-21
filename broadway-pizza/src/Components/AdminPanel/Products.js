import React, { useEffect, useState } from 'react';
import Sidebar from './Sidebar';
import Topbar from './Topbar';
import axios from 'axios';
import SearchImg from '../../images/search.svg'
import { toast, ToastContainer } from 'react-toastify';
import DeleteImg from '../../images/delete.svg'
import '../AdminPanel/AdminPanel.css'
import Footer from './Footer';

const Products = () => {
  const [products, setProducts] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [allProducts, setAllProducts] = useState([]);
  const [showForm, setShowForm] = useState(false); // State for showing the form
  const [newProduct, setNewProduct] = useState({
    id: '',
    name: '',
    image: '',
    price: ''
  });

  const displayProducts = async () => {
    let result = await axios.get('http://localhost:5000/ourProducts');
    setProducts(result.data);
    setAllProducts(result.data);
  };

  useEffect(() => {
    displayProducts();
  }, []);

  const handleChange = (e) => {
    let text = e.target.value;
    setSearchTerm(text);
    if (text.trim() === '') {
      setProducts(allProducts);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (searchTerm.trim() === '') {
      setProducts(allProducts); 
    } else {
      const filterItem = allProducts.filter((v) => 
        v.name.toLowerCase().includes(searchTerm.toLowerCase()) 
      );
      setProducts(filterItem);
    }
  };

  const handleNewProductChange = (e) => {
    const { name, value } = e.target;
    setNewProduct((prevProduct) => ({
      ...prevProduct,
      [name]: value,
    }));
  };

  const handleAddProduct = async(e) => {
    e.preventDefault();
    setProducts([...products, newProduct]);
    setAllProducts([...allProducts, newProduct]);
    setNewProduct({ id: '', name: '', image: '', price: '' });
    
    let result = await axios.post('http://localhost:5000/products', newProduct)
    setAllProducts(result.data)
    setShowForm(false); 
    toast.success('Product added Successfully')
  };

  const handleDelete = async (id) => {
    try {
      await axios.delete(`http://localhost:5000/deleteProduct/${id}`);
      // Refresh the product list after deletion
      displayProducts();
      toast.success('Product deleted successfully');
    } catch (error) {
      console.error("Error deleting product:", error);
      toast.error('Failed to delete product');
    }
  };
  

  return (
    <>
    <ToastContainer/>
    <div className="admin-dashboard">
      <Sidebar />
      <div className="dashboard-content">
        <Topbar />
        <div className="main-content">
          <div>
            <h3>Products Section</h3>
            <p>Manage your products here.</p>
            <div className="d-flex justify-content-between my-4">
              <div className="input-group w-50" style={{fontSize: 'small'}}>
                <div className="form-outline" data-mdb-input-init>
                  <input 
                    type="search" 
                    name="searchTerm" 
                    onChange={handleChange} 
                    value={searchTerm} 
                    id="form1" 
                    className="form-control" 
                    style={{fontSize: 'small'}} 
                    placeholder="Search by Product Name..." 
                  />
                </div>
                <button 
                  type="button" 
                  className="btn btn-warning" 
                  onClick={handleSubmit} 
                  data-mdb-ripple-init
                >
                  <img src={SearchImg} alt="Search" />
                </button>
              </div>
              <button className="btn btn-warning" onClick={() => setShowForm(!showForm)}>
                {showForm ? 'Cancel' : 'Add a Product'}
              </button>
            </div>

            {/* Conditionally render the add product form */}
            {showForm && (
              <form onSubmit={handleAddProduct} className="add-product-form mb-4">
                <div className="form-group my-2">
                  <label>ID:</label>
                  <input 
                    type="text" 
                    name="id" 
                    value={newProduct.id} 
                    onChange={handleNewProductChange} 
                    className="form-control" 
                    required 
                  />
                </div>
                <div className="form-group my-2">
                  <label>Name:</label>
                  <input 
                    type="text" 
                    name="name" 
                    value={newProduct.name} 
                    onChange={handleNewProductChange} 
                    className="form-control" 
                    required 
                  />
                </div>
                <div className="form-group my-2">
                  <label>Image URL:</label>
                  <input 
                    type="text" 
                    name="image" 
                    value={newProduct.image} 
                    onChange={handleNewProductChange} 
                    className="form-control" 
                    required 
                  />
                </div>
                <div className="form-group my-2">
                  <label>Price:</label>
                  <input 
                    type="number" 
                    name="price" 
                    value={newProduct.price} 
                    onChange={handleNewProductChange} 
                    className="form-control" 
                    required 
                  />
                </div>
                <button type="submit" className="btn btn-success mt-3">Submit</button>
              </form>
            )}
          </div>

          <table className="productTable shadow">
            <thead>
              <tr>
                <th>ID</th>
                <th>Name</th>
                <th>Image</th>
                <th>Price</th>
                <th>Status</th>
                <th>Action</th>
              </tr>
            </thead>
            <tbody>
              {products.length > 0 ? (
                products.map((product) => (
                  <tr key={product._id || product.id}>
                    <td>{product.id}</td>
                    <td>{product.name}</td>
                    <td>
                      <img src={product.image} alt={product.name} className="productImage" />
                    </td>
                    <td>{product.price}Rs</td>
                    <td className={` text-success ${product.status === 'Available' ? 'available' : 'unavailable'}`}>
                      {product.status || 'Available'} {/* Default status to 'Available' */}
                    </td>
                    <td>
                         <img 
                           src={DeleteImg} 
                           onClick={() => handleDelete(product._id || product.id)} 
                           style={{cursor:'pointer'}}
                           alt="delete icon" 
                           data-toggle="tooltip" 
                          data-placement="bottom" 
                          title="Are you sure you want to delete this product?"
                          className="delete-icon"
                         />
                       </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="5" className="text-center">No data found</td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
      </div>
      
    </div>
    </>
  );
};

export default Products;
