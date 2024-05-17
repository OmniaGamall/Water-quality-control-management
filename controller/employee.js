const path = require('path');
const connection = require(path.join(path.resolve(), 'config/db.js'));

const getEmployees = (req, res) => {
  connection.query('SELECT * FROM employee', (err, results) => {
    if (err) {
      console.error('Error fetching employees:', err);
      return res.status(500).send('Internal Server Error');
    }
    res.status(200).json(results);
  });
};

const getEmp = (req, res) => {
  const { id } = req.params
  if (!id) {
    return res.status(400).json({ error: 'ID is required' });
  }
  connection.query('SELECT (Fname, Lname, phoneNum, email, HireDate) FROM employee WHERE EmpID = ?', [id], (err, result) => {
    if (err) {
      console.error('Error fetching employee:', err);
      return res.status(500).send('Internal Server Error');
    }
    if (result.length === 0) {
      return res.status(404).json({ error: 'Employee not found' });
    }

    res.status(200).json(result[0]);
  });
};

/*------------------------------------------------------------------------------------------------------------------------*/

let chemistController = require(path.join(path.resolve(), "controller/chemist.js"))
let engController = require(path.join(path.resolve(), "controller/engineer.js"))
let itController = require(path.join(path.resolve(), "controller/it.js"))
let labController = require(path.join(path.resolve(), "controller/lab.js"))
let operatingController = require(path.join(path.resolve(), "controller/operating.js"))

const addEmp = (req, res, next) => {
  const { Fname } = req.body
  const { Lname } = req.body
  const { phoneNum } = req.body
  const { email } = req.body
  const { HireDate } = req.body
  const { RoleID } = req.body
  
  if (!Fname || !Lname || !phoneNum || !email || !HireDate || !RoleID) {
    return res.status(400).json({ error: 'Missing required fields' });
  }
  connection.query('INSERT INTO employee (Fname, Lname, phoneNum, email, HireDate, RoleID) VALUES (?, ?, ?, ?, ?, ?)', [Fname, Lname, phoneNum, email, HireDate, RoleID], (err, result) => {
    if (err) {
      console.error('Error adding employee:', err);
      return res.status(500).send('Internal Server Error');
    }

    req.body.employeeId = result.insertId;

    switch (RoleID) {
    case 4: // Chemist role
      const { Qualification } = req.body
      req.body.Qualification = Qualification;
      return addChemist(req, res);
    case 5: // Engineer role
      const { specialization } = req.body
      req.body.specialization = specialization;
      return addEngineer(req, res);
    case 6: 
      const { skills } = req.body
      req.body.skills = skills;
      return addIT(req, res);
    case 3: 
      const { Equipment_Knowledge } = req.body
      req.body.Equipment_Knowledge = Equipment_Knowledge;
      return addLab(req, res);
    case 2: 
      const { Certification } = req.body
      req.body.Certification = Certification;
      return addOperating(req, res);
    default:
      return res.status(400).json({ error: 'Unsupported role' });
  }
   //res.status(201).json({ message: 'Employee added successfully' });
  });
};

const addChemist = (req, res) => {
  chemistController.addChemist(req, res);
};
const addEngineer = (req, res) => {
  engController.addEngineer(req, res);
};
const addIT = (req, res) => {
  itController.addIT(req, res);
};
const addLab = (req, res) => {
  labController.addLab(req, res);
};
const addOperating = (req, res) => {
  operatingController.addOperating(req, res);
};

/// ************************************************************************************************************************ //

const deleteEmp = (req, res) => {
  const { id } = req.params
  if (!id) {
    return res.status(400).json({ error: 'Employee ID is required' });
  }
  connection.query('DELETE FROM employee WHERE EmpID = ?', [id], (err, result) => {
    if (err) {
      console.error('Error deleting employee:', err);
      return res.status(500).send('Internal Server Error');
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Employee not found' });
    }
    res.status(200).json({ message: 'Employee deleted successfully' });
  });
};

const updateEmp = (req, res) => {
  const { id } = req.params
  const { phoneNum } = req.body
  if (!phoneNum) {
    return res.status(400).json({ error: 'New phone number are required' });
  }
  connection.query('UPDATE employee SET phoneNum = ? WHERE EmpID = ?', [phoneNum, id], (err, results) => {
    if (err) {
      console.error('Error updating employee:', err);
      return res.status(500).send('Internal Server Error');
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'Employee not found' });
    }

    res.status(200).json({ message: 'Employee updated successfully' });
  });
};

module.exports = { 
  getEmployees, 
  getEmp, 
  addEmp, 
  deleteEmp,
  updateEmp, 
  addChemist,  
  addIT, 
  addEngineer,
  addLab,
  addOperating};

