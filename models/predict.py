import joblib
import pandas as pd
import sys

# Load the model and encoders
model = joblib.load('salary_model.pkl')
label_encoder = joblib.load('label_encoder.pkl')

# Read inputs from the command line
jobRole = sys.argv[1]
workLocation = sys.argv[2]

# Perform label encoding
jobRole_encoded = label_encoder.transform([jobRole])
workLocation_encoded = label_encoder.transform([workLocation])

# Create a DataFrame
X = pd.DataFrame({
    'jobRole': jobRole_encoded,
    'workLocation': workLocation_encoded
}, index=[0])

# Predict salary
predicted_salary = model.predict(X)

# Output the prediction
print(predicted_salary[0])
