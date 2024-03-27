// src/routes/index.js
// File: index.js
// ------------------

// Author: Rachit Chawla
// Date: February 2, 2024

const express = require('express');

// version and author from package.json
const { version, author } = require('../../package.json');

// Create a router that we can use to mount our API
const router = express.Router();

/**
 * Define a simple health check route. If the server is running
 * we'll respond with a 200 OK.  If not, the server isn't healthy.
 */
router.get('/', (req, res) => {
  // Client's shouldn't cache this response (always request it fresh)
  res.setHeader('Cache-Control', 'no-cache');
  // Send a 200 'OK' response
  res.status(200).json({
    status: 'ok',
    author,
    // Use your own GitHub URL for this!
    githubUrl: 'https://github.com/Rachit1313/ParkEase',
    version,
  });
});

router.use('/api', require('./api'));
router.use('/v1', require('./v1'));
router.use('/v2', require('./v2'));
router.use('/ticket', require('./ticket'));
module.exports = router;