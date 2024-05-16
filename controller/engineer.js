const path = require('path');
const connection = require(path.join(path.resolve(), 'config/db.js'));

const addEngineer = (req, res) => {
    const { specialization } = req.body
    const { employeeId } = req.body
    if (!specialization) {
      return res.status(400).json({ error: 'Specialization is required' });
    }
    connection.query('INSERT INTO engineer (Qualification, EngID) VALUES (?, ?)', [specialization, employeeId], (err) => {
      if (err) {
        console.error('Error adding engineer:', err);
        return res.status(500).send('Internal Server Error');
      }
      res.status(201).json({ message: 'Engineer added successfully' });
    });
  };

  module.exports = { addEngineer };