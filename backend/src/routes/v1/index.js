// File: index.js
// ------------------

// Author: Rachit Chawla
// Date: March 14, 2024

/**
 * The main entry-point for the admin version of the parkEase API.
 */
const express = require('express');

// Create a router on which to mount our API endpoints
const router = express.Router();


router.get('/employees', require('./getAllEmployees'));
router.post('/employees',require('./addEmployee'))
router.get('/customers', require('./getAllCustomers'));
router.delete('/employees/:id', require('./deleteEmployee'));
router.patch('/employees/:id', require('./updateEmployee'));
router.get('/bookings/today', require('./getTodaysBookings'));
router.get('/transactions/monthly-income', require('./getMonthlyIncome'));
router.get('/parking-stats', require('./getParkingStats'));
router.get('/customer/:customerId', require('./getCustomerById'));
router.get('/bookings/:bookingId', require('./getBookingById'));

module.exports = router;
