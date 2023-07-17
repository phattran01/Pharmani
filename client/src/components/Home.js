import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/main.css';

const Home = () => {
  const [employees, setEmployees] = useState([]);
  const [filteredEmployees, setFilteredEmployees] = useState([]);
  const [jobCategoryFilter, setJobCategoryFilter] = useState('');
  const [roleFilter, setRoleFilter] = useState('');
  const [isSticky, setIsSticky] = useState(false);
  const [numDisplayed, setNumDisplayed] = useState(32);
  const [searchValue, setSearchValue] = useState("");

  const handleSearchChange = (event) => {
    setSearchValue(event.target.value);
  };

  useEffect(() => {
    const checkScroll = () => {
      if (!isSticky && window.pageYOffset > 200) {
        setIsSticky(true);
      } else if (isSticky && window.pageYOffset <= 200) {
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
        setEmployees(data);
        setFilteredEmployees(data);
      });
  }, []);

  useEffect(() => {
    const filtered = employees.filter((employee) => {
      const matchJobCategory = jobCategoryFilter ? employee.jobCategory === jobCategoryFilter : true;
      const matchRole = roleFilter ? employee.role === roleFilter : true;
      const matchSearch = employee.name.toLowerCase().includes(searchValue.toLowerCase());
      return matchJobCategory && matchRole && matchSearch;
    });

    setFilteredEmployees(filtered);
  }, [jobCategoryFilter, roleFilter, employees, searchValue]);

  const handleJobCategoryFilter = (event) => {
    setJobCategoryFilter(event.target.value);
  };

  const handleRoleFilter = (event) => {
    setRoleFilter(event.target.value);
  };

  const loadMore = () => {
    setNumDisplayed(numDisplayed + 32);
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
          <div className="filter">
            <label htmlFor="searchBar">Search by name:</label>
            <input 
              id="searchBar"
              type="text"
              value={searchValue}
              onChange={handleSearchChange}
            />
          </div>
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
            <Link 
              to={{
                pathname: `/employee/${employee.id}`,
                state: { photo: employee.photo },
              }}
              key={employee.id} 
              className="employee-link"
            >
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
          <button onClick={loadMore} className="load-more">More</button>
        }
      </div>
    </div>
  );
};

export default Home;