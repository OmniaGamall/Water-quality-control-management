const path = require('path');
const connection = require(path.join(path.resolve(), 'config/db.js'));
 
const addChemist = (req, res) => {
    const { Qualification } = req.body
    const { employeeId } = req.body
    if (!Qualification) {
      return res.status(400).json({ error: 'Qualification is required' });
    }
    connection.query('INSERT INTO chemist (Qualification, ChID) VALUES (?, ?)', [Qualification, employeeId], (err) => {
      if (err) {
        console.error('Error adding chemist:', err);
        return res.status(500).send('Internal Server Error');
      }
      res.status(201).json({ message: 'Chemist added successfully' });
    });
  };

  module.exports = { addChemist };
