const db = require('../../database');

module.exports = (req, res) => {
  const { customerID, status, priority, createdAfter } = req.query;
  let sql = `SELECT * FROM Tickets WHERE 1`;
  const params = [];

  if (customerID) {
    sql += ` AND CustomerID = ?`;
    params.push(customerID);
  }
  if (status) {
    sql += ` AND Status = ?`;
    params.push(status);
  }
  if (priority) {
    sql += ` AND Priority = ?`;
    params.push(priority);
  }
  if (createdAfter) {
    sql += ` AND CreatedTime >= ?`;
    params.push(createdAfter);
  }

  db.query(sql, params, (err, results) => {
    if (err) {
      console.error('Error fetching tickets:', err);
      return res.status(500).send({ message: 'Error fetching tickets' });
    }
    res.status(200).json(results);
  });
};