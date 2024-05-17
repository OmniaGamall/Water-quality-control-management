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
let getAllEngineers = async (req, res) => {
    connection.execute(
      ` SELECT e.EmpID, e.Fname, e.Lname, e.phoneNum, e.email, e.HireDate, e.RoleID, Eng.EngID, Eng.specialization
        FROM employee e
        INNER JOIN engineer Eng ON e.EmpID = Eng.EngID `, (err, data) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ message: 'Failed', err });
        }

        res.status(200).json({ message: 'Success', data });
    });
}

let getEngineerByID = async (req, res) => {
  const { EngID } = req.params;
  connection.execute(
     `SELECT e.EmpID, e.Fname, e.Lname, e.phoneNum, e.email, e.HireDate, e.RoleID, eng.EngID, eng.specialization
      FROM employee e
      INNER JOIN engineer eng ON e.EmpID = eng.EngID
      WHERE eng.EngID = ?`, [EngID], (err, data) => {
      if (err) {
          console.error('Database error:', err);
          return res.status(500).json({ message: 'Error fetching engineer', error: err });
      }
      if (data && data.length > 0) {
          res.status(200).json({ message: "Success", data: data[0] });
      } else {
          res.status(404).json({ message: "Engineer not found" });
      }
  });
}
module.exports = {
   addEngineer,
   getAllEngineers,
   getEngineerByID
  };