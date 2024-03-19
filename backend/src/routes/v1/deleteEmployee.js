// File: deleteEmployee.js
// ------------------
// This file contains the deleteEmployee route implementation for the ParkEase project

// Author: Heavendeep kaur 
// Date: March 18, 2024

const db = require('../../database');
const logger = require('../../logger');

module.exports = async (req, res) => {
  try {
    const employeeId = req.params.employeeId; // Assuming the employee ID is passed as a parameter in the URL

    // Check if the employee exists
    const checkSql = "SELECT * FROM Invigilator WHERE InvigilatorID = ?";
    db.query(checkSql, [employeeId], async (err, results) => {
      if (err) {
        logger.error('Error checking employee:', err);
        return res.status(500).send('Error checking employee');
      }

      if (results.length === 0) {
        return res.status(404).send('Employee not found');
      }

      // If the employee exists, proceed to delete
      const deleteSql = "DELETE FROM Invigilator WHERE InvigilatorID = ?";
      db.query(deleteSql, [employeeId], async (err, ) => {
        if (err) {
          logger.error('Error deleting employee:', err);
          return res.status(500).send('Error deleting employee');
        }

        res.status(200).send('Employee deleted successfully');
      });
    });
  } catch (err) {
    logger.error(err);
    res.status(500).send('Server error');
  }
};

