import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import EmployeeDetails from './components/EmployeeDetails';

function App() {
  const [showLogin, setShowLogin] = useState(false);

  return (
    <div>
        <div>
            <button onClick={() => setShowLogin(true)}>Login</button>

            {showLogin && <LoginBox />}
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
