import sys
import joblib
import pandas as pd

# Load the model and encoders
model = joblib.load('salary_model.pkl')
label_encoder = joblib.load('label_encoder.pkl')

def predict_salary(jobRole, workLocation):
    jobRole_encoded = label_encoder.transform([jobRole])
    workLocation_encoded = label_encoder.transform([workLocation])

    # Create DataFrame
    X = pd.DataFrame({
        'jobRole': jobRole_encoded,
        'workLocation': workLocation_encoded
    }, index=[0])  # <--- important

    # Predict salary
    salary = model.predict(X)
    
    return salary[0]

if __name__ == "__main__":
    job_role = sys.argv[1]
    work_location = sys.argv[2]

    predicted_salary = predict_salary(job_role, work_location)

    print(predicted_salary)  # print the result so it can be captured by PythonShell
