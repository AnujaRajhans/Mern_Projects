import React, { useState } from 'react'
import { ToastContainer,toast } from 'react-toastify';
import {Form,Button,Alert,Container} from 'react-bootstrap';
import axios from "axios";
const AddCategory = () => {
    const [categoryname,setcategoryname]= useState("");
    const [error,seterror]  = useState(null);
    const [success,setsuccess] = useState(false);
    const handleSubmit = async (e) => {
      e.preventDefault();
      const token = localStorage.getItem("token");
      if (!token) {
        seterror("User is not authenticated");
        toast.error("User is not authenticated");
        return;
      }  
      try {
        await axios.post(
          "http://localhost:5001/api/addcategory",
          { categoryname },
          {
            headers: {
              Authorization: `Bearer ${token}`,
            },
          }
        );  
        setsuccess("Category added successfully!");
        toast.success("Category added successfully!");
        setcategoryname("");
        seterror(null);
      } catch (err) {
        seterror("Error adding category. Please try again.");
        toast.error("Error adding category. Please try again.");
        setsuccess(null);
      }
    }; 
    const handleDismiss = () => {
      seterror(null);
      setsuccess(null);
    };
  return (
    <Container>
      <h2>Add Category</h2>
      <Form onSubmit={handleSubmit}>
        <Form.Group controlId="categoryName">
          <Form.Label>Category Name</Form.Label>
          <Form.Control
            type="text"
            value={categoryname}
            onChange={(e) => setcategoryname(e.target.value)}
            required
          />
        </Form.Group>
        {error && (
          <Alert variant="danger" dismissible onClose={handleDismiss}>
            {error}
          </Alert>
        )}
        {success && (
          <Alert variant="success" dismissible onClose={handleDismiss}>
            {success}
          </Alert>
        )}
        <Button type="submit" className="mt-3">
          Add Category
        </Button>
      </Form>
      <ToastContainer />
    </Container>
  )
}

export default AddCategory
