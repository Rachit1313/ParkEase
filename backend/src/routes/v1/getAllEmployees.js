// File: getAllEmployees.js
// ------------------
// This file contains the getAllEmployees route implementation for the ParkEase project

// Author: Rachit Chawla 
// Date: March 14, 2024

const db = require('../../database');
const logger = require('../../logger');

module.exports = async (req, res) => {
  try {
    const sql = "SELECT * FROM Invigilator";

    db.query(sql, async (err, results) => {
      if (err) {
        logger.error('Error fetching Invigilators:', err);
        return res.status(500).send('Error fetching Invigilators');
      }

      if (results.length === 0) {
        return res.status(404).send('No Invigilator found');
      }

      res.status(200).json(results);
    });
  } catch (err) {
    logger.error(err);
    res.status(500).send('Server error');
  }
};