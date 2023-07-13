import sys
import json
import joblib
import pandas as pd

# Load the model and encoders
model = joblib.load('C:/Hackathon/Pharmani/models/salary_model.pkl')
job_role_encoder = joblib.load('C:/Hackathon/Pharmani/models/job_role_encoder.pkl')
work_location_encoder = joblib.load('C:/Hackathon/Pharmani/models/work_location_encoder.pkl')

# Read JSON input from command line
input_data = json.loads(sys.argv[1])

# Read the job role and location from the input data
jobRole = input_data['jobRole']
workLocation = input_data['workLocation']

# Perform label encoding
jobRole_encoded = job_role_encoder.transform([jobRole])
workLocation_encoded = work_location_encoder.transform([workLocation])

# Create a DataFrame
X = pd.DataFrame({
    'jobRole': jobRole_encoded,
    'workLocation': workLocation_encoded
}, index=[0])

# Predict salary
predicted_salary = model.predict(X)

# Output the prediction
print(predicted_salary[0])
