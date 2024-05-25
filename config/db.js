const mysql = require('mysql2')

const pool = mysql.createPool({
    host: process.env.DB_HOST,
    user: process.env.DB_USER,
    database: process.env.DB_NAME,
    password: process.env.DB_PASSWORD
  
  ,  host: 'localhost',
    user: 'root',
    password: 'zzzzzahra1.',
    database: 'makeupdb'
})

module.exports = pool.promise()