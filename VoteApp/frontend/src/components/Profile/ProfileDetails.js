import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import ProfileEditForm from './ProfileEditForm';

const ProfileDetails = () => {
    const { auth } = useAuth();
    const [editMode, setEditMode] = useState(false);

    if (!auth) return <p>Loading...</p>;

    return editMode ? (
        <ProfileEditForm setEditMode={setEditMode} />
    ) : (
        <div>
            <h2>Profile</h2>
            <p>Name: {auth.user.name}</p>
            <p>Email: {auth.user.email}</p>
            <img src={auth.user.profileImage} alt="Profile" />
            <button onClick={() => setEditMode(true)}>Edit Profile</button>
        </div>
    );
};

export default ProfileDetails;