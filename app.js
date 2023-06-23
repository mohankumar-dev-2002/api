const express = require('express');
const faker = require('faker');
const app = express();

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
  'lkjhgfdsaq'
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

const dummyUserData = generateDummyUserData(1000);

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
