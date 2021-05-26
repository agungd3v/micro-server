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
    console.error('Error while getting jobs : ', err.message);
    next(err);
  }
})

module.exports = {
  index
}