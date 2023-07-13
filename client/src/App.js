import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Home from './components/Home';
import EmployeeDetails from './components/EmployeeDetails';

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/employee/:id" element={<EmployeeDetails />} />
      </Routes>
    </Router>
  );
}

export default App;
