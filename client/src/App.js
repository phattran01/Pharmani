import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes, Link } from 'react-router-dom';
import UserContext from './UserContext';
import Home from './components/Home';
import EmployeeDetails from './components/EmployeeDetails';
import LoginBox from './components/LoginBox';
import PredictSalary from './components/PredictSalary';
import logo from './imgs/Trav_Color.jpg'; // import the logo
import './styles/main.css';

function App() {
  const [showLogin, setShowLogin] = useState(false);
  const [user, setUser] = useState(null); 
  const [showNotification, setShowNotification] = useState(false);

  const closeLoginBox = () => {
    setShowLogin(false);
  };

  const handleSuccessfulLogin = (user) => {
    setUser(user);
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000); 
    setTimeout(() => setShowNotification(false), 3000);
  };

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <Router>
      <UserContext.Provider value={{ user, setUser }}>
        <div className='body'>
          <div className='nav-bar'>
            <div className="topbar">
              <Link to="/">
                <img src={logo} alt="Travelers Logo" />
              </Link>
              <Link to="/predict_salary" id="navLink" className="nav-link">Salary Calculator</Link>
              <button className="login-button" onClick={user ? handleLogout : () => setShowLogin(true)}>
                {user ? user.username : 'Login'}
              </button>
            </div>
            {showNotification && <div className="notification">You've successfully logged in, Welcome {user.name}</div>}
            <div>
              {showLogin && (
                <div onClick={closeLoginBox} style={{position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.5)', zIndex: 1000}}>
                  <LoginBox />
                </div>
              )}
            </div>
          </div>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/employee/:id" element={<EmployeeDetails />} />
            <Route path="/predict_salary" element={<PredictSalary />} />
          </Routes>
        </div>
      </UserContext.Provider>
    </Router>
  );
}

export default App;