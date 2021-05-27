const express = require('express')
const router = express.Router()
const job = require('../models/jobs')
const auth = require('../middleware/auth')

const index = router.get('/jobs', auth.authenticateJWT, async (req, res, next) => {
  try {
    res.json({
      status: true,
      message: await job.getAll(req.query.page)
    })
  } catch (error) {
    console.error('Error while getting jobs : ', error.message);
    next(error);
  }
})

const store = router.post('/jobs/store', auth.authenticateJWT, async (req, res, next) => {
  try {
    res.json({
      status: true,
      message: await job.storeData(req.body)
    })
  } catch (error) {
    console.error('Error while saving job : ', error.message)
    next(error)
  }
})

module.exports = {
  index,
  store
}