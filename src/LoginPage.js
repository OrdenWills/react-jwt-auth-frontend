import React, { useState } from 'react';
import { loginUser } from './apiService';

const LoginPage = () => {
    const [username, setUsername] = useState('');
    const [password, setPassword] = useState('');
    


    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await loginUser({ username, password });
            const { access_token, refresh_token } = response.data;
            localStorage.setItem('access_token', access_token);
            localStorage.setItem('refresh_token', refresh_token);

            console.log("Login successful", response.data); // For demonstration
            // ... redirect to dashboard (later) ...
        } catch (error) {
            console.error("Login failed", error);
            // ... handle error (e.g., display error message) ...
        }
    };

    return (
        <div>
            <h2>Login</h2>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor="username">Username:</label>
                    <input type="text" id="username" value={username} onChange={(e) => setUsername(e.target.value)} />
                </div>
                <div>
                    <label htmlFor="password">Password:</label>
                    <input type="password" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
                </div>
                <button type="submit">Login</button>
            </form>
        </div>
    );

};

export default LoginPage;