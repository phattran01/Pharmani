import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/main.css';

const Home = () => {
  const [employees, setEmployees] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [jobCategoryFilter, setJobCategoryFilter] = useState('');
  const [roleFilter, setRoleFilter] = useState('');
  const [isSticky, setIsSticky] = useState(false);
  const [numDisplayed, setNumDisplayed] = useState(52); // new state variable for number of displayed employees

  useEffect(() => {
    const checkScroll = () => {
      if (!isSticky && window.pageYOffset > 200) {  // 200 is a value of your choice
        setIsSticky(true);
      } else if (isSticky && window.pageYOffset <= 200) {  // 200 is a value of your choice
        setIsSticky(false);
      }
    };
    
    window.addEventListener('scroll', checkScroll);
    
    return () => {
      window.removeEventListener('scroll', checkScroll);
    };
  }, [isSticky]);

  useEffect(() => {
    fetch('http://localhost:4000/api/employees')
      .then((response) => response.json())
      .then((data) => {
        const updatedData = data.map((employee, index) => {
          const photoIndex = (index % 99) + 1;
          employee.photo = `https://randomuser.me/api/portraits/${employee.gender}/${photoIndex}.jpg`;
          return employee;
        });
        setEmployees(updatedData);
        setFilteredEmployees(updatedData);
      });
  }, []);

  useEffect(() => {
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

  const loadMore = () => {
    setNumDisplayed(numDisplayed + 52); // load 52 more employees when button is clicked
  };

  return (
    <div className="container">
      <div className="video-container">
            <video className="stock-video" src="https://www.travelers.com/videos/tcom_homepage_video.mp4" autoPlay loop muted />
            <div className="video-text">
              <h2>The right insurance for you.</h2>
              <p>We've got you covered every day and when it matters most.</p>
            </div>
      </div>
      <div className={isSticky ? 'second-bar sticky' : 'second-bar'}>
        <h2 className="title">Employee Directory</h2>
        <br/>
        <div className="filters">
          <div className= "filter">
            <label htmlFor="jobCategoryFilter">Job Category:</label>
            <select id="jobCategoryFilter" value={jobCategoryFilter} onChange={handleJobCategoryFilter}>
              <option value="">All</option>
              <option value="Insurance">Insurance</option>
              <option value="Business">Business</option>
              <option value="Engineering">Engineering</option>
              <option value="HR">HR</option>
            </select>
          </div>
          <div className="filter">
            <label htmlFor="roleFilter">    Role:</label>
            <select id="roleFilter" value={roleFilter} onChange={handleRoleFilter}>
              <option value="">All</option>
              <option value="Manager">Manager</option>
              <option value="HR">HR</option>
              <option value="Employee">Employee</option>
            </select>
          </div>
        </div>
      </div>
      <div className = "container-boxes">
        <div className="employee-boxes">
          {filteredEmployees.slice(0, numDisplayed).map((employee) => (
            <Link to={`/employee/${employee.id}`} key={employee.id} className="employee-link">
              <div className="employee-box">
                <img src={employee.photo} alt={`${employee.name}'s headshot`} />
                <div className="employee-details">
                  <span className="employee-name">{employee.name}</span>
                  <span className="employee-role">{employee.jobRole}</span>
                </div>
              </div>
            </Link>
          ))}
        </div>
        {numDisplayed < filteredEmployees.length && 
          <button onClick={loadMore} className="load-more">Load More</button>
        }
      </div>
    </div>
  );
};

export default Home;