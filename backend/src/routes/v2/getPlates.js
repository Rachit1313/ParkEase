// File: getPlates.js
// ------------------
// This file contains the getPlates route implementation
// Author: Rachit Chawla
// Date: March 31, 2024
const db = require('../../database');
const logger = require('../../logger');

module.exports = (req, res) => {
    
    const sql = `SELECT * FROM NumberPlate`;

    db.query(sql, (err, results) => {
        if (err) {
            logger.error('Error fetching number plates: ' + err);
            return res.status(500).send({ message: 'Error fetching number plates' });
        }

        res.status(200).json(results);
    });
};