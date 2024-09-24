import React, { useEffect, useState } from "react";
import { Routes, Route, useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";
function UserNavbar() {
  const [role,setRole]=useState();
  const navigate = useNavigate(); 
  const handleNavigation = (path) => {
    navigate(path);
  };
  const handlelogout=()=>{
    localStorage.removeItem('token')
    navigate("/login")
  }
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      const decodedToken = jwtDecode(token);
      const userRole = decodedToken.role || "User"; 
      setRole(userRole);
    } else {
      navigate("/login"); 
    }
  }, [navigate]);

  return (
    <>
      <nav className="navbar navbar-expand-lg custom-navbar">
        <div className="container-fluid">
          <div
            className="collapse navbar-collapse justify-content-center"
            id="navbarNav"
          >
            <ul className="navbar-nav">
              {role === "Admin" ? (
                <>
                  <li className="nav-item">
                    <button
                      className="nav-link btn"
                      onClick={() => handleNavigation("/userinfo")}
                    >
                      Dashboard
                    </button>
                  </li>
                  <li className="nav-item">
                    <button
                      className="nav-link btn"
                      onClick={() => handleNavigation("/addelection")}
                    >
                      addelection
                    </button>
                  </li>
                  <li className="nav-item">
                    <button
                      className="nav-link btn"
                      onClick={() => handleNavigation("/addcandidate")}
                    >
                      Add Candidates
                    </button>
                  </li> 
                  <li className="nav-item">
                    <button
                      className="nav-link btn"
                      onClick={() => handleNavigation("/showvotes")}
                    >
                      Show Votes
                    </button>
                  </li>
                  <li className="nav-item">
                    <button
                      className="nav-link btn"
                      onClick={handlelogout}
                    >
                      Logout
                    </button>
                  </li>
                </>
              ) : (
                <>
                  <li className="nav-item">
                    <button
                      className="nav-link btn"
                      onClick={() => handleNavigation("/userinfo")}
                    >
                      Profile Info
                    </button>
                  </li>
                  <li className="nav-item">
                    <button
                      className="nav-link btn"
                      onClick={() => handleNavigation("/Election")}
                    >
                      Election
                    </button>
                  </li>
                  <li className="nav-item">
                    <button
                      className="nav-link btn"
                      onClick={() => handleNavigation("/Contact")}
                    >
                      Contact
                    </button>
                  </li>
                  <li className="nav-item">
                    <button
                      className="nav-link btn"
                      onClick={handlelogout}
                    >
                      Logout
                    </button>
                  </li>
                </>
              )}
            </ul>
          </div>
        </div>
      </nav>
    </>
  );
}

export default UserNavbar;