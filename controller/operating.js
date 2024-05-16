const path = require('path');
const connection = require(path.join(path.resolve(), 'config/db.js'));
 
const addOperating = (req, res) => {
    const { Certification } = req.body
    const { employeeId } = req.body
    if (!Certification) {
      return res.status(400).json({ error: 'Certification is required' });
    }
    connection.query('INSERT INTO operating_technican (Certification, OTechID) VALUES (?, ?)', [Certification, employeeId], (err) => {
      if (err) {
        console.error('Error adding operating technican:', err);
        return res.status(500).send('Internal Server Error');
      }
      res.status(201).json({ message: 'Operating technican added successfully' });
    });
  };

  module.exports = { addOperating };
