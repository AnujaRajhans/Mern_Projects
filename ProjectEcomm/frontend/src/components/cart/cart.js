import React from 'react'
import { useEffect,useState } from 'react';
import { Card,Button } from 'react-bootstrap';
import axios from "axios";
function Cart() {
    const [products,setProducts] = useState([]);
    useEffect(() => {
      const getProducts = async () => {
          const token = localStorage.getItem('token');
          try {
              const response = await axios.get("http://localhost:5001/api/getproduct", {
                  headers: {
                      'Authorization': `Bearer ${token}`
                  }
              });
              console.log("response.data", response.data);
  
              // Check if response.data is an array
              if (Array.isArray(response.data)) {
                  setProducts(response.data);
              } else {
                  console.error("Expected an array but got:", response.data);
              }
          } catch (error) {
              console.error("Error fetching products", error);
          }
      }
      getProducts();
  }, []);
  
  return (
    <div className="container mt-5 d-flex flex-wrap justify-content-around">
    {products.map((product) => (
      <Card key={product._id} style={{ width: "18rem", margin: "10px" }}>
        <Card.Img
          variant="top"
          src={
            product.image
              ? product.image
              : "http://localhost:5001/uploads/default-image.jpg"
          }
          alt={product.productname}
        />
        <Card.Body>
          <Card.Title>{product.productname}</Card.Title>
          <Card.Text>{product.description}</Card.Text>
          <Card.Text>Quantity: {product.quantity}</Card.Text>
          <Button variant="primary">${product.price}</Button>
        </Card.Body>
      </Card>
    ))}
  </div>
  )
}

export default Cart
