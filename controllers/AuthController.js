const express = require('express')
const router = express.Router()
const jwt = require('jsonwebtoken');
const users = [
  {
    username: 'john',
    password: 'password123admin',
    role: 'admin'
  }, {
    username: 'anna',
    password: 'password123member',
    role: 'member'
  }
];
const accessTokenSecret = 'agungd3v';

const login = router.post('/login', (req, res) => {
  // Read username and password from request body
  const { username, password } = req.body;

  // Filter user from the users array by username and password
  const user = users.find(u => { return u.username === username && u.password === password });

  if (user) {
      // Generate an access token
      const accessToken = jwt.sign({ username: user.username,  role: user.role }, accessTokenSecret);

      res.json({
        user: user,
        accessToken
      });
  } else {
      res.send('Username or password incorrect');
  }
});

module.exports = {
  login
}