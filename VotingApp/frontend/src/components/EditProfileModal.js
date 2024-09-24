import React, { useState } from "react";
import "./CSS/EditProfileModal.css"; 

const EditProfileModal = ({ userData, onClose, onSave }) => {
  const [formData, setFormData] = useState({
    name: userData.name,
    mobileNo : userData.mobileNo,
    email: userData.email,
    aadhar: userData.aadhar,
    role: userData.role,
    profileImage: userData.profileImage,
  });
  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };
  const handleFileChange = (e) => {
    setFormData((prev) => ({ ...prev, DP: e.target.files[0] }));
  };
  const handleSubmit = (e) => {
    e.preventDefault();
    const formDataToSend = new FormData();
    Object.keys(formData).forEach((key) => {
      formDataToSend.append(key, formData[key]);
    });
    onSave(formDataToSend); 
  };
     return (
    <div className="modal-backdrop">
      <div className="modal-content">
        <h2>Edit Profile</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              name="Fname"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Mobile Number</label>
            <input
              type="text"
              name="MobileNo"
              value={formData.mobileNo}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="Email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Aadhar Number</label>
            <input
              type="text"
              name="AadharNo"
              value={formData.aadhar}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Profile Picture</label>
            <input type="file" name="DP" onChange={handleFileChange} />
          </div>
          <div className="form-group">
            <label>Role</label>
            <select
              name="Role"
              value={formData.role}
              onChange={handleChange}
            >
              <option value="User">User</option>
              <option value="Admin">Admin</option>
            </select>
          </div>
          <div className="modal-actions">
            <button type="submit">Save</button>
            <button type="button" onClick={onClose}>
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default EditProfileModal;