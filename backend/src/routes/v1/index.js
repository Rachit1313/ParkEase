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

module.exports = router;