// File: index.js
// ------------------

// Author: Rachit Chawla
// Date: March 14, 2024

/**
 * The main entry-point for the ticket version of the parkEase API.
 */
const express = require('express');

const createTicket = require('./createTicket');
const listTickets = require('./listTickets');
const viewTicket = require('./viewTicket');
const respondToTicket = require('./respondToTicket');
const updateTicketStatus = require('./updateTicketStatus');

// Create a router on which to mount our API endpoints
const router = express.Router();

router.post('/', createTicket);
router.get('/', listTickets);
router.get('/:ticketID', viewTicket);
router.post('/respond', respondToTicket);
router.patch('/status', updateTicketStatus);

module.exports = router;