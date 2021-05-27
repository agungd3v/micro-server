const mysql = require('mysql2/promise')
const config = require('../config/database')

async function query (sql, params) {
  const connection = await mysql.createConnection(config.connection)
  const [results, ] = await connection.execute(sql, params)
  return results
}

async function singleQueryData (sql) {
  const connection = await mysql.createConnection(config.connection)
  const [result, ] = await connection.execute(sql)
  return result[0]
}

module.exports = {
  query,
  singleQueryData
}