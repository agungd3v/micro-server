const express = require('express')
const router = express.Router()
const authenctication = require('../helpers/authentication')

const login = router.post('/login', authenctication.login)
const register = router.post('/register', authenctication.register)

module.exports = {
  login,
  register
}