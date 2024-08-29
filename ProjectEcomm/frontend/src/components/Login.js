import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const Login = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const navigate = useNavigate(); 

  async function login(payload) {
    try {
      const response = await axios.post("http://localhost:4000/api/users/login", payload);
      console.log(payload);
        localStorage.setItem("token", response.data.token);
        navigate("/dashboard"); 
        return true;
    } catch (error) {
        toast.error("Login Failed,  Please try again later.");
      console.error("Login error:", error);
      return false;
    }
  }

  const handleSubmit = async (e) => {
    e.preventDefault();
    const loginSuccess = await login({ email, password });
    console.log(loginSuccess);
  };

  return (
    <section className="h-100 h-custom" style={{ backgroundColor: "lightblue" }}>
      <div className="container py-5 h-900" style={{ height: "100vh" }}>
        <div className="row d-flex justify-content-center align-items-center h-100">
          <div className="col-lg-6 col-xl-5">
            <div className="card rounded-3" style={{ width: "100%", maxWidth: "500px" }}>
              <div className="card-body p-4 p-md-5">
                <h3 className="mb-4 pb-2 pb-md-0 mb-md-5 px-md-2">Login</h3>

                <form className="px-md-2" onSubmit={handleSubmit}>
                  <div className="form-outline mb-4">
                    <label className="form-label" htmlFor="email">
                      EMAIL
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="form-control"
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      required 
                    />
                  </div>
                  <div className="form-outline mb-4">
                    <label className="form-label" htmlFor="password">
                      PASSWORD
                    </label>
                    <input
                      type="password"
                      id="password"
                      className="form-control"
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      required 
                    />
                  </div>
                  <button
                    type="submit"
                    className="btn btn-success btn-lg mb-1"
                    style={{ display: "block", marginLeft: "auto", marginRight: "auto" }}
                  >
                    Login
                  </button>
                  <div style={{ textAlign: "center", marginTop: "1rem" }}>
                    <p>
                      You have to register first!{" "}
                      <Link to="/">
                        <span style={{ color: "blue" }}>Register</span>
                      </Link>
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
      <ToastContainer />
    </section>
  );
};

export default Login;
