import React, { useState } from 'react';
import axios from 'axios';
import '../styles/LoginBox.css'; 

function LoginBox({ onSuccessfulLogin }) {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState(null);

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await axios.post('http://localhost:4000/api/login', {
                username,
                password
            });

            if(response.data.success) {
                console.log("Login Successful!");
                setError(null);
                onSuccessfulLogin(username);
            } else {
                setError(response.data.message);
            }
        } catch (error) {
            console.error(`Error login: ${error}`);
            setError(error.message);
        }
    }

    const stopPropagation = (e) => {
        e.stopPropagation();
    };

    return (
        <div className="login-box" onClick={stopPropagation}>
            <form onSubmit={handleSubmit}>
                <input 
                    type="text" 
                    value={username} 
                    onChange={e => setUsername(e.target.value)} 
                    placeholder="Username" 
                />
                <input 
                    type="password" 
                    value={password} 
                    onChange={e => setPassword(e.target.value)} 
                    placeholder="Password" 
                />
                <button type="submit">Login</button>
            </form>
            {error && <div>{error}</div>} 
        </div>
    );
}

export default LoginBox;