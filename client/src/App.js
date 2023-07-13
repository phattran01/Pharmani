import React, { useState } from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import EmployeeDetails from './components/EmployeeDetails';
import LoginBox from './components/LoginBox';

function App() {
  const [showLogin, setShowLogin] = useState(false);

  // This function will be called when the backdrop is clicked
  const closeLoginBox = () => {
    setShowLogin(false);
  };

  return (
    <div>
        <div>
            <button onClick={() => setShowLogin(true)}>Login</button>
            {showLogin && (
              <div onClick={closeLoginBox} style={{position: 'fixed', top: 0, left: 0, width: '100%', height: '100%', backgroundColor: 'rgba(0,0,0,0.5)'}}>
                <LoginBox />
              </div>
            )}
        </div>
      <Router>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/employee/:id" element={<EmployeeDetails />} />
        </Routes>
      </Router>
    </div>
  );
}

export default App;