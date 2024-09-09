
import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { Form, Button, Alert, Container } from 'react-bootstrap';
import axios from 'axios';

const AddCategory = () => {
  const [categoryname, setCategoryname] = useState("");
  const [error, setError] = useState(null);
  const [success, setSuccess] = useState(false);
  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem("token");

    if (!token) {
      setError("User is not authenticated");
      toast.error("User is not authenticated");
      return;
    }

    try {
      const response = await axios.post(
        "http://localhost:5001/api/addcategory",
        { categoryname },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setSuccess("Category added successfully!");
      toast.success("Category added successfully!");
      setCategoryname("");
      setError(null);
    } catch (err) {
      const errorMessage = err.response?.data?.message || "Error adding category. Please try again.";
      setError(errorMessage);
      toast.error(errorMessage);
      setSuccess(null);
    }
  };

  const handleDismiss = () => {
    setError(null);
    setSuccess(null);
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
            onChange={(e) => setCategoryname(e.target.value)}
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
  );
}

export default AddCategory;
