const db = require('../../database');
const logger = require('../../logger');

// API to create a booking
module.exports = async (req, res) => {
  const { customerId, garageId, spotId, checkInTime, checkOutTime } = req.body;

  // Step 1: Validate input
  if (!customerId || !garageId || !spotId || !checkInTime || !checkOutTime) {
    return res.status(400).send('All fields are required');
  }

  try {
    // Fetch the fare rate for the selected parking spot
    const fareQuery = 'SELECT HourlyRate FROM ParkingSpot WHERE SpotID = ?';
    const [fareResults] = await db.promise().query(fareQuery, [spotId]);

    if (fareResults.length === 0) {
      return res.status(404).send('Parking spot not found');
    }

    const fareRate = fareResults[0].HourlyRate;
    const durationHours = (new Date(checkOutTime) - new Date(checkInTime)) / (1000 * 60 * 60);
    const totalFare = fareRate * durationHours;

    // Create the booking entry
    const createBookingSql = `
      INSERT INTO Booking (CustomerID, GarageID, SpotID, BookingTime, CheckInTime, CheckOutTime, PaymentStatus)
      VALUES (?, ?, ?, NOW(), ?, ?, 'Pending')
    `;

    const [bookingResult] = await db.promise().query(createBookingSql, [customerId, garageId, spotId, checkInTime, checkOutTime]);
    const bookingId = bookingResult.insertId;

    // Return the booking ID and total fare
    res.status(200).json({ message: 'Booking created. Proceed to payment.', bookingId, totalFare });
  } catch (err) {
    logger.error('Error creating booking: ' + err);
    return res.status(500).send('Error creating booking');
  }
};