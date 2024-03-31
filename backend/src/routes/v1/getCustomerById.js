const db = require('../../database');
const logger = require('../../logger');

  const getCustomerById = async (req, res) => {
    try {
      // Extract customerId from route parameters
      const { customerId } = req.params;

      // SQL query to select the customer by ID
      const sql = "SELECT * FROM Customer WHERE CustomerID = ?";

      db.query(sql, [customerId], (err, results) => {
        if (err) {
          logger.error(`Error fetching customer with ID ${customerId}:`, err);
          return res.status(500).send('Error fetching customer');
        }

        // If no customer is found
        if (results.length === 0) {
          return res.status(404).send('Customer not found');
        }

        // Send the customer details to the client
        res.status(200).json(results[0]);
      });
    } catch (err) {
      logger.error(err);
      res.status(500).send('Server error');
    }
  };

  module.exports = getCustomerById;
