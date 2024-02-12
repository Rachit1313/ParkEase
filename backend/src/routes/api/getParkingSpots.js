// File: getParkingSpots.js
// ------------------
// This file contains the getParkingSpots route implementation for the ParkEase project

// Author: Rachit Chawla
// Date: February 2, 2024

const db = require('../../database');
const logger = require('../../logger');

module.exports = async (req, res) => {
  try {
    // SQL query to select parking spots that are currently vacant
    const sql = "SELECT * FROM ParkingSpot WHERE Status = 'Vacant'";

    db.query(sql, async (err, results) => {
      if (err) {
        logger.error('Error fetching available parking spots:', err);
        return res.status(500).send('Error fetching available parking spots');
      }

      // If no available spots are found
      if (results.length === 0) {
        return res.status(404).send('No available parking spots found');
      }

      logger.info(results);
      // Send the list of available parking spots to the client
      res.status(200).json(results);
    });
  } catch (err) {
    logger.error(err);
    res.status(500).send('Server error');
  }
};