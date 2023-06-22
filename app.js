const express = require('express');
const app = express();

const apiKeys = ['key1', 'key2', 'key3'];

const dummyUserData = [
  { id: 1, name: 'John Doe', email: 'johndoe@example.com', age: 30, city: 'New York' },
  { id: 2, name: 'Jane Smith', email: 'janesmith@example.com', age: 25, city: 'London' },
  { id: 3, name: 'Bob Johnson', email: 'bobjohnson@example.com', age: 40, city: 'Sydney' },
  // Add more user objects with different properties
  { id: 4, name: 'Alice Brown', email: 'alicebrown@example.com', age: 35, city: 'Tokyo' },
  { id: 5, name: 'Michael Lee', email: 'michaellee@example.com', age: 28, city: 'Paris' },
];

const authenticateApiKey = (req, res, next) => {
  const apiKey = req.query.apiKey;

  if (!apiKey || !apiKeys.includes(apiKey)) {
    return res.status(401).json({ error: 'Invalid API key' });
  }

  next();
};

app.get('/users', authenticateApiKey, (req, res) => {
  res.json(dummyUserData);
});

app.listen(3000, () => {
  console.log('API server is running on port 3000');
});
