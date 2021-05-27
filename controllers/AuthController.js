const express = require('express')
const router = express.Router()
const authenctication = require('../helpers/authentication')
// const jwt = require('jsonwebtoken')
// require('dotenv').config()

const login = router.post('/login', authenctication.login)
const register = router.post('/register', authenctication.register)
// const users = [
//   {
//     username: 'john',
//     password: 'password123admin',
//     role: 'admin'
//   }, {
//     username: 'anna',
//     password: 'password123member',
//     role: 'member'
//   }
// ];

// const login = router.post('/login', (req, res) => {
//   // Read username and password from request body
//   const { username, password } = req.body;

//   // Filter user from the users array by username and password
//   const user = users.find(u => { return u.username === username && u.password === password });

//   if (user) {
//     // Generate an access token
//     const accessToken = jwt.sign({ username: user.username,  role: user.role }, process.env.SECRET_TOKEN);

//     res.json({
//       user: user,
//       accessToken
//     });
//   } else {
//     res.send('Username or password incorrect');
//   }
// });

module.exports = {
  login,
  register
}