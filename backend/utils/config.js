const mysql = require('mysql2');

const dbConnection = mysql.createPool({
  host: 'localhost',
  user: 'root',
  password: 'Fins1234',
  database: 'notes_db',
}).promise();

const usersTable = `create table if not exists users(
  user_id int auto_increment primary key,
  name varchar(255) not null,
  email varchar(255) not null unique,
  password varchar(255) not null
)`;

const colorsTable = `create table if not exists colors(
  color_id int auto_increment primary key,
  color varchar(255) not null unique,
  hex varchar(255) not null unique
)`;

const listsTable = `create table if not exists lists(
  list_id int auto_increment unique,
  list varchar(255) not null,
  user_id int not null,
  primary key (list, user_id),
  foreign key (user_id)  references users (user_id)
)`;

const notesTable = `create table if not exists notes(
  note_id int auto_increment primary key,
  note varchar(255) default 'Untitled',
  user_id int not null,
  list_id int,
  content text not null,
  color_id int,
  foreign key (user_id)  references users (user_id),
  foreign key (list_id)  references lists (list_id),
  foreign key (color_id)  references colors (color_id)
)`;

dbConnection.query(usersTable);
dbConnection.query(colorsTable);
dbConnection.query(listsTable);
dbConnection.query(notesTable);

module.exports = {
  dbConnection,
};
