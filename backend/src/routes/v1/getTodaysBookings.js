// File: getTodaysBookings.js
// ------------------
// This file contains the getTodaysBookings route implementation

// Author: Rachit Chawla
// Date: March 19, 2024
const db = require('../../database');
const logger = require('../../logger');

module.exports = (req, res) => {
    // Construct SQL query to fetch today's bookings with required details
    const today = new Date().toISOString().slice(0, 10); // Format: 'YYYY-MM-DD'
    const query = `
        SELECT 
            u.Email, 
            b.PaymentAmount AS amount, 
            ps.SpotNumber AS parkingSpotNumber, 
            DATE_FORMAT(b.CheckInTime, '%Y-%m-%d %h:%i %p') AS checkinTime
        FROM Booking b
        JOIN Users u ON b.CustomerID = u.UserID
        JOIN ParkingSpot ps ON b.SpotID = ps.SpotID
        WHERE DATE(b.BookingTime) = ? AND b.PaymentStatus = "Paid"
    `;

    db.query(query, [today], (err, results) => {
        if (err) {
            logger.error('Error fetching today\'s bookings:', err);
            return res.status(500).send('Error fetching today\'s bookings');
        }

        res.status(200).json(results);
    });
};