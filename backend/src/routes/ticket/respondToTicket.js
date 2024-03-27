const db = require('../../database'); // Adjust path as necessary

module.exports = (req, res) => {
  const { ticketID, responderID, responseText } = req.body;
  const sql = `INSERT INTO TicketResponses (TicketID, ResponderID, ResponseText) VALUES (?, ?, ?)`;

  db.query(sql, [ticketID, responderID, responseText], (err, result) => {
    if (err) {
      console.error('Error responding to ticket:', err);
      return res.status(500).send({ message: 'Error responding to ticket' });
    }
    res.status(201).send({ message: 'Response added successfully', responseID: result.insertId });
  });
};