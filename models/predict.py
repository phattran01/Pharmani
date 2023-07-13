import joblib
import pandas as pd
import sys

# Load the model and encoders
model = joblib.load('salary_model.pkl')
job_role_encoder = joblib.load('job_role_encoder.pkl')
work_location_encoder = joblib.load('work_location_encoder.pkl')

# Read inputs from the command line
jobRole = sys.argv[1]
workLocation = sys.argv[2]

# Perform label encoding with handling for unseen labels
try:
    jobRole_encoded = job_role_encoder.transform([jobRole])
except ValueError:
    print("Unseen label for jobRole")
    sys.exit(1)

try:
    workLocation_encoded = work_location_encoder.transform([workLocation])
except ValueError:
    print("Unseen label for workLocation")
    sys.exit(1)

# Create a DataFrame
X = pd.DataFrame({
    'jobRole': jobRole_encoded,
    'workLocation': workLocation_encoded
}, index=[0])

# Predict salary
predicted_salary = model.predict(X)

# Output the prediction
print(predicted_salary[0])
