const mysql = require('mysql2')

const mysqlConnection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'Fins1234'
}).promise();

mysqlConnection.query('CREATE DATABASE IF NOT EXISTS notesdb');

mysqlConnection.end();

const dbConnection = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'Fins1234',
  database: 'notesdb'
}).promise();

dbConnection.query('CREATE TABLE IF NOT EXIST users(id int primary key auto_increment, name varchar(255) not null, email varchar(255) not null, password varchar(255) not null)');

dbConnection.query('CREATE TABLE IF NOT EXIST notes(id int primary key auto_increment, title varchar(255) not null, owner int not null, list int, content varchar(255), color int not null)');

dbConnection.query('CREATE TABLE IF NOT EXIST colors(id int primary key auto_increment, title varchar(255) not null, hex varchar(255) not null)');

dbConnection.query('CREATE TABLE IF NOT EXIST lists(id int primary key auto_increment, title varchar(255) not null, owner int not null)');

module.exports = {
  dbConnection,
}