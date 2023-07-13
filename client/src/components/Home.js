import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/main.css';

const Home = () => {
  const [employees, setEmployees] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [jobCategoryFilter, setJobCategoryFilter] = useState('');
  const [roleFilter, setRoleFilter] = useState('');

  useEffect(() => {
    fetch('http://localhost:4000/api/employees')
      .then((response) => response.json())
      .then((data) => {
        setEmployees(data);
        setFilteredEmployees(data);
      });
  }, []);

  useEffect(() => {
    // Apply filters
        const filtered = employees.filter((employee) => {
        const matchJobCategory = jobCategoryFilter ? employee.jobCategory === jobCategoryFilter : true;
        const matchRole = roleFilter ? employee.role === roleFilter : true;
        return matchJobCategory && matchRole;
    });
    setFilteredEmployees(filtered);
  }, [jobCategoryFilter, roleFilter, employees]);

  const handleJobCategoryFilter = (event) => {
    setJobCategoryFilter(event.target.value);
  };

  const handleRoleFilter = (event) => {
    setRoleFilter(event.target.value);
  };

  return (
    <div className="container">
      <h2>Employee Names</h2>
      <div className="filters">
        <label htmlFor="jobCategoryFilter">Job Category:</label>
        <select id="jobCategoryFilter" value={jobCategoryFilter} onChange={handleJobCategoryFilter}>
          <option value="">All</option>
          {/* Add more job categories as options */}
          <option value="Insurance">Insurance</option>
          <option value="Business">Business</option>
          <option value="Engineering">Engineering</option>
          <option value="HR">HR</option>
        </select>

        <label htmlFor="roleFilter">Role:</label>
        <select id="roleFilter" value={roleFilter} onChange={handleRoleFilter}>
          <option value="">All</option>
          <option value="Manager">Manager</option>
          <option value="HR">HR</option>
          <option value="Employee">Employee</option>
        </select>
      </div>

      <div className="employee-boxes">
        {filteredEmployees.map((employee) => (
          <Link to={`/employee/${employee.id}`} key={employee.id}>
            <div className="employee-box">
              {employee.name}
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default Home;