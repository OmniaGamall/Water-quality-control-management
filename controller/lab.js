const path = require('path');
const connection = require(path.join(path.resolve(), 'config/db.js'));
 
const addLab = (req, res) => {
    const { Equipment_Knowledge } = req.body
    const { employeeId } = req.body
    if (!Equipment_Knowledge) {
      return res.status(400).json({ error: 'Equipment knowledge is required' });
    }
    connection.query('INSERT INTO lab_technican (Equipment_Knowledge, LTechID) VALUES (?, ?)', [Equipment_Knowledge, employeeId], (err) => {
      if (err) {
        console.error('Error adding lab technican:', err);
        return res.status(500).send('Internal Server Error');
      }
      res.status(201).json({ message: ' Lab technican added successfully' });
    });
  };

  module.exports = { addLab };
