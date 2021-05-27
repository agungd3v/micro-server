const express = require('express')
const router = express.Router()
const auth = require('../middleware/auth')

const jobController = require('../controllers/JobController')
const authController = require('../controllers/AuthController')

express.application.prefix = express.Router.prefix = function(path, middleware, configure) {
  configure(router);
  this.use(path, middleware, router);
  return router;
}

const login = router.post('/login', authController.login)
const register = router.post('/register', authController.register)

const jobs = router.prefix('/jobs', auth.authenticateJWT, (router) => {
  router.get('/', jobController.index)
  router.post('/store', jobController.store)
})

module.exports = {
  jobs,
  login,
  register
}