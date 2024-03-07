// File: getCustomerVehicles.js
// ------------------
// This file contains the saved number plates route implementation for the ParkEase project

// Author: Rachit Chawla
// Date: March 4th, 2024
const db = require('../../database');
const logger = require('../../logger');

module.exports = async (req, res) => {
  try {
    const { customerId } = req.params;
    logger.info("Fetching saved number plates for cust id " + customerId)

    if (!customerId) {
      return res.status(400).send('Customer ID is required');
    }

    const sql = `
      SELECT 
        PlateNumber, CustomerID, MakeModel
      FROM NumberPlate
      WHERE CustomerID = ?
    `;

    db.query(sql, [customerId], (err, results) => {
      if (err) {
        logger.error('Error fetching saved number plates: ' + err);
        return res.status(500).send('Error fetching saved number plates');
      }

      // If no number plates found, return an empty array
      if (results.length === 0) {
        return res.status(404).send('No saved number plates found for the given customer ID');
      }

      // Return the saved number plates as an array of JSON objects
      res.status(200).json(results);
    });
  } catch (err) {
    logger.error('Error in getSavedPlates: ' + err);
    res.status(500).send('An error occurred while fetching saved number plates');
  }
};