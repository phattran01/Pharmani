import React, { useState, useContext } from 'react';
import axios from 'axios';
import UserContext from '../UserContext';
import '../styles/LoginBox.css'; //Assuming you have a CSS file for styling

function LoginBox() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null); // Use this state for error handling
  const { setUser } = useContext(UserContext); // get the setUser function from context

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Update the URL and data according to your API
      const response = await axios.post('http://localhost:4000/api/login', {
        username,
        password
      });

      if(response.data.success) {
        setUser(response.data.user); // store the full user object, not just the username
        setError(null);
      } else {
        setError(response.data.message);
      }
    } catch (error) {
      setError(error.message);
    }
  }

  const stopPropagation = (e) => {
    e.stopPropagation();
  };

  return (
    <div className="login-box">
      <form onSubmit={handleSubmit} onClick={stopPropagation}>
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