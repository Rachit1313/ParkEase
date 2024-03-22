// File: getMonthlyIncome.js
// ------------------
// This file contains the getMonthlyIncome route implementation

const db = require('../../database');
const logger = require('../../logger');

module.exports = (req, res) => {
    // Construct SQL query to fetch sum of payments received each month
    const query = `
        SELECT 
            MONTHNAME(TransactionTime) AS month,
            SUM(Amount) AS totalAmount
        FROM Transaction
        WHERE YEAR(TransactionTime) = YEAR(CURDATE())
        GROUP BY MONTH(TransactionTime)
        ORDER BY MONTH(TransactionTime)
    `;

    db.query(query, (err, results) => {
        if (err) {
            logger.error('Error fetching monthly income:', err);
            return res.status(500).send('Error fetching monthly income');
        }

        res.status(200).json(results);
    });
};
