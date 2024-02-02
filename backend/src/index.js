const express = require('express');

const app = express();
app.use(express.json());

// Start the server
require('./server');