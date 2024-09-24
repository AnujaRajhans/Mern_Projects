import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "./CSS/LoginForm.css";
const SignInPage = () => {
  const [Email, setEmail] = useState("");
  const [Password, setPassword] = useState("");
  const [success, setSuccess] = useState(false);
  const navigate = useNavigate();

  const handleUsernameChange = (e) => {
    setEmail(e.target.value);
  };

  const handlePasswordChange = (e) => {
    setPassword(e.target.value);
  };

  async function login(payload) {
    try {
      const response = await axios.post(
        "http://localhost:6001/api/user/login",
        payload
      );
      const { token, success } = response.data;
      localStorage.setItem("token", token);  
      setSuccess(success);
      toast.success("User successfully logged in");
      return success;
    } catch (error) {
      if (error.response && error.response.status === 400) {
        toast.error("Invalid Username or Password");
      } else if (error.response && error.response.status === 404) {
        toast.error("User is not registered");
      } else {
        toast.error("Login failed. Please try again.");
      }
      return false;
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const loginSuccess = await login({ Email, Password });
    if (loginSuccess) {
      navigate("/userinfo");
    }
  };

  return (
    <div className="hero" style={{ backgroundColor: "#0A192F", minHeight: "100vh" }}>
      <div className="container ">
        <div className="row d-flex align-items-center justify-content-center">
          {/* Left Image Section */}
          <div className="col-md-6">
            {/* <img
              src={loginimg}
              alt="Person interacting with a laptop"
              className="img-fluid"
              style={{ maxWidth: "80%", marginLeft: "auto", marginRight: "auto" }}
            /> */}
          </div>

          {/* Right Form Section */}
          <div className="col-md-4 text-white">
            <h2 className="mb-4" id="log">Login</h2>
            <form onSubmit={handleSubmit}>
              {/* Email Input */}
              <div className="mb-3">
                <label htmlFor="email" className="form-label text-white">
                  Email address
                </label>
                <input
                  type="email"
                  className="form-control"
                  id="Email"
                  name="Email"
                  value={Email}
                  onChange={handleUsernameChange}
                  placeholder="Enter Email"
                  required
                />
              </div>

              {/* Password Input */}
              <div className="mb-3">
                <label htmlFor="password" className="form-label text-white">
                  Password
                </label>
                <input
                  type="password"
                  className="form-control"
                  id="Password"
                  name="Password"
                  value={Password}
                  onChange={handlePasswordChange}
                    placeholder="Enter Password"
                  required
                  autoComplete="true"
                />
              </div>

              {/* Submit Button */}
              <button type="submit" className="btn btn-primary btn-block mb-3">
                Login
              </button>
              <p>Create New Account : <a href="/register">Click Here</a></p>
            </form>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
};

export default SignInPage;
