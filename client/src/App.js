import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import EmployeeDetails from './components/EmployeeDetails';
// import SalaryPredictor from './components/react_component'
function App() {
  return (
    <div>
      {/* <div>
        <h1>Salary Predictor</h1>
        <SalaryPredictor />
      </div> */}
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
