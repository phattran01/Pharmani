import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UserContext from './UserContext'; // import UserContext
import Home from './components/Home';
import EmployeeDetails from './components/EmployeeDetails';
import LoginBox from './components/LoginBox';
import SalaryPredictor from './components/salary_predictor'; // Import SalaryPredictor

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
  };

  const handleLogout = () => {
    setUser(null);
  };

  return (
    <UserContext.Provider value={{ user, setUser }}>
      <div>
        {showNotification && <div className="notification">You've successfully logged in, Welcome {user.name}</div>}
        <div>
          <button onClick={user ? handleLogout : () => setShowLogin(true)}>
            {user ? user.username : 'Login'}
          </button>
          {showLogin && (
            <div onClick={closeLoginBox} style={{position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.5)'}}>
              <LoginBox />
            </div>
          )}
        </div>
        <div>
            <SalaryPredictor />
        </div>
        <Router>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/employee/:id" element={<EmployeeDetails />} />
            <Route path="/predict" element={<SalaryPredictor />} />
          </Routes>
        </Router>
      </div>
    </UserContext.Provider>
  );
}

export default App;
