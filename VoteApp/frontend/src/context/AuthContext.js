import React, { createContext, useState, useContext } from 'react';
import axios from 'axios';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
    const [auth, setAuth] = useState(null);

    const login = async (email, password) => {
        const res = await axios.post('/api/auth/login', { email, password });
        setAuth(res.data);
    };

    const register = async (data) => {
        const res = await axios.post('/api/auth/register', data);
        setAuth(res.data);
    };

    const updateProfile = async (data) => {
        const res = await axios.put('/api/auth/me', data);
        setAuth((prev) => ({ ...prev, user: res.data }));
    };

    return (
        <AuthContext.Provider value={{ auth, login, register, updateProfile }}>
            {children}
        </AuthContext.Provider>
    );
};

export const useAuth = () => useContext(AuthContext);

export default AuthContext;