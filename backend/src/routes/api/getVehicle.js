// Import necessary modules and dependencies
const db = require('../../database');
const logger = require('../../logger');

module.exports = async (req, res) => {
  try {
    // Extract customer ID from request parameters
    const { customerId } = req.params;

    // SQL query to select vehicles associated with the customer
    const sql = "SELECT * FROM NumberPlate WHERE CustomerID = ?";

    db.query(sql, [customerId], async (err, results) => {
      if (err) {
        logger.error('Error fetching customer vehicles:', err);
        return res.status(500).send('Error fetching customer vehicles');
      }

      // If no vehicles are found for the customer
      if (results.length === 0) {
        return res.status(404).send('No vehicles found for the customer');
      }

      logger.info(results);
      // Send the list of vehicles to the client
      res.status(200).json(results);
    });
  } catch (err) {
    logger.error(err);
    res.status(500).send('Server error');
  }
};
