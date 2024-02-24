// File: addCustomerVehicles.js
// ------------------
// This file contains the add customer vehicles route implementation for the ParkEase project

// Author: Heavendeep kaur
// Date: February 24, 2024

const express = require('express');
const router = express.Router();
const db = require('../../database');
const logger = require('../../logger');

// API to add a new vehicle related to a customer
router.post('/addVehicle', (req, res) => {
    const { plateNumber,customerId, registrationDate } = req.body;

    // Step 1: Validate input
    if (!plateNumber || !customerId || !registrationDate) {
        return res.status(400).json({ error: 'All fields are required' });
    }

    // Step 2: Insert the vehicle into the database
    const addVehicleQuery = `
        INSERT INTO NumberPlate (PlateNumber, CustomerID, RegistrationDate)
        VALUES (?, ?, ?)
    `;

    db.query(addVehicleQuery, [plateNumber, customerId, registrationDate], (err) => {
        if (err) {
            logger.error('Error adding vehicle: ', err);
            return res.status(500).json({ error: 'Error adding vehicle' });
        }

        // Vehicle added successfully
        res.status(200).json({ message: 'Vehicle added successfully.' });
    });
});

module.exports = router;
