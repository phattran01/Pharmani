const express = require('express');
const app = express();
const port = 5000;

app.get('/api/test', (req, res) => {
    res.json({ message: 'Hello from server!' });
});

app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
});