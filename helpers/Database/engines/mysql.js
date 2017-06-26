'use strict';

const mysql = require('mysql2');

module.exports = (configs) => {
  const connection = mysql.createConnection(configs);

  connection.connect();
  connection.query('SELECT 1 + 1 AS test', (err, rows, fields) => {
    if (err) throw err;
    console.log('fields: ' + fields + '\nThe test is: ', rows[0].test);
  });
  connection.end();

  return connection;
};
