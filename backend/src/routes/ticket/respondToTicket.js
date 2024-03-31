const db = require('../../database');
const logger = require('../../logger');
const moment = require('moment-timezone');

module.exports = (req, res) => {
  const { ticketID, responderID, responseText } = req.body;

  const estTime = moment().tz('America/New_York'); // Get current time in EST
  const formattedTime = estTime.format('YYYY-MM-DD HH:mm:ss'); // Format to required format
  
  logger.info(formattedTime)
  const sql = `INSERT INTO TicketResponses (TicketID, ResponderID, ResponseText, CreatedTime) VALUES (?, ?, ?, ?)`;

  db.query(sql, [ticketID, responderID, responseText, formattedTime], (err, result) => {
    if (err) {
      console.error('Error responding to ticket:', err);
      return res.status(500).send({ message: 'Error responding to ticket' });
    }
    res.status(201).send({ message: 'Response added successfully', responseID: result.insertId });
  });
};
