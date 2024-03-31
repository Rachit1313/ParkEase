
// File: createBooking.js
// ------------------
// This file contains the booking creation route implementation for the ParkEase project

// Author: Rachit Chawla
// Date: February 23, 2024

const db = require('../../database');
const logger = require('../../logger');
const moment = require('moment-timezone');

// API to create a booking
module.exports = (req, res) => {
  const { customerId, garageId, spotId, checkInTime, checkOutTime } = req.body;

  const estTime = moment().tz('America/New_York'); // Get current time in EST
  const formattedTime = estTime.format('YYYY-MM-DD HH:mm:ss'); // Format to required format

  // Step 1: Validate input
  if (!customerId || !garageId || !spotId || !checkInTime || !checkOutTime) {
    return res.status(400).send('All fields are required');
  }

  // Fetch the fare rate for the selected parking spot
  const fareQuery = 'SELECT HourlyRate FROM ParkingSpot WHERE SpotID = ?';
  db.query(fareQuery, [spotId], (err, fareResults) => {
    if (err) {
      logger.error('Error fetching fare rate: ', err);
      return res.status(500).send('Error fetching fare rate');
    }

    if (fareResults.length === 0) {
      return res.status(404).send('Parking spot not found');
    }

    const fareRate = fareResults[0].HourlyRate;
    const durationHours = (new Date(checkOutTime) - new Date(checkInTime)) / (1000 * 60 * 60);
    const totalFare = fareRate * durationHours;

    // Create the booking entry
    const createBookingSql = `
      INSERT INTO Booking (CustomerID, GarageID, SpotID, BookingTime, CheckInTime, CheckOutTime, PaymentStatus)
      VALUES (?, ?, ?, ?, ?, ?, 'Pending')
    `;

    db.query(createBookingSql, [customerId, garageId, spotId, formattedTime, checkInTime, checkOutTime], (err, bookingResult) => {
      if (err) {
        logger.error('Error creating booking: ', err);
        return res.status(500).send('Error creating booking');
      }

      const bookingId = bookingResult.insertId;
      // Return the booking ID and total fare
      res.status(200).json({ message: 'Booking created. Proceed to payment.', bookingId, totalFare });
    });
  });
};