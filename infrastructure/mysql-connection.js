import mysql from 'mysql';

const connection = mysql.createConnection({
  host: 'localhost',
  port: 3306,
  user: 'admin',
  password: '123456',
  database: 'agenda-petshop'
});

export default connection;
