const db = require('../../database');
const logger = require('../../logger');


// API to create a booking
module.exports =  async (req, res) => {
  const { customerId, garageId, spotId, checkInTime, checkOutTime } = req.body;

  // Step 1: Validate input
  if (!customerId || !garageId || !spotId || !checkInTime || !checkOutTime) {
    return res.status(400).send('All fields are required');
  }

  // Step 2: Create a booking entry (marked as pending) and include BookingTime as the current time
  const createBookingSql = `
    INSERT INTO Booking (CustomerID, GarageID, SpotID, BookingTime, CheckInTime, CheckOutTime, PaymentStatus)
    VALUES (?, ?, ?, NOW(), ?, ?, 'Pending')
  `;

  db.query(createBookingSql, [customerId, garageId, spotId, checkInTime, checkOutTime], (err, result) => {
    if (err) {
      logger.error('Error creating booking: ' + err);
      return res.status(500).send('Error creating booking');
    }

    // Return the booking ID and a message to proceed to payment
    const bookingId = result.insertId;
    res.status(200).json({ message: 'Booking created. Proceed to payment.', bookingId });
  });
};