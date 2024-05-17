const path = require('path');
const connection = require(path.join(path.resolve(), 'config/db.js'));
 
const addOperating = (req, res) => {
    const { Certification } = req.body
    const { employeeId } = req.body
    if (!Certification) {
      return res.status(400).json({ error: 'Certification is required' });
    }
    connection.query('INSERT INTO operating_technician (Certification, OTechID) VALUES (?, ?)', [Certification, employeeId], (err) => {
      if (err) {
        console.error('Error adding operating technician:', err);
        return res.status(500).send('Internal Server Error');
      }
      res.status(201).json({ message: 'Operating technician added successfully' });
    });
};
let getAllOperatingTechs = async (req, res) => {
  connection.execute(
    ` SELECT e.EmpID, e.Fname, e.Lname, e.phoneNum, e.email, e.HireDate, e.RoleID, Oper.OTechID, Oper.Certification 
      FROM employee e
      INNER JOIN operating_technician Oper ON e.EmpID = Oper.OTechID `, (err, data) => {
      if (err) {
          console.error('Database error:', err);
          return res.status(500).json({ message: 'Failed', err });
      }

      res.status(200).json({ message: 'Success', data });
  });
}
module.exports = { 
  addOperating,
  getAllOperatingTechs 
};
