// File: getAllCustomers.js
// ------------------
// This file contains the getAllCustomers route implementation for the ParkEase project

// Author: Rachit Chawla 
// Date: March 14, 2024

const db = require('../../database');
const logger = require('../../logger');

module.exports = async (req, res) => {
  try {
    // SQL query to select all garages
    const sql = "SELECT * FROM Customer";

    db.query(sql, async (err, results) => {
      if (err) {
        logger.error('Error fetching customers:', err);
        return res.status(500).send('Error fetching customers');
      }

      // If no Customers are found
      if (results.length === 0) {
        return res.status(404).send('No Customers found');
      }

      // Send the list of Customers to the client
      res.status(200).json(results);
    });
  } catch (err) {
    logger.error(err);
    res.status(500).send('Server error');
  }
};