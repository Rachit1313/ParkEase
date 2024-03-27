const db = require('../../database'); // Adjust path as necessary

module.exports = (req, res) => {
  const { ticketID, status } = req.body;
  const sql = `UPDATE Tickets SET Status = ? WHERE TicketID = ?`;

  db.query(sql, [status, ticketID], (err) => {
    if (err) {
      console.error('Error updating ticket status:', err);
      return res.status(500).send({ message: 'Error updating ticket status' });
    }
    res.status(200).send({ message: 'Ticket status updated successfully' });
  });
};