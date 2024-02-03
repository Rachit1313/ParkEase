require('dotenv').config();
const mysql = require('mysql');
const logger = require('./logger');

// MySQL connection
const db = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE
});

db.connect((err) => {
  if (err) {
    logger.error('Error connecting to MySQL', err);
    throw err;
  }
  logger.info('Connected to MySQL');
});

module.exports = db;