import React, { useState } from 'react';

const SalaryPredictor = () => {
    const [jobRole, setJobRole] = useState('');
    const [workLocation, setWorkLocation] = useState('');
    const [predictedSalary, setPredictedSalary] = useState(null);
    const [isLoading, setIsLoading] = useState(false);

    const handlePredictSalary = async () => {
        const payload = {
            jobRole,
            workLocation
        };
        setIsLoading(true);
        try {
            const response = await fetch('/api/predict_salary', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(payload)
            });
            const data = await response.json();
            setPredictedSalary(data.predictedSalary);
        } catch (err) {
            console.error(err);
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div>
            <h1>Salary Predictor</h1>
            <div>
                <label>Job Role</label>
                <input
                    type="text"
                    value={jobRole}
                    onChange={e => setJobRole(e.target.value)}
                />
            </div>
            <div>
                <label>Work Location</label>
                <input
                    type="text"
                    value={workLocation}
                    onChange={e => setWorkLocation(e.target.value)}
                />
            </div>
            <button onClick={handlePredictSalary} disabled={isLoading}>
                Predict Salary
            </button>
            {predictedSalary && (
                <h2>Predicted Salary: {predictedSalary}</h2>
            )}
        </div>
    );
};

export default SalaryPredictor;
