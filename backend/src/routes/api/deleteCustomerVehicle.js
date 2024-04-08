// deleteCustomerVehicle.js
// ------------------
// This file contains the delete customer vehicle route implementation for the ParkEase project

// Author: Rachit Chawla
// Date: February 24, 2024

const db = require('../../database');
const logger = require('../../logger');

// API to delete a vehicle related to a customer
module.exports = (req, res) => {
    const { plateNumber } = req.params; 
   
    // Step 1: Validate input
    if (!plateNumber) {
        return res.status(400).json({ error: 'Plate number is required' });
    }

    // Step 2: Delete the vehicle from the database
    const deleteVehicleQuery = `
        DELETE FROM NumberPlate WHERE PlateNumber = ?
    `;

    db.query(deleteVehicleQuery, [plateNumber], (err, result) => {
        if (err) {
            logger.error('Error deleting vehicle: ', err);
            return res.status(500).json({ error: 'Error deleting vehicle' });
        }

        if (result.affectedRows === 0) {
            // No vehicle found with the given plate number
            return res.status(404).json({ error: 'Vehicle not found' });
        }

        // Vehicle deleted successfully
        res.status(200).json({ message: 'Vehicle deleted successfully.' });
    });
};
