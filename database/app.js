const mysql = require('mysql2')
const migration = require('mysql-migrations')
const config = require('../config/database')

const connection = mysql.createPool(config.connection)

migration.init(connection, __dirname + '/migrations', () => {
  console.log('Finished running migrations')
})