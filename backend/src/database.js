// File: database.js
// ------------------
// This file contains the database connection details for the ParkEase project

// Author: Rachit Chawla
// Date: February 2, 2024

require('dotenv').config();
const mysql = require('mysql');
const logger = require('./logger');

// Create a connection pool instead of a single connection
const pool = mysql.createPool({
  connectionLimit: 10, // Maximum number of connections in the pool
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_DATABASE
});

pool.on('connection', (connection) => {
  logger.info('MySQL pool connected: threadId ' + connection.threadId);
});

// Export the pool
module.exports = pool;
