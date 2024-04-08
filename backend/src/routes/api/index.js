// File: index.js
// ------------------

// Author: Rachit Chawla
// Date: February 2, 2024

/**
 * The main entry-point for the customer version of the parkEase API.
 */
const express = require('express');

// Create a router on which to mount our API endpoints
const router = express.Router();


router.post('/login', require('./login'));
router.post('/register',require('./register'))
router.post('/forgotPassword', require('./forgotPassword'));
router.post('/available-spots', require('./getParkingSpots'));
router.get('/booking-history/:customerId', require('./getBookingHistory'));
router.get('/garageList', require('./getGarages') );
router.post('/create-booking', require('./createBooking'));
router.post('/process-payment', require('./processPayment'));
router.post('/add-vehicles', require('./addCustomerVehicles'));
router.get('/saved-vehicles/:customerId', require('./getCustomerVehicles'));
router.delete('/saved-vehicles/:plateNumber', require('./deleteCustomerVehicle'));

// Other routes will go here later on...

module.exports = router;