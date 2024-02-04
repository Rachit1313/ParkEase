// File: database.js
// ------------------
// This file contains the database connection details for the ParkEase project

// Author: Rachit Chawla
// Date: February 2, 2024

require('dotenv').config();
const mysql = require('mysql');
const logger = require('./logger');

// MySQL connection pool
const db = mysql.createPool({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE
});

db.getConnection((err, connection) => {
  if (err) {
    logger.error('Error connecting to MySQL', err);
    throw err;
  }
  if (connection) connection.release();
  logger.info('Connected to MySQL');
});

module.exports = db;