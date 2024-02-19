// File: getBookingHistory.js
// ------------------
// This file contains the booking history route implementation for the ParkEase project

// Author: Rachit Chawla
// Date: February 19, 2024
const db = require('../../database');
const logger = require('../../logger');

module.exports = async (req, res) => {
  try {
    const { customerId } = req.params;
    logger.info("Fetching booking history for cust id " + customerId)

    if (!customerId) {
      return res.status(400).send('Customer ID is required');
    }

    const sql = `
      SELECT 
        BookingID, CustomerID, GarageID, SpotID, TransactionID, 
        BookingTime, CheckInTime, CheckOutTime, PaymentAmount, PaymentStatus
      FROM Booking
      WHERE CustomerID = ?
      ORDER BY BookingTime DESC
    `;

    db.query(sql, [customerId], (err, results) => {
      if (err) {
        logger.error('Error fetching booking history: ' + err);
        return res.status(500).send('Error fetching booking history');
      }

      // If no bookings found, return an empty array
      if (results.length === 0) {
        return res.status(404).send('No booking history found for the given customer ID');
      }

      // Return the booking history as an array of JSON objects
      res.status(200).json(results);
    });
  } catch (err) {
    logger.error('Error in getBookingHistory: ' + err);
    res.status(500).send('An error occurred while fetching booking history');
  }
};