
// File: getGarages.js
// ------------------
// This file contains the getGarages route implementation for the ParkEase project

// Author: Heavendeep kaur
// Date: February 22, 2024

const db = require('../../database');
const logger = require('../../logger');

module.exports = async (req, res) => {
  try {
    // SQL query to select all garages
    const sql = "SELECT * FROM ParkingGarage";

    db.query(sql, async (err, results) => {
      if (err) {
        logger.error('Error fetching garages:', err);
        return res.status(500).send('Error fetching garages');
      }

      // If no garages are found
      if (results.length === 0) {
        return res.status(404).send('No garages found');
      }

      logger.info(results);
      // Send the list of garages to the client
      res.status(200).json(results);
    });
  } catch (err) {
    logger.error(err);
    res.status(500).send('Server error');
  }
};