// get the client
const mysql = require('mysql2/promise');

// Create the connection pool. The pool-specific settings are the defaults
const pool = mysql.createPool({
  host: "15.164.171.167",
  user: "mj3meal",
  password: "981107",
  database: "RCcarDB",
  waitForConnections: true,
  connectionLimit: 10,
  queueLimit: 0
});

module.exports = pool