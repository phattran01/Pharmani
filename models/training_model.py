import pandas as pd
import pickle
from sklearn.linear_model import LinearRegression
from sklearn.preprocessing import LabelEncoder
from pymongo import MongoClient

# IMPORTANT :: Requires populated MongoDB collection 'employees' 
client = MongoClient('mongodb://localhost:27017/')
db = client['hackathon_travelers']
employees = db['employees']

# Fetch data from collection
data = []
for employee in employees.find():
    data.append({
        'jobRole': employee['jobRole'],
        'workLocation': employee['workLocation'],
        'salary': employee['salary']
    })

# Create pandas DataFrame
df = pd.DataFrame(data)

# Encode categories
jobRole_encoder = LabelEncoder()
df['jobRole'] = jobRole_encoder.fit_transform(df['jobRole'])

workLocation_encoder = LabelEncoder()
df['workLocation'] = workLocation_encoder.fit_transform(df['workLocation'])

# Split into features (X) and target variable (y)
X = df[['jobRole', 'workLocation']]
y = df['salary']

# Create and train linear regression model
model = LinearRegression()
model.fit(X, y)

# Save model and encoders
with open('model.pkl', 'wb') as model_file, open('jobRole_encoder.pkl', 'wb') as jobRole_file, open('workLocation_encoder.pkl', 'wb') as workLocation_file:
    pickle.dump(model, model_file)
    pickle.dump(jobRole_encoder, jobRole_file)
    pickle.dump(workLocation_encoder, workLocation_file)
