import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import img from "../components/logo.png";
import axios from "axios";

const Register = () => {
  const navigate = useNavigate();
  const [error, setError] = useState("");

  const [formData, setFormData] = useState({
    name: "",
    dateOfBirth: "",
    email: "",
    mobileNo: "",
    password: "",
    reEnterPassword:"",
    aadhar: "",
    role: "User", // Default role set to 'User'
    profileImage: null
  });

  async function register(formData) {
    try {
      const response = await axios.post(
        "http://localhost:6001/api/user/register",
        formData, 
        {
          headers: {
            "Content-Type": "multipart/form-data", 
          },
        }
      );
      console.log("response.data", response.data);
      toast.success(response.data.message || "Registration Successful");
      navigate("/login");
    } catch (error) {
      toast.error(error.response?.data?.error || "Registration failed");
    }
  }

  const handleChange = (e) => {
    const { name, value, type, files } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: type === "file" ? files[0] : value,
    }));
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (formData.password !== formData.confirmpassword) {
      toast.error("Passwords do not match");
      setError("Passwords do not match");
    } else {
      setError(""); 
      const formDataToSubmit = new FormData();
      formDataToSubmit.append("Fname", formData.name);
      formDataToSubmit.append("DOB", formData.dateOfBirth);
      formDataToSubmit.append("Email", formData.email);
      formDataToSubmit.append("MobileNo", formData.mobileNo);
      formDataToSubmit.append("Password", formData.password);
      formDataToSubmit.append("AadharNo", formData.aadhar);
      formDataToSubmit.append("Role", formData.role);
      formDataToSubmit.append("DP", formData.profileImage); 
      try {
        await register(formDataToSubmit);
      } catch (error) {
        console.log("Registration failed");
      }
    }
  };

  return (
    <div className="hero">
      <div className="container">
        <div className="row align-items-center">
          {/* Left side - Image */}
          <div className="col-lg-6 d-none d-lg-block">
            <img
              src={img}
              alt="Person interacting with screens"
              className="img-fluid"
              style={{
                height:"550px",
                borderTopLeftRadius: ".25rem",
                borderBottomLeftRadius: ".25rem",
                height : "550px",
              }}
            />
          </div>

          {/* Right side - Form */}
          <div className="col-lg-6 p-5 text-white" style={{width:"450px"}}>
            <h2 className="text-center mb-2" id="reg">Register Form</h2>
            <form onSubmit={handleSubmit}>
              {/* First Name */}
              <div className="mb-3 text-white">
                <label htmlFor="Fname" className="form-label">
                  Name
                </label>
                <input
                  type="text"
                  className="form-control"
                  id="Fname"
                  name="Fname"
                  value={formData.name}
                  onChange={handleChange}
                  placeholder="Enter Name"
                  required
                />
              </div>

              {/* Date of Birth */}
              <div className="mb-3">
                <label htmlFor="DOB" className="form-label">Date of Birth</label>
                <input
                  type="date"
                  className="form-control"
                  id="DOB"
                  name="DOB"
                  value={formData.dateOfBirth}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Email */}
              <div className="mb-3">
                <label htmlFor="Email" className="form-label">Email address</label>
                <input
                  type="email"
                  className="form-control"
                  id="Email"
                  name="Email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Mobile No */}
              <div className="mb-3">
                <label htmlFor="MobileNo" className="form-label">Mobile No.</label>
                <input
                  type="number"
                  className="form-control"
                  id="MobileNo"
                  name="MobileNo"
                  value={formData.mobileNo}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Password */}
              <div className="mb-3">
                <label htmlFor="Password" className="form-label">Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="Password"
                  name="Password"
                  value={formData.password}
                  onChange={handleChange}
                  required
                  autoComplete="true"
                />
              </div>

              {/* Confirm Password */}
              <div className="mb-3">
                <label htmlFor="confirmpassword" className="form-label">Confirm Password</label>
                <input
                  type="password"
                  className="form-control"
                  id="confirmpassword"
                  name="confirmpassword"
                  value={formData.confirmpassword}
                  onChange={handleChange}
                  required
                  autoComplete="true"
                />
              </div>

              {/* Aadhar Number */}
              <div className="mb-3">
                <label htmlFor="AadharNo" className="form-label">Aadhar Number</label>
                <input
                  type="number"
                  className="form-control"
                  id="AadharNo"
                  name="AadharNo"
                  value={formData.aadhar}
                  onChange={handleChange}
                  required
                />
              </div>

              {/* Role */}
              <div className="mb-3">
                <label className="form-label">Role</label>
                <select
                  className="form-control"
                  name='Role'
                  id='Role'
                  value={formData.role}
                  onChange={handleChange}
                  required
                >
                  <option value="User">User</option>
                  <option value="Admin">Admin</option>
                </select>
              </div>

              {/* DP (Profile Picture) */}
              <div className="mb-3">
                <label className="form-label">Profile Picture (DP)</label>
                <input
                  type="file"
                  className="form-control"
                  name="DP"
                  onChange={handleChange}
                  accept="image/*" // Ensure only image files are uploaded
                />
              </div>

              {/* Submit Button */}
              <div className="text-center mt-2">
                <button type="submit" className="btn btn-primary w-25">
                  Submit
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default Register;

