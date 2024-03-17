import { useState } from 'react';
import '../AdminLogin.css';
import AdminDashboard from "./AdminDashboard";

const AdminLogin = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [isLoggedIn, setIsLoggedIn] = useState(false);

    const handleLogin = () => {
        if (username === 'admin' && password === 'password') {
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
