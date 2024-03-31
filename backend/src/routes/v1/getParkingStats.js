// File: getParkingStats.js
// ------------------
// This file contains the getParkingStats route implementation

const db = require('../../database');
const logger = require('../../logger');

module.exports = (req, res) => {
    // Step 1: Count total parking spots
    const totalSpotsSql = 'SELECT COUNT(*) AS totalSpots FROM ParkingSpot';

    db.query(totalSpotsSql, (err, totalResults) => {
        if (err) {
            logger.error('Error fetching total parking spots: ' + err);
            return res.status(500).send('Error fetching total parking spots');
        }

        const totalSpots = totalResults[0].totalSpots;

        // Step 2: Count currently booked spots
        const currentTime = new Date().toISOString().slice(0, 19).replace('T', ' ');
        const bookedSpotsSql = `
            SELECT COUNT(*) AS bookedSpots
            FROM Booking
            WHERE CheckInTime <= ?
            AND (CheckOutTime IS NULL OR CheckOutTime >= ?)
            AND PaymentStatus = "Paid"
        `;

        db.query(bookedSpotsSql, [currentTime, currentTime], (err, bookedResults) => {
            if (err) {
                logger.error('Error fetching booked parking spots: ' + err);
                return res.status(500).send('Error fetching booked parking spots');
            }

            const bookedSpots = bookedResults[0].bookedSpots;
            const availableSpots = totalSpots - bookedSpots;

            // Return the statistics
            res.status(200).json({
                totalSpots,
                bookedSpots,
                availableSpots
            });
        });
    });
};