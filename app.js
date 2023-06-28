const express = require('express');
const faker = require('faker');
const app = express();
app.use(function(req, res, next) {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:3000');
  // You can also set other CORS headers if needed
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  // Set the Access-Control-Allow-Credentials header if your client makes requests with credentials (e.g., cookies)
  res.setHeader('Access-Control-Allow-Credentials', 'true');
  next();
});

const apiKeys = [
  '3ffg5h7j8k',
  '1a2b3c4d5e',
  'qwertyuiop',
  '9z8x7y6w5v',
  '6y7u8i9o0p',
  'asdfghjklz',
  'poiuytrewq',
  'mnbvcxzlkj',
  '0987654321',
  'lkjhgfdsaq',
  'mohankumar'
];

const generateDummyUserData = (count) => {
  const users = [];
  for (let i = 1; i <= count; i++) {
    const user = {
      id: i,
      name: faker.name.findName(),
      email: faker.internet.email(),
      age: faker.random.number({ min: 18, max: 65 }),
      city: faker.address.city()
    };
    users.push(user);
  }
  return users;
};

const dummyUserData = generateDummyUserData(10);

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
