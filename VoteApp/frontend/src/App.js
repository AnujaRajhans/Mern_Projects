import React from 'react';
import { BrowserRouter as Route, Routes } from 'react-router-dom';
import LoginForm from './components/Auth/LoginForm.js';
import RegisterForm from './components/Auth/RegisterForm';
import ElectionList from './components/Elections/ElectionList';
import ProfileDetails from './components/Profile/ProfileDetails.js';
// import { useAuth } from './context/AuthContext';

function App() {
    // const { auth } = useAuth();
    return (
            <Route>
                <Routes path="/login" component={LoginForm} />
                <Routes path="/register" component={RegisterForm} />
                <Routes path="/elections" component={ElectionList} />
                <Routes path="/profile" component={ProfileDetails} />
            </Route>
       
    );
}

export default App;
