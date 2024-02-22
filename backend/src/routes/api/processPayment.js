const express = require('express');
const db = require('../../database');
const logger = require('../../logger');

const router = express.Router();

// API to process payment
router.post('/process-payment', async (req, res) => {
  const { customerId, bookingId, amount } = req.body;

  // Add validation for customerId, bookingId, and amount as needed

  try {
    // Simulate payment processing
    // In a real application, you would integrate with a payment gateway here
    await new Promise(resolve => setTimeout(resolve, 2000)); // Simulate delay

    // Insert the transaction into the Transaction table
    // Note: TransactionID is not included in the column list since it's auto-incremented
    const insertTransactionSql = `
      INSERT INTO Transaction (CustomerID, TransactionTime, Amount, TransactionType)
      VALUES (?, NOW(), ?, 'FakePayment')
    `;

    const [result] = await db.promise().query(insertTransactionSql, [customerId, amount]);
    const transactionRecordId = result.insertId; // This is the auto-incremented TransactionID

    // Update the Booking table with the TransactionID
    const updateBookingSql = `
      UPDATE Booking
      SET TransactionID = ?, PaymentStatus = 'Paid'
      WHERE BookingID = ?
    `;

    await db.promise().query(updateBookingSql, [transactionRecordId, bookingId]);

    // Return the auto-incremented TransactionID and a success message
    res.status(200).json({ message: 'Payment processed successfully', transactionId: transactionRecordId });
  } catch (err) {
    logger.error('Error processing payment: ' + err);
    return res.status(500).send('Error processing payment');
  }
});

module.exports = router;