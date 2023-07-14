import sys
import json
import joblib
import pandas as pd
import os

dir_path = os.path.dirname(os.path.realpath(__file__))
# Load the pre-trained model
with open(os.path.join(dir_path, 'salary_model.pkl'), 'rb') as f:
    model = joblib.load(f)

# Load the encoders
with open(os.path.join(dir_path, 'job_role_encoder.pkl'), 'rb') as f:
    job_role_encoder = joblib.load(f)

with open(os.path.join(dir_path, 'work_location_encoder.pkl'), 'rb') as f:
    work_location_encoder = joblib.load(f)

# Read data from stdin
json_data = sys.stdin.read()

# Debugging line
print(f"Received JSON data: {json_data}", file=sys.stderr)

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