const mysql = require('mysql2');
const db = mysql.createConnection(
    {
      host: 'localhost',
      user: 'root',
      password: 'LuketheDBA',
      database: 'business_db'
    }
);

module.exports = db;