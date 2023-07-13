import React, { useState } from 'react';
import axios from 'axios';

function SalaryPredictor() {
    const [jobRole, setJobRole] = useState("");
    const [workLocation, setWorkLocation] = useState("");
    const [predictedSalary, setPredictedSalary] = useState(null);

    const predictSalary = async () => {
        try {
            const response = await axios.post('http://localhost:4000/api/predict_salary', {
                jobRole,
                workLocation
            });
            setPredictedSalary(response.data.predictedSalary);
        } catch (error) {
            console.error(`Error predicting salary: ${error}`);
        }
    }

    return (
        <div>
            <input 
                type="text" 
                value={jobRole} 
                onChange={e => setJobRole(e.target.value)} 
                placeholder="Job Role" 
            />
            <input 
                type="text" 
                value={workLocation} 
                onChange={e => setWorkLocation(e.target.value)} 
                placeholder="Work Location" 
            />
            <button onClick={predictSalary}>Predict Salary</button>

            {predictedSalary && <h2>Predicted Salary: {predictedSalary}</h2>}
        </div>
    );
}

export default SalaryPredictor;
