// File: index.js
// ------------------

// Author: Rachit Chawla
// Date: February 2, 2024

const express = require('express');

const app = express();
app.use(express.json());

// Start the server
require('./server');