// File: validateBooking.js
// ------------------
// This file contains the validateBooking route implementation

// Author - Rachit Chawla
// Date - March 26, 2024
const db = require('../../database');
const logger = require('../../logger');
const moment = require('moment-timezone');

module.exports = (req, res) => {
    const { plateNumber } = req.params;

    if (!plateNumber) {
        return res.status(400).send('Plate number is required');
    }

    // Step 1: Find CustomerID based on PlateNumber
    const findCustomerSql = `
        SELECT CustomerID
        FROM NumberPlate
        WHERE PlateNumber = ?
    `;

    db.query(findCustomerSql, [plateNumber], (err, customerResults) => {
        if (err) {
            logger.error('Error finding customer by plate number: ' + err);
            return res.status(500).send('Error finding customer by plate number');
        }

        if (customerResults.length === 0) {
            return res.status(404).send('Plate number not found');
        }

        const customerId = customerResults[0].CustomerID;

        const estTime = moment().tz('America/New_York'); // Get current time in EST
        const currentTime = estTime.format('YYYY-MM-DD HH:mm:ss'); // Format to required format
        // Step 2: Check for an active booking for the customer
        const checkBookingSql = `
            SELECT BookingID
            FROM Booking
            WHERE CustomerID = ?
            AND CheckInTime <= ?
            AND PaymentStatus = "Paid"
            AND (CheckOutTime IS NULL OR CheckOutTime >= ?)
        `;

        db.query(checkBookingSql, [customerId, currentTime, currentTime], (err, bookingResults) => {
            if (err) {
                logger.error('Error checking for active booking: ' + err);
                return res.status(500).send('Error checking for active booking');
            }

            if (bookingResults.length === 0) {
                return res.status(200).json({ valid: false, message: 'No active booking found for the given plate number' });
            }

            // Booking found
            res.status(200).json({ valid: true, message: 'Booking validated successfully', bookingId: bookingResults[0].BookingID });
        });
    });
};