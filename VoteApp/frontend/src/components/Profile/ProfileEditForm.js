import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';

const ProfileEditForm = ({ setEditMode }) => {
    const { auth, updateProfile } = useAuth();
    const [formData, setFormData] = useState({
        name: auth.user.name,
        email: auth.user.email,
        profileImage: null
    });

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleImageChange = (e) => {
        setFormData({ ...formData, profileImage: e.target.files[0] });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        const data = new FormData();
        data.append('name', formData.name);
        data.append('email', formData.email);
        data.append('profileImage', formData.profileImage);

        await updateProfile(data);
        setEditMode(false);
    };

    return (
        <form onSubmit={handleSubmit} encType="multipart/form-data">
            <input
                name="name"
                placeholder="Name"
                value={formData.name}
                onChange={handleChange}
                required
            />
            <input
                name="email"
                type="email"
                placeholder="Email"
                value={formData.email}
                onChange={handleChange}
                required
            />
            <input type="file" onChange={handleImageChange} />
            <button type="submit">Save</button>
        </form>
    );
};

export default ProfileEditForm;