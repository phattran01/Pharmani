import React, { useState, useContext } from 'react';
import UserContext from '../UserContext';
import '../styles/LoginBox.css'; //Assuming you have a CSS file for styling
import logo from '../imgs/Trav_Color.jpg';

function LoginBox() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState(null); // Use this state for error handling
  const { setUser } = useContext(UserContext); // get the setUser function from context

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      // Update the URL and data according to your API
      const response = await fetch('http://localhost:4000/api/login', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          username,
          password,
        }),
      });

      const data = await response.json();

      if(data.success) {
        setUser(data.user); // store the full user object, not just the username
        setError(null);
      } else {
        setError(data.message);
      }
    } catch (error) {
      setError(error.message);
    }
  }

  const stopPropagation = (e) => {
    e.stopPropagation();
  };

  return (
    <div className="login-box" onClick={stopPropagation}>
      <img src={logo} alt="Logo" style={{ width: '100%', height: '50px', marginBottom: '20px'}} />
      <br/>
      <form onSubmit={handleSubmit}>
        <label>Username </label>
        <input 
          type="text" 
          value={username} 
          onChange={e => setUsername(e.target.value)} 
          placeholder="Username" 
        />
        <br></br>
        <label>Password  </label>
        <input 
          type="password" 
          value={password} 
          onChange={e => setPassword(e.target.value)} 
          placeholder="Password" 
        />
        <br></br>
        <button type="submit">Login</button>
      </form>
      {error && <div>{error}</div>}
    </div>
  );
}

export default LoginBox;
