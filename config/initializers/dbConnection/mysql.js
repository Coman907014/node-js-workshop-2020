
const mysql = require('mysql');

module.exports = callback => {
  const pool = mysql.createPool({
    host: process.env.MYSQL_HOST_IP,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
  });

  global.db = pool;

  callback();
};
