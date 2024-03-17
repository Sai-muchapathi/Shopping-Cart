import { useState } from 'react';
import '../AdminLogin.css';
import AdminDashboard from "./AdminDashboard";

const AdminLogin = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const handleLogin = () => {
        // Perform authentication logic here
        // For simplicity, let's assume username is 'admin' and password is 'password'
        if (username === 'admin' && password === 'password') {
            // Redirect to admin dashboard after successful login
            setIsLoggedIn(true);
            alert('Success');
        } else {
            alert('Invalid username or password');
        }
    };

    return (
        isLoggedIn ? <AdminDashboard /> :
            <div className="login-container">
                <h2>Login</h2>
                <form onSubmit={handleLogin}>
                    <div>
                        <label>Username:</label>
                        <input type="text" value={username} onChange={(e) => setUsername(e.target.value)} />
                    </div>
                    <div>
                        <label>Password:</label>
                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                    </div>
                    <button type="submit">Login</button>
                </form>
            </div>
    );
};

export default AdminLogin;
