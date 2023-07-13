import pandas as pd
from pymongo import MongoClient
from sklearn.linear_model import LinearRegression
from sklearn.preprocessing import LabelEncoder
import joblib

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
label_encoder = LabelEncoder()
df['jobRole'] = label_encoder.fit_transform(df['jobRole'])
df['workLocation'] = label_encoder.fit_transform(df['workLocation'])

# Split into features (X) and target variable (y)
X = df[['jobRole', 'workLocation']]
y = df['salary']

# Create and train linear regression model
model = LinearRegression()
model.fit(X, y)

# Save the model
joblib.dump(model, 'salary_model.pkl')

# Save the encoders
joblib.dump(label_encoder, 'label_encoder.pkl')
