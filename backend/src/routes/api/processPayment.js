// File: processPayment.js
// ------------------
// This file contains the payment processing route implementation for the ParkEase project

// Author: Rachit Chawla
// Date: February 23, 2024

const express = require('express');
const db = require('../../database');
const logger = require('../../logger');

const router = express.Router();

// Helper functions for card details validation
function isValidCardNumber(number) {
  return /^\d{16}$/.test(number);
}

function isValidCvv(cvv) {
  return /^\d{3}$/.test(cvv);
}

function isValidExpirationDate(month, year) {
  const currentDate = new Date();
  const currentYear = currentDate.getFullYear();
  const currentMonth = currentDate.getMonth() + 1; // getMonth() is zero-based
  const expYear = parseInt(year, 10);
  const expMonth = parseInt(month, 10);

  if (expYear < currentYear || (expYear === currentYear && expMonth < currentMonth)) {
    return false;
  }
  return true;
}

// API to process payment
router.post('/process-payment', (req, res) => {
  const { customerId, bookingId, amount, cardNumber, cvv, expMonth, expYear } = req.body;

  // Validate card details
  if (!isValidCardNumber(cardNumber)) {
    return res.status(400).send('Invalid card number. Card number must be 16 digits.');
  }

  if (!isValidCvv(cvv)) {
    return res.status(400).send('Invalid CVV. CVV must be 3 digits.');
  }

  if (!isValidExpirationDate(expMonth, expYear)) {
    return res.status(400).send('Invalid expiration date. Date must not be in the past.');
  }

  // Simulate payment processing delay
  setTimeout(() => {
    // Insert the transaction into the Transaction table
    const insertTransactionSql = `
      INSERT INTO Transaction (CustomerID, TransactionTime, Amount, TransactionType)
      VALUES (?, NOW(), ?, 'FakePayment')
    `;

    db.query(insertTransactionSql, [customerId, amount], (err, result) => {
      if (err) {
        logger.error('Error processing payment: ', err);
        return res.status(500).send('Error processing payment');
      }

      const transactionRecordId = result.insertId; // Auto-incremented TransactionID

      // Update the Booking table with the TransactionID
      const updateBookingSql = `
        UPDATE Booking
        SET TransactionID = ?, PaymentStatus = 'Paid', PaymentAmount = ?
        WHERE BookingID = ?
      `;

      db.query(updateBookingSql, [transactionRecordId, amount, bookingId], (err) => {
        if (err) {
          logger.error('Error updating booking: ', err);
          return res.status(500).send('Error updating booking');
        }

        // Return the auto-incremented TransactionID and a success message
        res.status(200).json({ message: 'Payment processed successfully', transactionId: transactionRecordId });
      });
    });
  }, 2000); // Simulate 2 seconds delay for the fake payment processing
});

module.exports = router;