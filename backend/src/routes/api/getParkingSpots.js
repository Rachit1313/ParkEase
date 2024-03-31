// File: getParkingSpots.js
// ------------------
// This file contains the getParkingSpots route implementation for the ParkEase project

// Author: Rachit Chawla
// Date: February 2, 2024

const db = require('../../database');
const logger = require('../../logger');

module.exports = (req, res) => {
  const { garageId, checkInTime, checkOutTime } = req.body;

  // Step 1: Validate input
  if (!garageId || !checkInTime || !checkOutTime) {
    return res.status(400).send('Garage ID, check-in time, and check-out time are required');
  }

  // Step 2: Query for available spots
  const availableSpotsSql = `
    SELECT s.SpotID,s.SpotNumber,s.HourlyRate FROM ParkingSpot s
    WHERE s.GarageID = ? AND s.SpotID NOT IN (
      SELECT b.SpotID FROM Booking b
      WHERE b.GarageID = ? AND b.PaymentStatus = "Paid" AND (
        (b.CheckInTime < ? AND b.CheckOutTime > ?) OR
        (b.CheckInTime < ? AND b.CheckOutTime > ?) OR
        (b.CheckInTime >= ? AND b.CheckOutTime <= ?)
      )
    )
  `;

  db.query(availableSpotsSql, [
    garageId,
    garageId,
    checkOutTime, checkInTime,  // Covers bookings that start before and end after the requested period
    checkInTime, checkOutTime,  // Covers bookings that start and end within the requested period
    checkInTime, checkOutTime   // Covers bookings that encompass the requested period
  ], (err, availableSpots) => {
    if (err) {
      logger.error('Error fetching available spots: ', err);
      return res.status(500).send('Error fetching available spots');
    }

    // Step 3: Respond with available spots
    if (availableSpots.length > 0) {
      res.status(200).json({ availableSpots });
    } else {
      res.status(404).send('No available spots found for the selected time period');
    }
  });
};