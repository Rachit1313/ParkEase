// File: index.js
// ------------------

// Author: Rachit Chawla
// Date: February 2, 2024

/**
 * The main entry-point for the v1 version of the fragments API.
 */
const express = require('express');

// Create a router on which to mount our API endpoints
const router = express.Router();


router.post('/login', require('./login'));
router.post('/register',require('./register'))
router.post('/forgotPassword', require('./forgotPassword'));
router.get('/booking', require('./getParkingSpots'));
// Other routes will go here later on...

module.exports = router;