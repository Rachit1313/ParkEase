const db = require('../../database'); // Adjust path as necessary

module.exports = (req, res) => {
  const { customerID, subject, description, priority = 'Medium' } = req.body;
  const currentTime = new Date().toLocaleString('en-US', { timeZone: 'America/New_York' });
  const sql = `INSERT INTO Tickets (CustomerID, Subject, Description, Priority, Status, CreatedTime) VALUES (?, ?, ?, ?, 'Open', ?)`;

  db.query(sql, [customerID, subject, description, priority, currentTime], (err, result) => {
    if (err) {
      console.error('Error creating ticket:', err);
      return res.status(500).send({ message: 'Error creating ticket' });
    }
    res.status(201).send({ message: 'Ticket created successfully', ticketID: result.insertId });
  });
};
