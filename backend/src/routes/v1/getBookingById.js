const db = require('../../database');
const logger = require('../../logger');

const getBookingById = async (req, res) => {
  try {
    // Extract bookingId from route parameters
    const { bookingId } = req.params;

    // SQL query to select the booking by ID
    
    const sql = "SELECT BookingID, CustomerID, GarageID, SpotID, TransactionID, BookingTime, DATE_FORMAT(CheckInTime, '%Y-%m-%d %h:%i %p') AS checkInTime, DATE_FORMAT(CheckOutTime, '%Y-%m-%d %h:%i %p') AS CheckOutTime, PaymentAmount, PaymentStatus FROM Booking WHERE BookingID = ?";

    db.query(sql, [bookingId], (err, results) => {
      if (err) {
        logger.error(`Error fetching booking with ID ${bookingId}:`, err);
        return res.status(500).send('Error fetching booking');
      }

      // If no booking is found
      if (results.length === 0) {
        return res.status(404).send('Booking not found');
      }

      // Send the booking details to the client
      res.status(200).json(results[0]);
    });
  } catch (err) {
    logger.error(err);
    res.status(500).send('Server error');
  }
};

module.exports = getBookingById;
