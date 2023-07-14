import React, { useState } from 'react';
import axios from 'axios';

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
        <div>
            <form onSubmit={handleSubmit}>
                <label>
                    Job Role:
                    <input type="text" value={jobRole} onChange={(e) => setJobRole(e.target.value)} />
                </label>
                <label>
                    Work Location:
                    <input type="text" value={workLocation} onChange={(e) => setWorkLocation(e.target.value)} />
                </label>
                <input type="submit" value="Predict Salary" />
            </form>
            {predictedSalary && <h2>Predicted Salary: {predictedSalary}</h2>}
        </div>
    );
};

export default PredictSalary;
