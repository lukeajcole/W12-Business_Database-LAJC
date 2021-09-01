const mysql = require('mysql2');
const db = mysql.createConnection(
    {
      host: 'localhost',
      user: 'root',
      password: 'LuketheDBA',
      database: 'business_db',
      multipleStatements: true
    }
);

module.exports = db;