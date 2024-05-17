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

let getAllChemists = async (req, res) => {
    connection.execute(
      ` SELECT e.EmpID, e.Fname, e.Lname, e.phoneNum, e.email, e.HireDate, e.RoleID, c.ChID, c.Qualification
        FROM employee e
        INNER JOIN chemist c ON e.EmpID = c.ChID `, (err, data) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ message: 'Failed', err });
        }

        res.status(200).json({ message: 'Success', data });
    });
}

let getChemistByID = async (req, res) => {
  const chimID = req.params.ChID;
  connection.execute(
    ` SELECT e.EmpID, e.Fname, e.Lname, e.phoneNum, e.email, e.HireDate, e.RoleID, c.ChID, c.Qualification
      FROM employee e
      INNER JOIN chemist c ON e.EmpID = c.ChID
      WHERE c.ChID = ? `, [chimID], (err, data) => {
      if (err) {
          console.error('Database error:', err);
          return res.status(500).json({ message: 'Error fetching chemist', error: err });
      }
      if (data && data.length > 0) {
          res.status(200).json({ message: "Success", data: data[0] });
      } else {
          res.status(404).json({ message: "Chemist not found" });
      }
  });
}


module.exports = { 
  addChemist,
  getAllChemists,
  getChemistByID
};
