from pymongo import MongoClient
from bson.objectid import ObjectId

client = MongoClient('mongodb://localhost:27017/')
db = client['hackathon_travelers']  # Replace with your database name

employee = {
    "id": 'a70b544b-e9fa-435b-b1d9-810cd3d30dpt',
    "name": 'Phat Tran',
    "phoneNumber": '2039237866',
    "jobCategory": 'Engineering',
    "jobRole": 'Data Engineer',
    "workLocation": 'Hartford',
    "salary": 123123,
    "manager": ObjectId("64b4c21fd370a13cd36b6c33"),
    "role": 'Employee',
    "gender": 'men',
    "username": 'ptran',
    "password": '1qa@WS3ed4rf',
    "photo": 'https://media.licdn.com/dms/image/D4E03AQGk2psalUZW6A/profile-displayphoto-shrink_200_200/0/1667519754258?e=1695254400&v=beta&t=JCzNWT3CcbHsJ8dyVmXnB46e1_jmixfpOyn-8pAOp0c'
}

employees = db['employees']  # Replace with your collection name
result = employees.insert_one(employee)

print(f"Employee inserted with id {result.inserted_id}")