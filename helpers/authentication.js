const db = require('../services/db')
const jwt = require('jsonwebtoken')
const hash = require('password-hash')
require('dotenv').config()

function getUser (obj) {
  if (!obj) return {}
  return obj
}

async function login (req, res) {
  const { email, password } = req.body;

  const query = await db.singleQueryData(`SELECT * FROM users where email='${email}' AND password='${password}'`)

  const user = getUser(query)

  if (user) {
    // Generate an access token
    const accessToken = jwt.sign({ email: user.email,  role: user.role }, process.env.SECRET_TOKEN);

    res.json({
      status: true,
      user: user,
      accessToken
    });
  } else {
    res.send('Username or password incorrect');
  }
}

async function register (req, res) {
  const { name, email, password } = req.body

  const passwordHash = hash.generate(password)

  try {
    const query = await db.singleQueryData(`INSERT INTO users (name, email, password) VALUES ('${name}', '${email}', '${passwordHash}')`)
    
    const user = getUser(query)
    
    res.json({
      status: true,
      message: 'Successfully create user',
      data: {
        name: name,
        email: email
      }
    })
  } catch (error) {
    res.json({
      status: false,
      message: 'Error : ' + error.message
    })
  }
}

module.exports = {
  login,
  register
}