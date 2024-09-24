import React, { useEffect, useState } from "react";
import axios from "axios";
import { jwtDecode } from "jwt-decode";
import UserNavbar from "./UserNavbar";
import EditProfileModal from "./EditProfileModal"; // Import the modal component

const Userpage = () => {
  const [role, setRole] = useState(null);
  const [ID,setID]=useState();
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [showEditModal, setShowEditModal] = useState(false); // State to toggle the modal

  useEffect(() => {
    const fetchUserData = async () => {
      const token = localStorage.getItem("token");
      if (token) {
        try {
          if (token.split(".").length === 3) {
            const decodedToken = jwtDecode(token);
            setRole(decodedToken.role);

            const response = await axios.get(
              "http://localhost:6001/api/user/userinfo/",
              {
                headers: {
                  Authorization: `Bearer ${token}`,
                },
              }
            );

            if (response.data.success) {
              setUserData(response.data.user);
              setID(response.data.user._id)
              console.log("Userinfo", response.data.user);
            } else {
              console.error("Failed to fetch user data:", response.data.msg);
            }
          } else {
            throw new Error("Invalid token format");
          }
        } catch (error) {
          console.error("Failed to decode token or fetch user data:", error);
        } finally {
          setLoading(false);
        }
      } else {
        setLoading(false);
      }
    };

    fetchUserData();
  }, []);

  const handleProfileUpdate = async (updatedData) => {

    const token = localStorage.getItem("token");
    try {
      const response = await axios.put(
        `http://localhost:5016/api/users/UpdateById/${ID}`,
        updatedData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data.success) {
        setUserData(response.data.user); // Update UI with new data
        setShowEditModal(false); // Close modal on success
      } else {
        console.error("Failed to update profile:", response.data.message);
      }
    } catch (error) {
      console.error("Error updating profile:", error);
    }
  };

  if (loading) {
    return (
      <>
        <UserNavbar role={role} />
        <div className="Userpage">
          <div className="profile-container">
            <p>Loading...</p>
          </div>
        </div>
      </>
    );
  }

  if (!role) {
    return (
      <>
        <UserNavbar role={role} />
        <div className="Userpage">
          <div className="profile-container">
            <p>Please log in to view profile information.</p>
          </div>
        </div>
      </>
    );
  }

  return (
    <>
      <UserNavbar role={role} />
      <div className="Userpage">
        <div className="profile-container">
          <div>
            <div className="profile-image-section">
              <img
                src={userData?.profilePage} 
                alt="Profile"
                className="profile-pic"
              />
            </div>
            <div
              className="edit-profile"
              onClick={() => setShowEditModal(true)} // Show modal on click
            >
              <i className="fas fa-edit"></i>
              <span>Edit Profile</span>
            </div>
          </div>

          <div className="profile-info-section">
            <p>
              <strong>Role:</strong>{userData?.Role|| "N/A"}
            </p>
            <p>
              <strong>Name:</strong> {userData?.Fname || "N/A"}
            </p>
            <p>
              <strong>Father's/Mother's Name:</strong>{" "}
              {userData?.FMname || "N/A"}
            </p>
            <p>
              <strong>Mobile Number:</strong> {userData?.MobileNo || "N/A"}
            </p>
            <p>
              <strong>Email:</strong> {userData?.Email || "N/A"}
            </p>
            <p>
              <strong>Aadhar Number:</strong> {userData?.AadharNo || "N/A"}
            </p>
          </div>
        </div>
      </div>

      {/* Render Edit Profile Modal */}
      {showEditModal && (
        <EditProfileModal
          userData={userData}
          onClose={() => setShowEditModal(false)}
          onSave={handleProfileUpdate}
        />
      )}
    </>
  );
};

export default Userpage;