import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const Login = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleLogin = (e) => {
        e.preventDefault();

        // Basic mock authentication (replace with actual authentication logic)
        if (username === 'admin' && password === 'password') {
            // Redirect to the Admin page upon successful login
            navigate('/admin');
        } else {
            // Set an error message if login fails
            setError('Invalid username or password');
        }
    };

    return (
        <div className="flex flex-col items-center justify-center min-h-screen bg-gray-900 text-white">
            <h2 className="text-3xl mb-6">Login</h2>
            <form onSubmit={handleLogin} className="w-80 p-4 bg-gray-800 rounded shadow-lg">
                <div className="mb-4">
                    <label className="block text-sm font-bold mb-2">Username</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="w-full p-2 rounded bg-gray-700 text-white"
                        required
                    />
                </div>
                <div className="mb-4">
                    <label className="block text-sm font-bold mb-2">Password</label>
                    <input
                        type="password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="w-full p-2 rounded bg-gray-700 text-white"
                        required
                    />
                </div>
                {error && <p className="text-red-500 mb-4">{error}</p>}
                <button
                    type="submit"
                    className="w-full py-2 bg-blue-500 hover:bg-blue-600 rounded text-white font-bold"
                >
                    Login
                </button>
            </form>
        </div>
    );
};

export default Login;
