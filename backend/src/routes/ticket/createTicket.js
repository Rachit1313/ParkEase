const db = require('../../database'); // Adjust path as necessary

module.exports = (req, res) => {
  const { customerID, subject, description, priority = 'Medium' } = req.body;
  const sql = `INSERT INTO Tickets (CustomerID, Subject, Description, Priority, Status) VALUES (?, ?, ?, ?, 'Open')`;

  db.query(sql, [customerID, subject, description, priority], (err, result) => {
    if (err) {
      console.error('Error creating ticket:', err);
      return res.status(500).send({ message: 'Error creating ticket' });
    }
    res.status(201).send({ message: 'Ticket created successfully', ticketID: result.insertId });
  });
};