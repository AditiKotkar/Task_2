const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const port = 3000;

// data
const users = [
  { name:'user1', rollNo: '001', password: 'pass123' },
  { name:'user1', rollNo: '002', password: 'pass456' },
  // Add more data
];

// JSON in request body
app.use(bodyParser.json());

// API endpoint to get data roll number
app.get('/api/users/:rollNo', (req, res) => {
  const rollNo = req.params.rollNo;
  const users = users.find(u => u.rollNo === rollNo);

  if (users) {
    res.json(users);
  } else {
    res.status(404).json({ error: 'Student not found' });
  }
});

// API endpoint to verify users credentials
app.post('/api/verify', (req, res) => {
  const { rollNo, password } = req.body;
  const users = users.find(s => u.rollNo === rollNo && u.password === password);

  if (users) {
    res.json({ message: 'Credentials are correct' });
  } else {
    res.status(401).json({ error: 'Invalid credentials' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on http://localhost:${port}`);
});
