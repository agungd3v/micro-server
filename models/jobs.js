const db = require('../services/db')
const paginate = require('../helpers/paginate')
const config = require('../config/database')

async function getAll (page = 1) {
  const offset = paginate.getOffset(page, config.listPerPage)
  const rows = await db.query('SELECT * FROM jobs LIMIT ?,?', [
    offset,
    config.listPerPage
  ])
  const data = paginate.getRows(rows)
  const meta = { page }
  return { data, meta }
}

async function storeData (request) {
  const { name } = request
  try {
    const job = await db.query(`INSERT INTO jobs (name) VALUES ('${name}')`)
    return { name }
  } catch (error) {
    return error
  }
}

module.exports = {
  getAll,
  storeData
}