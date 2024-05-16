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

const addEmp = (req, res) => {
  const { Fname } = req.body
  const { Lname } = req.body
  const { phoneNum } = req.body
  const { email } = req.body
  const { HireDate } = req.body
  const { RoleID } = req.body
  if (!username || !emp_password || !EmpID) {
    return res.status(400).json({ error: 'Username, password, and EmpID are required' });
  }
  connection.query('INSERT INTO employee (Fname, Lname, phoneNum, email, HireDate, RoleID) VALUES (?, ?, ?)', [Fname, Lname, phoneNum, email, HireDate, RoleID], (err) => {
    if (err) {
      console.error('Error adding employee:', err);
      return res.status(500).send('Internal Server Error');
    }
    res.status(201).json({ message: 'Employee added successfully' });
  });
};

const deleteEmp = (req, res) => {
  const { id } = req.params
  if (!id) {
    return res.status(400).json({ error: 'Employee ID is required' });
  }
  connection.query('DELETE FROM employee WHERE EmpID = ?', [id], (err) => {
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
module.exports = { getEmployees, getEmp, addEmp, deleteEmp, updateEmp };

