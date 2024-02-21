const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = 3000;

// In-memory user data 
const users = [
  { id: 1, name:'user1', rollNumber: '101', password: 'password1', isAuthenticated: false },
  { id: 2, name:'user2', rollNumber: '102', password: 'password2', isAuthenticated: false },
];

// JSON in request body
app.use(bodyParser.json());

// validate user authentication status
const authenticateUser = (req, res, next) => {
  const userId = req.params.id;
  const user = users.find(u => u.id == userId);

  if (!user || !user.isAuthenticated) {
    return res.status(403).json({ error: 'Unauthorized access' });
  }

  next();
};

// API endpoint to validate user ID and control access
app.get('/api/users/:id', authenticateUser, (req, res) => {
  const userId = req.params.id;
  res.json({ message: `User ID ${userId} has access` });
});

// API endpoint to verify roll number and password
app.get('/api/login', (req, res) => {
  const { rollNumber, password } = req.body;
  const user = users.find(u => u.rollNumber === rollNumber && u.password === password);

  if (!user) {
    return res.status(401).json({ error: 'Invalid credentials' });
  }

  // Set user authentication status to true
  user.isAuthenticated = true;
  
  res.json({ message: 'Login successful' });
});

// Start the server
app.listen(PORT, () => {
  console.log(`Server is running on ${PORT}`);
});
