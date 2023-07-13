const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const Employee = require('../models/Employee');

const app = express();
const port = 4000;

// Enable CORS
app.use(cors());

// Connect to MongoDB
mongoose.connect('mongodb://localhost:27017/hackathon_travelers', {
    useNewUrlParser: true,
    useUnifiedTopology: true
});

app.use(express.json()); // Use middleware to parse JSON

app.get('/api/test', (req, res) => {
    res.json({ message: 'Hello from server!' });
});

// POST a new employee
app.post('/api/employees', async (req, res) => { 
    const newEmployee = new Employee(req.body);

    try {
        await newEmployee.save();
        res.json(newEmployee);
    } catch(err) {
        res.status(400).json({ message: err.message });
    }
});
// GET all employees
app.get('/api/employees', async (req, res) => {
    try {
        const employees = await Employee.find();
        res.json(employees);
    } catch(err) {
        res.status(500).json({ message: err.message });
    }
});
// GET an employee by UUID
app.get('/api/employees/:id', async (req, res) => {
    try {
        const employee = await Employee.findOne({ id: req.params.id });
        if(employee == null) {
            return res.status(404).json({ message: 'Employee not found' });
        }
        res.json(employee);
    } catch(err) {
        res.status(500).json({ message: err.message });
    }
});

// PUT (update) an existing employee
app.put('/api/employees/:id', async (req, res) => {
    try {
        const employee = await Employee.findById(req.params.id);
        if(employee == null) {
            return res.status(404).json({ message: 'Employee not found' });
        }

        if(req.body.name != null) {
            employee.name = req.body.name;
        }
        if(req.body.phoneNumber != null) {
            employee.phoneNumber = req.body.phoneNumber;
        }
        if(req.body.jobRole != null) {
            employee.jobRole = req.body.jobRole;
        }
        if(req.body.workLocation != null) {
            employee.workLocation = req.body.workLocation;
        }
        if(req.body.salary != null) {
            employee.salary = req.body.salary;
        }
        if(req.body.manager != null) {
            employee.manager = req.body.manager;
        }
        if(req.body.role != null) {
            employee.role = req.body.role;
        }

        const updatedEmployee = await employee.save();
        res.json(updatedEmployee);
    } catch(err) {
        res.status(500).json({ message: err.message });
    }
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});

// Test Data

const { PythonShell } = require('python-shell');

app.post('/api/predict', (req, res) => {
    const { jobRole, workLocation } = req.body;

    let options = {
        mode: 'text',
        pythonOptions: ['-u'],
        scriptPath: '/path/to/',
        args: [jobRole, workLocation]
    };

    PythonShell.run('predict.py', options, function(err, results) {
        if (err) throw err; // generic error
        res.json({ predictedSalary: results[0] });
    });
});
