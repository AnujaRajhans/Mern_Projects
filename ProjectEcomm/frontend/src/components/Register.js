import React, { useState } from "react";
import { useNavigate, Link } from "react-router-dom"; 
import axios from "axios";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
const Register = () => {
  const [name, setName] = useState("");  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [mobile_number, setMobileNumber] = useState("");
  const [role, setRole] = useState("user");  
  const navigate = useNavigate(); 
  const namechange = (e) => setName(e.target.value);
  const emailchange = (e) => setEmail(e.target.value);
  const passwordchange = (e) => setPassword(e.target.value);
  const mobilenumberchange = (e) => setMobileNumber(e.target.value);
  const rolechange = (e) => setRole(e.target.value);
  async function register(payload) {
    try {
      console.log("axios Payload",payload)
      await axios.post("http://localhost:5001/api/users/register", payload)
      .then(response => {
      if(response.data.success) {
      console.log("response data",response.data);
      alert("register success");
      navigate("/login"); 
    }else{
      alert("Registration failed");
    }})
    } catch (error) {
      toast.error(error.response?.data?.error || "Registration failed");
    }
  }
  const handlesubmit = async (e) => {
    e.preventDefault();
    const payload = { name, email, password, mobile_number, role };
    try {
      await register(payload);
    } catch (error) {
      console.error("Error in registration", error);     
    }
  }
  return (
    <div>
       <section className="h-600 h-custom" style={{ backgroundColor: "lightBlue" }}>
      <div className="container py-5 h-900" style={{ height: "120vh" }}>
        <div className="row d-flex justify-content-center align-items-center h-900">
          <div className="col-lg-6 col-xl-5">
            <div
              className="card rounded-3"
              style={{ width: "100%", maxWidth: "500px" }}
            >
              <div className="card-body p-4 p-md-5">
                <h3 className="mb-4 pb-2 pb-md-0 mb-md-5 px-md-2">
                  Registration Page
                </h3>

                <form className="px-md-2" onSubmit={handlesubmit}>
                  <div className="form-outline mb-4">
                    <label className="form-label" htmlFor="username">
                      USERNAME
                    </label>
                    <input
                      type="text"
                      id="username"
                      className="form-control"
                      value={name}
                      onChange={namechange}
                      required
                    />
                  </div>
                  <div className="form-outline mb-4">
                    <label className="form-label" htmlFor="email">
                      EMAIL
                    </label>
                    <input
                      type="email"
                      id="email"
                      className="form-control"
                      value={email}
                      onChange={emailchange}
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
                      onChange={passwordchange}
                      required
                    />
                  </div>
                  <div className="form-outline mb-4">
                    <label className="form-label" htmlFor="mobileNumber">
                      MOBILE NUMBER
                    </label>
                    <input
                      type="text"
                      id="mobileNumber"
                      className="form-control"
                      value={mobile_number}
                      onChange={mobilenumberchange}
                      required
                    />
                  </div>

                  <div className="mb-4">
                    <label className="form-label" htmlFor="role">
                      ROLE
                    </label>
                    <select
                      className="form-select"
                      id="role"
                      value={role}
                      onChange={rolechange}
                    >
                      <option value="" disabled>
                        Select Role
                      </option>
                      <option value="user">User</option>
                      <option value="admin">Admin</option>
                    </select>
                  </div>

                  <button 
                    type="submit"
                    className="btn btn-success btn-lg mb-1"
                    style={{
                      display: "block",
                      marginLeft: "auto",
                      marginRight: "auto",
                    }}
                  >
                    Register
                  </button>
                  <div className="text-center mt-4">
                    <p>
                      Already have an account?{" "}
                      <Link to="/login" style={{ color: "blue", textDecoration: "none" }}>
                        Login
                      </Link>
                    </p>
                  </div>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
    </div>
  );
};

export default Register;
