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

let getAllITS = async (req, res) => {
  connection.execute(
    ` SELECT e.EmpID, e.Fname, e.Lname, e.phoneNum, e.email, e.HireDate, e.RoleID, IT.ITID, IT.skills
      FROM employee e
      INNER JOIN it IT ON e.EmpID = IT.ITID `, (err, data) => {
      if (err) {
          console.error('Database error:', err);
          return res.status(500).json({ message: 'Failed', err });
      }

      res.status(200).json({ message: 'Success', data });
  });
}

let getITByID = async (req, res) => {
  const { ITID } = req.params;
  connection.execute(
     `SELECT e.EmpID, e.Fname, e.Lname, e.phoneNum, e.email, e.HireDate, e.RoleID, it.ITID, it.skills
      FROM employee e
      INNER JOIN it ON e.EmpID = it.ITID
      WHERE it.ITID = ?`, [ITID], (err, data) => {
      if (err) {
          console.error('Database error:', err);
          return res.status(500).json({ message: 'Error fetching IT professional', error: err });
      }
      if (data && data.length > 0) {
          res.status(200).json({ message: "Success", data: data[0] });
      } else {
          res.status(404).json({ message: "IT professional not found" });
      }
  });
}
module.exports = { 
    addIT,
    getAllITS,
    getITByID
  };