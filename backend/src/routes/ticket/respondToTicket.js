const db = require('../../database');

module.exports = (req, res) => {
  const { ticketID, responderID, responseText } = req.body;
  const currentTime = new Date().toLocaleString('en-US', { timeZone: 'America/New_York' });
  const sql = `INSERT INTO TicketResponses (TicketID, ResponderID, ResponseText, CreatedTime) VALUES (?, ?, ?, ?)`;

  db.query(sql, [ticketID, responderID, responseText, currentTime], (err, result) => {
    if (err) {
      console.error('Error responding to ticket:', err);
      return res.status(500).send({ message: 'Error responding to ticket' });
    }
    res.status(201).send({ message: 'Response added successfully', responseID: result.insertId });
  });
};
