// File: login.js
// ------------------
// This file contains the login route implementation for the ParkEase project

// Author: Rachit Chawla
// Date: February 23, 2024

const jwt = require('jsonwebtoken');
const bcrypt = require('bcryptjs'); 
const db = require('../../database');
const logger = require('../../logger');

module.exports = async (req, res) => {
  try {
    const { email, password } = req.body;
    logger.info(req.body);
    if (!email || !password) {
      return res.status(400).send('Email and password are required');
    }

    // Update the SQL query to select the user by email
    const sql = 'SELECT * FROM Users WHERE email = ?';
    db.query(sql, [email], async (err, results) => {
      if (err) {
        logger.error('Login error' + err);
        return res.status(500).send('Error logging in');
      }
      if (results.length === 0) {
        return res.status(401).send('Incorrect email or password');
      }

      logger.info(results);
      const user = results[0];
      const passwordIsValid = await bcrypt.compare(password, user.Password);
      if (!passwordIsValid) {
        return res.status(401).send('Incorrect email or password');
      }

      // Sign the JWT with the user's ID
      const token = jwt.sign({ id: user.UserID }, process.env.JWT_SECRET, {
        expiresIn: '1h'
      });

      // Query to get additional details based on userType
      let detailsSql = '';
      switch (user.UserType) {
        case 'Customer':
          detailsSql = 'SELECT * FROM Customer WHERE CustomerID = ?';
          break;
        case 'Admin':
          detailsSql = 'SELECT * FROM Admin WHERE AdminID = ?';
          break;
        case 'Invigilator':
          detailsSql = 'SELECT * FROM Invigilator WHERE InvigilatorID = ?';
          break;
        default:
          return res.status(500).send('Unknown user type');
      }

      db.query(detailsSql, [user.UserID], (err, userDetails) => {
        if (err) {
          logger.error('Error fetching user details: ' + err);
          return res.status(500).send('Error fetching user details');
        }

        // Send the token, userType, and userDetails to the client
        res.status(200).json({ token, userType: user.UserType, userDetails: userDetails[0] });
      });
    });
  } catch (err) {
    logger.error(err);
    res.status(500).send('An error occurred');
  }
};