// File: deleteEmployee.js
// ------------------
// This file contains the deleteEmployee route implementation for the ParkEase project

// Author: Heavendeep Kaur Munjal
// Date: March 19, 2024

const db = require('../../database');
const logger = require('../../logger');

module.exports = (req, res) => {
    const { id } = req.params; // Extracting the invigilator ID from the request parameters

    if (!id) {
        return res.status(400).send('Invigilator ID is required');
    }

    // Step 1: Delete the Invigilator details from the Invigilator table
    const deleteInvigilatorSql = 'DELETE FROM Invigilator WHERE InvigilatorID = ?';
    db.query(deleteInvigilatorSql, [id], (err, result) => {
        if (err) {
            logger.error('Error deleting Invigilator details:' + err);
            return res.status(500).send('Error deleting Invigilator details');
        }

        // Check if the Invigilator was successfully deleted
        if (result.affectedRows === 0) {
            return res.status(404).send('Invigilator not found');
        }

        // Step 2: Delete the user from the Users table
        const deleteUserSql = 'DELETE FROM Users WHERE UserID = ?';
        db.query(deleteUserSql, [id], (err) => {
            if (err) {
                logger.error('Error deleting user:'+ err);
                return res.status(500).send('Error deleting user');
            }

            res.status(200).send('Invigilator and user deleted successfully');
        });
    });
};