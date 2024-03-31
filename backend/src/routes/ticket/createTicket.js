const db = require('../../database'); // Adjust path as necessary
const moment = require('moment-timezone');

module.exports = (req, res) => {
  const { customerID, subject, description, priority = 'Medium' } = req.body;
  const estTime = moment().tz('America/New_York'); // Get current time in EST
  const formattedTime = estTime.format('YYYY-MM-DD HH:mm:ss'); // Format to required format

  const sql = `INSERT INTO Tickets (CustomerID, Subject, Description, Priority, Status, CreatedTime) VALUES (?, ?, ?, ?, 'Open', ?)`;

  db.query(sql, [customerID, subject, description, priority, formattedTime], (err, result) => {
    if (err) {
      console.error('Error creating ticket:', err);
      return res.status(500).send({ message: 'Error creating ticket' });
    }
    res.status(201).send({ message: 'Ticket created successfully', ticketID: result.insertId });
  });
};
