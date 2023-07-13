import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import UserContext from './UserContext'; // import UserContext
import Home from './components/Home';
import EmployeeDetails from './components/EmployeeDetails';
import LoginBox from './components/LoginBox';
import SalaryPredictor from './components/salary_predictor';

function App() {
  const [showLogin, setShowLogin] = useState(false);
  const [user, setUser] = useState(null); // user state
  const [showNotification, setShowNotification] = useState(false);

  // This function will be called when the backdrop is clicked
  const closeLoginBox = () => {
    setShowLogin(false);
  };

  const handleSuccessfulLogin = (username) => {
    setUser(username);
    setShowNotification(true);
    setTimeout(() => setShowNotification(false), 3000); // The notification will disappear after 3 seconds
  };

  const handleLogout = () => {
    setUser(null); // Reset the user data when logging out
  };

  return (
    <UserContext.Provider value={{ user, setUser }}> {/* provide the user state to other components */}
      <div>
        {showNotification && <div className="notification">You've successfully logged in, Welcome {user}</div>}
        <div>
          <button onClick={user ? handleLogout : () => setShowLogin(true)}>
            {user ? user : 'Login'}
          </button>
          {showLogin && (
            <div onClick={closeLoginBox} style={{position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.5)'}}>
              <LoginBox onSuccessfulLogin={handleSuccessfulLogin} />
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
          </Routes>
        </Router>
      </div>
    </UserContext.Provider>
  );
}

export default App;