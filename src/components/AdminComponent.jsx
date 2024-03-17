import React from 'react';
import AdminDashboard from './AdminDashboard';
import AdminLogin from '../components/AdminLogin';
import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';

const AdminComponent = () => {
    return (
        <div className="admin-container">
            <Router>
                <nav>
                    <ul>
                        <li>
                            <Link to="/admin/dashboard">Dashboard</Link>
                        </li>
                        <li>
                            <Link to="/admin/users">Users</Link>
                        </li>
                        <li>
                            <Link to="/admin/products">Products</Link>
                        </li>
                        <li>
                            <Link to="/admin/sales">Sales</Link>
                        </li>
                    </ul>
                </nav>

                <Routes>
                    <Route path="/admin/dashboard" element={<AdminDashboard />} />
                    <Route path="/admin" element={<AdminLogin />} />
                </Routes>
            </Router>
        </div>
    );
}

export default AdminComponent;
