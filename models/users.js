const db = require('../services/db')
const paginate = require('../helpers/paginate')
const config = require('../config/database')

async function getAll (page = 1) {
  const offset = paginate.getOffset(page, config.listPerPage)
  const rows = await db.query('SELECT name FROM users LIMIT ?,?', [
    offset,
    config.listPerPage
  ])

  const data = paginate.getRows(rows)
  const meta = { page }

  return { data, meta }
}

module.exports = {
  getAll
}