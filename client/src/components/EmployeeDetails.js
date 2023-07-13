import React, { useState, useEffect, useContext } from 'react';
import { useParams } from 'react-router-dom';
import UserContext from '../UserContext';

const EmployeeDetails = () => {
  const { id } = useParams();
  const [employee, setEmployee] = useState(null);
  const { user } = useContext(UserContext); // get the current user from context

  useEffect(() => {
    fetch(`http://localhost:4000/api/employees/${id}`)
    .then((response) => response.json())
    .then((data) => setEmployee(data));
  }, [id]);

  if (!employee) {
    return <div>Loading...</div>;
  }

  // Checks if the user has permission to see the salary
  const canSeeSalary = () => {
    if (!user) {
      return false;
    }
    if (user.role === "HR" || user.username === employee.manager || user.username === employee.username) {
      return true;
    }
    return false;
  };

  return (
    <div>
      <h2>Employee Details</h2>
      <p>Name: {employee.name}</p>
      <p>Phone Number: {employee.phoneNumber}</p>
      <p>Job Role: {employee.jobRole}</p>
      <p>Work Location: {employee.workLocation}</p>
      {canSeeSalary() && <p>Salary: {employee.salary}</p>}
    </div>
  );
};

export default EmployeeDetails;