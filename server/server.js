const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const Employee = require('../models/Employee');
const { PythonShell } = require('python-shell');
const path = require('path');

const app = express();
const port = 4000;

app.use(cors());
app.use(express.json());

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
        const employee = await Employee.findOne({ id: req.params.id }).populate('manager');
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

// User login route
app.post('/api/login', async (req, res) => {
    const { username, password } = req.body;
  
    try {
      // Find user in database
      const user = await Employee.findOne({ username: username });
  
      // Check if user exists
      if (!user) {
        return res.status(401).json({ success: false, message: 'Invalid username.' });
      }
  
      // Check if password matches
      if (password !== user.password) {
        return res.status(401).json({ success: false, message: 'Invalid password.' });
      }
  
      // If username and password match, login is successful
      const userResponse = { ...user._doc, password: undefined }; // make sure to not send back the password
      res.json({ success: true, user: userResponse });
  
    } catch (error) {
      res.status(500).json({ success: false, message: 'Server error.' });
    }
});

app.post('/api/predict_salary', (req, res) => {
    let options = {
        mode: 'text',
        pythonOptions: ['-u'], 
        scriptPath: 'C:/Workspace/Pharmani/models/',
        pythonPath: 'C:/Users/wasadmin/anaconda3/python.exe'
    };

    let pyshell = new PythonShell('predict.py', options);

    pyshell.on('message', function (message) {
        res.send({ predictedSalary: Number(message) });
    });

    pyshell.send(JSON.stringify(req.body));

    pyshell.end(function(err) {
        if (err) {
            res.status(500).send(err);
        }
    });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});
