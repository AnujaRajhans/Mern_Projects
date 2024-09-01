import React, { useState } from 'react'
import axios from 'axios';
import { useEffect } from 'react';
function AddProduct() {
  const [productname, setProductname] = useState("");
  const [image, setImage] = useState(null);
  const [price, setPrice] = useState("");
  const [available, setAvailable] = useState("true");
  const [quantity, setQuantity] = useState("");
  const [categories, setCategories] = useState([]);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  useEffect(() => {
    const fetchCategories = async () => {
      const token = localStorage.getItem("token");
      if (!token) {
        setError("No token found.");
        return;
      }
      try {
        const response = await axios.get(
          "http://localhost:5001/api/getcategory",
          {
            headers: { Authorization: `Bearer ${token}` },
          }
        );
        console.log("res data", response.data);
        if (response.data && response.data.category) {
          setCategories(response.data.category);
        } else {
          setError("No categories found.");
        }
      } catch (err) {
        console.error(
          "Error fetching categories:",
          err.response ? err.response.data : err.message
        );
        setError(
          "Error fetching categories. Please check the console for more details."
        );
      }
    };

    fetchCategories();
  }, []);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");
    if (!token) {
      setError("User is not authenticated.");
      return;
    }
        const formData = new FormData();
        formData.append('name', productname);
        formData.append('image', image);
        formData.append('category', categories);
        formData.append('price', price);
        formData.append('available', available);
        formData.append('quantity', quantity);
        try {
            await axios.post('http://localhost:5001/api/addproduct', formData, {
              headers: {
                Authorization: `Bearer ${token}`,
                'Content-Type': 'multipart/form-data',
              },
            });      
            setSuccess('Product added successfully!');
            setProductname('');
            setImage(null);
            setCategories('');
            setPrice('');
            setAvailable(true);
            setQuantity('');
            setError(null);
          } catch (err) {
            setError('Error adding product. Please try again.');
            setSuccess(null);
          }
        };      
        const handleDismiss = () => {
          setError(null);
          setSuccess(null);
        };
        return (<div className="container">
            <h2>Add Product</h2>
            <form onSubmit={handleSubmit}>
              <div className="form-group">
                <label htmlFor="productName">Product Name</label>
                <input
                  type="text"
                  className="form-control"
                  id="productName"
                  value={productname}
                  onChange={(e) => setProductname(e.target.value)}
                  required
                />
              </div>      
              <div className="form-group">
                <label htmlFor="productImage">Product Image</label>
                <input
                  type="file"
                  className="form-control"
                  id="productImage"
                  onChange={(e) => setImage(e.target.files[0])}
                />
              </div>      
              <div className="form-group">
                <label htmlFor="productCategory">Category</label>
                <select
                  className="form-control"
                  id="productCategory"
                  value={categories}
                  onChange={(e) => setCategories(e.target.value)}
                  required
                >
                  <option value="">Select a category</option>
                    {categories.map((cat) => (
                    <option key={cat._id} value={cat._id}>
                    {cat.categoryname}
                  </option>
                  ))}
                </select>
              </div>
              <div className="form-group">
                <label htmlFor="productPrice">Price</label>
                <input
                  type="number"
                  className="form-control"
                  id="productPrice"
                  value={price}
                  onChange={(e) => setPrice(e.target.value)}
                  required
                />
              </div>     
              <div className="form-group">
                <label htmlFor="productAvailable">Available</label>
                <select
                  className="form-control"
                  id="productAvailable"
                  value={available}
                  onChange={(e) => setAvailable(e.target.value === 'true')}
                  required
                >
                  <option value="true">Yes</option>
                  <option value="false">No</option>
                </select>
              </div>      
              <div className="form-group">
                <label htmlFor="productQuantity">Quantity</label>
                <input
                  type="number"
                  className="form-control"
                  id="productQuantity"
                  value={quantity}
                  onChange={(e) => setQuantity(e.target.value)}
                  required
                />
              </div>
              {error && (
                <div className="alert alert-danger alert-dismissible fade show" role="alert">
                  {error}
                  <button
                    type="button"
                    className="close"
                    onClick={handleDismiss}
                    aria-label="Close"
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
              )}
              {success && (
                <div className="alert alert-success alert-dismissible fade show" role="alert">
                  {success}
                  <button
                    type="button"
                    className="close"
                    onClick={handleDismiss}
                    aria-label="Close"
                  >
                    <span aria-hidden="true">&times;</span>
                  </button>
                </div>
              )}     
              <button type="submit" className="btn btn-primary mt-3">
                Add Product
              </button>
            </form>
          </div>
          )
}


export default AddProduct;