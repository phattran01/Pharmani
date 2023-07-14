import sys
import json
import pickle
import pandas as pd

# Load the pre-trained model
with open('./salary_model.pkl', 'rb') as f:
    model = pickle.load(f)

# Load the encoders
with open('./job_role_encoder.pkl', 'rb') as f:
    job_role_encoder = pickle.load(f)

with open('./work_location_encoder.pkl', 'rb') as f:
    work_location_encoder = pickle.load(f)

# Read data from stdin
json_data = sys.stdin.read()

try:
    data = json.loads(json_data)
except json.JSONDecodeError:
    print(json.dumps({"error": "Invalid JSON"}))
    sys.exit(1)

try:
    jobRole = data['jobRole']
    workLocation = data['workLocation']
except KeyError:
    print(json.dumps({"error": "Invalid input format. Expected fields: jobRole, workLocation"}))
    sys.exit(1)

# Perform label encoding
jobRole_encoded = job_role_encoder.transform([jobRole])
workLocation_encoded = work_location_encoder.transform([workLocation])

# Perform the prediction
df = pd.DataFrame(list(zip(jobRole_encoded, workLocation_encoded)), columns=['jobRole', 'workLocation'])
prediction = model.predict(df)

print(json.dumps({"predictedSalary": prediction.tolist()[0]}))
