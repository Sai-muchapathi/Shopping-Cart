import React, { useState } from 'react';
import { BrowserRouter, Link, Navigate, Route, Routes } from 'react-router-dom';
import Home from "./components/Home";
import About from "./components/About";
import Careers from "./components/Careers";
import Login from "./components/Login";
import SignUp from "./components/SignUp";
import Logo from "./Logo.png";
import AdminDashboard from "./components/AdminDashboard";
import AdminLogin from "./components/AdminLogin";
import Cart from "./components/Cart";
import Users from "./components/Users";
import { ProductProvider } from "./components/ProductProvider";

function Navbar({ userName, location }) {
    return (
        <div className="navbar">
            <div className="left-content">
                <img src={Logo} alt="Logo" className="logo" />
                <span className="welcome-message">Welcome {userName.trim().split(/\s+/)[0].replace(/^\w/, (c) => c.toUpperCase())},{location}</span>
            </div>
            <div className="nav-links">
                <Link to="/" className="nav-link">Home</Link>
                <Link to="/about" className="nav-link">About</Link>
                <Link to="/careers" className="nav-link">Careers</Link>
                {!userName && <Link to="/login" className="nav-link">Login</Link>}
                {!userName && <Link to="/signup" className="nav-link">Signup</Link>}
                {userName && <Link to="/logout" className="nav-link">Logout</Link>}
            </div>
        </div>
    );
}

function App() {
    const [userName, setUserName] = useState('');
    const [location, setLocation] = useState(null);

    navigator.geolocation.getCurrentPosition((position) => {
        setLocation(position.coords.accuracy);
    });

    const handleUser = (username) => {
        setUserName(username);
    };

    return (
        <ProductProvider>
            <BrowserRouter>
                <div>
                    {userName && <Navigate to="/" replace={true} />}
                    <Navbar userName={userName} location={location} />
                    <Routes>
                        <Route path="/" element={<Home />} />
                        <Route path="/about" element={<About />} />
                        <Route path="/careers" element={<Careers />} />
                        <Route path="/cart" element={<Cart />} />
                        <Route path="/login" element={<Login getCredentials={handleUser} />} />
                        <Route path="/signup" element={<SignUp />} />
                        <Route path="/admin/users" element={<Users />} />
                        <Route path="/admin" element={<AdminLogin />} />
                        <Route path="/admin/dashboard" element={<AdminDashboard />} />
                    </Routes>
                </div>
            </BrowserRouter>
        </ProductProvider>
    );
}

export default App;
