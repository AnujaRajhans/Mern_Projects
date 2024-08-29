import React from "react";
import axios from "axios";
import img from "./co.jpg"
import { useState,useEffect } from "react";
import { ListGroup } from "react-bootstrap";
import { FaUserTag ,FaEnvelope,FaUser,FaTachometerAlt,FaUsers, FaMoneyBill} from "react-icons/fa"; 
function Dashboard() {
  const imageStyle = {
    height: '500px',
    width: 'auto',
    backgroundcolor: "grey"
  };
  const [user, setUser] = useState({});
  useEffect(() => {
    async function getUserInfo() {
      try {
        const response = await axios.post(
          "http://localhost:4000/api/users/userInfo",
          {},
          {
            headers: { Authorization: "Bearer " + localStorage.getItem("token"),},}
        );
        setUser(response.data.user);
      } catch (error) {
        console.log(error);
      }
    }
    getUserInfo();
  }, []);
    if (user.role === "admin") {
      return (
        <>
          <div className="container mb-4">
            <FaUserTag className="me-3" /> {user.role}
          </div>
          <div className="container mb-4">
            <FaEnvelope className="me-3" /> {user.email}
          </div>
          <div className="container mb-4">
            <FaUser className="me-3" /> {user.name}
          </div>
          <ListGroup.Item action href="#">
            <FaTachometerAlt className="me-3" /> Admin Dashboard
          </ListGroup.Item>
          <ListGroup.Item action href="#">
            <FaUsers className="me-3" /> Manage Users
          </ListGroup.Item>
          <ListGroup.Item action href="#">
            <FaMoneyBill className="me-3" /> Sales
          </ListGroup.Item>
        </>
      );
    } 
  return (

    <div>
    
      <h1>Dashboard</h1>
      <p>Welcome to your dashboard.</p>
      <img src={img}  alt="Company Logo" style={imageStyle} />
    </div>
  );
}

export default Dashboard;