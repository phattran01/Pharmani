const mongoose = require('mongoose');
const Schema = mongoose.Schema;

const EmployeeSchema = new Schema({
  name: String,
  phoneNumber: String,
  jobRole: String,
  workLocation: String,
  salary: Number,
  manager: Schema.Types.ObjectId,
  role: String
});

const Employee = mongoose.model('Employee', EmployeeSchema);

module.exports = Employee;