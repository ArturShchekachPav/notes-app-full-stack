const mysql = require('mysql2')

const dbConnection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Fins1234',
  database: 'student_db'
}).promise();

module.exports = {
  dbConnection,
}