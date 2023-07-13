import joblib
import pandas as pd
import sys

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
    })

    # Predict salary
    salary = model.predict(X)
    
    return salary[0]

if __name__ == "__main__":
    jobRole = sys.argv[1]
    workLocation = sys.argv[2]
    salary = predict_salary(jobRole, workLocation)
    print(salary)
