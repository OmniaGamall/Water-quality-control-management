const path = require('path');
const connection = require(path.join(path.resolve(), 'config/db.js'));

const addIT = (req, res) => {
    const { skills } = req.body
    const { employeeId } = req.body
    if (!skills) {
      return res.status(400).json({ error: 'Skills is required' });
    }
    connection.query('INSERT INTO it (skills, ITID) VALUES (?, ?)', [skills, employeeId], (err) => {
      if (err) {
        console.error('Error adding it:', err);
        return res.status(500).send('Internal Server Error');
      }
      res.status(201).json({ message: 'IT Specialist added successfully' });
    });
  };

  module.exports = { addIT };