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

  const query = await db.singleQueryData(`SELECT * FROM users where email='${email}'`)

  const user = getUser(query)

  if (user) {
    const passwordVerify = hash.verify(password, user.password)
    
    if (passwordVerify) {
      const accessToken = jwt.sign({ email: user.email, id: user.id }, process.env.SECRET_TOKEN, { expiresIn: '1h' });
  
      res.json({
        status: true,
        message: user,
        token: accessToken
      });
    } else {
      res.json({
        status: false,
        message: 'Incorrect password, check your password again'
      })
    }
  } else {
    res.json({
      status: false,
      message: 'Incorrect email or password'
    })
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
      message: {
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