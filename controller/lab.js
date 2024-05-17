const path = require('path');
const connection = require(path.join(path.resolve(), 'config/db.js'));
 
const addLab = (req, res) => {
    const { Equipment_Knowledge } = req.body
    const { employeeId } = req.body
    if (!Equipment_Knowledge) {
      return res.status(400).json({ error: 'Equipment knowledge is required' });
    }
    connection.query('INSERT INTO lab_technician (Equipment_Knowledge, LTechID) VALUES (?, ?)', [Equipment_Knowledge, employeeId], (err) => {
      if (err) {
        console.error('Error adding lab technician:', err);
        return res.status(500).send('Internal Server Error');
      }
<<<<<<< HEAD
      res.status(201).json({ message: ' Lab technician added successfully' });
=======
      res.status(201).json({ message: 'lab technician added successfully' });
>>>>>>> 2f65ff7a5fb439310ea3342c8bd3d91756d5b238
    });
};

let getAllLabTechs = async (req, res) => {
  connection.execute(
    ` SELECT e.EmpID, e.Fname, e.Lname, e.phoneNum, e.email, e.HireDate, e.RoleID, Lab.LTechID, Lab.Equipment_Knowledge 
      FROM employee e
      INNER JOIN lab_technician Lab ON e.EmpID = Lab.LTechID `, (err, data) => {
      if (err) {
          console.error('Database error:', err);
          return res.status(500).json({ message: 'Failed', err });
      }

      res.status(200).json({ message: 'Success', data });
  });
}
module.exports = { 
  addLab,
  getAllLabTechs
};
