import React, { useState } from 'react';
import axios from 'axios';
import '../styles/LoginBox.css'; //Assuming you have a CSS file for styling

function LoginBox() {
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Update the URL and data according to your API
            const response = await axios.post('http://localhost:4000/api/login', {
                username,
                password
            });

            if(response.data.success) {
                // Handle successful login. E.g. Store user info to context or local storage
            } else {
                // Handle error. E.g. show error message
            }

        } catch (error) {
            console.error(`Error login: ${error}`);
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
        </div>
    );
}

export default LoginBox;