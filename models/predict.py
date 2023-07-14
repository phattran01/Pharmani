import sys
import json
import pickle
import pandas as pd

# Load the pre-trained model
with open('C:/Workspace/Pharmani/models/salary_model.pkl', 'rb') as f:
    model = pickle.load(f)

# Load the encoders
with open('C:/Workspace/Pharmani/models/job_role_encoder.pkl', 'rb') as f:
    job_role_encoder = pickle.load(f)

with open('C:/Workspace/Pharmani/models/work_location_encoder.pkl', 'rb') as f:
    work_location_encoder = pickle.load(f)

# Read data from stdin
json_data = sys.stdin.read()
data = json.loads(json_data)
jobRole = [item['jobRole'] for item in data]
workLocation = [item['workLocation'] for item in data]

# Perform label encoding
jobRole_encoded = job_role_encoder.transform(jobRole)
workLocation_encoded = work_location_encoder.transform(workLocation)

# Perform the prediction
df = pd.DataFrame(list(zip(jobRole_encoded, workLocation_encoded)), columns=['jobRole', 'workLocation'])
predictions = model.predict(df)
print(predictions)
