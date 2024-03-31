const db = require('../../database');

module.exports = (req, res) => {
  const { ticketID } = req.params;
  const sql = `SELECT t.*, tr.ResponseText, DATE_FORMAT(tr.CreatedTime,'%Y-%m-%d %h:%i %p') AS ResponseTime
               FROM Tickets t
               LEFT JOIN TicketResponses tr ON t.TicketID = tr.TicketID
               WHERE t.TicketID = ?`;

  db.query(sql, [ticketID], (err, results) => {
    if (err) {
      console.error('Error viewing ticket:', err);
      return res.status(500).send({ message: 'Error viewing ticket' });
    }
    res.status(200).json(results);
  });
};