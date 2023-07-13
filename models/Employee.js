// Exports an Employee model for interacting with a MongoDB collection of employee records
// Model is created based on an EmployeeSchema, which specifies the structure of an employee 
// document, including fields like name, phoneNumber, jobRole, workLocation, salary, manager, and role.
// Allows for querying, creating, updating, and deleting employee records in MongoDB using the defined model
const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EmployeeSchema = new Schema({
    id: String,
    name: String,
    phoneNumber: String,
    jobCategory: String,
    jobRole: String,
    workLocation: String,
    salary: Number,
    manager: Schema.Types.ObjectId,
    role: String
});

const Employee = mongoose.model('Employee', EmployeeSchema);

module.exports = Employee;