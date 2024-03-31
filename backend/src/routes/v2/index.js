// File: index.js
// ------------------

// Author: Rachit Chawla
// Date: March 14, 2024

/**
 * The main entry-point for the invigilator version of the parkEase API.
 */
const express = require('express');

// Create a router on which to mount our API endpoints
const router = express.Router();

router.get('/validate-booking/:plateNumber', require('./validateBooking'));
router.get('/', require('./getPlates'));


module.exports = router;