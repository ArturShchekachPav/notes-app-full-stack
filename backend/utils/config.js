const mysql = require('mysql2/promise')

const db = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'Fins1234',
  database: 'student_db'
});

module.exports = {
  db,
}