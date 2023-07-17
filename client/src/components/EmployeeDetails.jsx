import React, { useState, useEffect, useContext } from 'react';
import UserContext from '../UserContext';
import { useParams } from 'react-router-dom';
import '../styles/EmployeeDetails.css';

const EmployeeDetails = () => {
  const { id } = useParams();
  const [employee, setEmployee] = useState(null);
  const { user } = useContext(UserContext);

  useEffect(() => {
    fetch(`http://localhost:4000/api/employees/${id}`)
      .then((response) => response.json())
      .then((data) => {
        setEmployee(data);
      })
      .catch((error) => {
        console.error('Error:', error);
      });
  }, [id]);


  if (!employee) {
    return <div>Loading...</div>;
  }

  const canSeeSalary = () => {
    if (!user) {
      return false;
    }
    if (
      user.role === "HR" ||
      (employee.manager && user.username === employee.manager.username) ||
      user.username === employee.username
    ) {
      return true;
    }
    return false;
  };

  return (
    <div className="employee-details-container">
      <h2 className="employee-details-title">Employee Details</h2>
      <div className="employee-details">
        <img className="employee-photo" src={employee.photo} alt={`${employee.name}'s headshot`} />
        <div className="employee-info">
          <p><strong>Name:</strong> {employee.name}</p>
          <p><strong>Phone Number:</strong> {employee.phoneNumber}</p>
          <p><strong>Job Role:</strong> {employee.jobRole}</p>
          <p><strong>Work Location:</strong> {employee.workLocation}</p>
          {canSeeSalary() && <p><strong>Salary:</strong> {employee.salary}</p>}
        </div>
      </div>
    </div>
  );
};

export default EmployeeDetails;