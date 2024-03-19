// File: updateEmployee.js
// ------------------
// This file contains the updateEmployee route implementation for the ParkEase project

// Author: Rachit Chawla
// Date: March 19, 2024

const db = require('../../database');
const logger = require('../../logger');

module.exports = (req, res) => {
    const { id } = req.params; // Extracting the invigilator ID from the request parameters
    const { contactNumber, fullName } = req.body; // Extracting the fields that can be updated

    // Validate input
    if (!contactNumber && !fullName) {
        return res.status(400).send('At least one of contact number or full name must be provided for update.');
    }

    // Construct the SQL query dynamically based on provided fields
    let updateFields = [];
    let queryParams = [];

    if (contactNumber) {
        updateFields.push('ContactNumber = ?');
        queryParams.push(contactNumber);
    }

    if (fullName) {
        updateFields.push('FullName = ?');
        queryParams.push(fullName);
    }

    queryParams.push(id); // Adding the ID as the last query parameter for the WHERE clause

    const updateSql = `UPDATE Invigilator SET ${updateFields.join(', ')} WHERE InvigilatorID = ?`;

    db.query(updateSql, queryParams, (err, result) => {
        if (err) {
            logger.error('Error updating Invigilator details:', err);
            return res.status(500).send('Error updating Invigilator details');
        }

        if (result.affectedRows === 0) {
            return res.status(404).send('Invigilator not found');
        }

        res.status(200).send('Invigilator details updated successfully');
    });
};