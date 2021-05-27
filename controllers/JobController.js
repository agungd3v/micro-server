const job = require('../models/jobs')

const jobs = {
  index: async (req, res, next) => {
    try {
      res.json({
        status: true,
        message: await job.getAll(req.query.page)
      })
    } catch (error) {
      console.error('Error while getting jobs : ', error.message);
      next(error);
    }
  },
  store: async (req, res, next) => {
    try {
      res.json({
        status: true,
        message: await job.storeData(req.body)
      })
    } catch (error) {
      console.error('Error while saving job : ', error.message)
      next(error)
    }
  }
}

module.exports = jobs