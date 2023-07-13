import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

const EmployeeDetails = () => {
  const { id } = useParams();
  const [employee, setEmployee] = useState(null);

  useEffect(() => {
    fetch(`http://localhost:4000/api/employees/${id}`)
      .then((response) => response.json())
      .then((data) => setEmployee(data));
  }, [id]);

  if (!employee) {
    return <div>Loading...</div>;
  }

  return (
    <div>
      <h2>Employee Details</h2>
      <p>Name: {employee.name}</p>
      <p>Phone Number: {employee.phoneNumber}</p>
      <p>Job Role: {employee.jobRole}</p>
      <p>Work Location: {employee.workLocation}</p>
      <p>Salary: {employee.salary}</p>
    </div>
  );
};

export default EmployeeDetails;