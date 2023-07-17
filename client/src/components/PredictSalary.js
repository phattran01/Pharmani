import React, { useState } from 'react';
import axios from 'axios';
import '../styles/PredictSalary.css';

const PredictSalary = () => {
    const [jobRole, setJobRole] = useState("");
    const [workLocation, setWorkLocation] = useState("");
    const [predictedSalary, setPredictedSalary] = useState(null);

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const response = await axios.post('/api/predict_salary', { jobRole, workLocation });
            setPredictedSalary(response.data.predictedSalary);
        } catch (error) {
            console.error(error);
        }
    };

    return (
        <div className="predictSalaryContainer">
            <h1>Predict Your Salary</h1>
            <form onSubmit={handleSubmit} className="predictForm">
                <label className="inputLabel">
                    Job Role:
                    <input className="inputField" type="text" value={jobRole} onChange={(e) => setJobRole(e.target.value)} />
                </label>
                <label className="inputLabel">
                    Work Location:
                    <input className="inputField" type="text" value={workLocation} onChange={(e) => setWorkLocation(e.target.value)} />
                </label>
                <input className="submitBtn" type="submit" value="Predict Salary" />
            </form>
            {predictedSalary && <h2 className="salaryDisplay">Predicted Salary: ${predictedSalary.toFixed(2)}</h2>}
        </div>
    );
};

export default PredictSalary;
