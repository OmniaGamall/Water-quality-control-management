const path = require('path');
const connection = require(path.join(path.resolve(), 'config/db.js'));

const getUsers = (req, res) => {
  connection.query('SELECT * FROM login_form', (err, result) => {
    if (err) {
      console.error('Error fetching users:', err);
      return res.status(500).send('Internal Server Error');
    }
    res.status(200).json(result);
  });
};

const getUser = (req, res) => {
  const { username } = req.params
  if (!username) {
    return res.status(400).json({ error: 'Username is required' });
  }
  connection.query('SELECT username, EmpID FROM login_form WHERE username = ?', [username], (err, result) => {
    if (err) {
      console.error('Error fetching user:', err);
      return res.status(500).send('Internal Server Error');
    }
    if (result.length === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json(result[0]);
  });
};

const addUser = (req, res) => {
  const { username } = req.body
  const { emp_password } = req.body
  const { EmpID } = req.body
  if (!username || !emp_password || !EmpID) {
    return res.status(400).json({ error: 'Username, password, and EmpID are required' });
  }
  connection.query('INSERT INTO login_form (username, emp_password, EmpID) VALUES (?, ?, ?)', [username, emp_password, EmpID], (err) => {
    if (err) {
      console.error('Error adding user:', err);
      return res.status(500).send('Internal Server Error');
    }
    res.status(201).json({ message: 'User added successfully' });
  });
};

const deleteUser = (req, res) => {
  const { username } = req.params
  if (!username) {
    return res.status(400).json({ error: 'Username is required' });
  }
  connection.query('DELETE FROM login_form WHERE username = ?', [username], (err) => {
    if (err) {
      console.error('Error deleting user:', err);
      return res.status(500).send('Internal Server Error');
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'User not found' });
    }
    res.status(200).json({ message: 'User deleted successfully' });
  });
};

const updateUser = (req, res) => {
  const { username } = req.params
  const { newUsername } = req.body
  if (!newUsername) {
    return res.status(400).json({ error: 'New username are required' });
  }
  connection.query('UPDATE login_form SET username = ? WHERE username = ?', [newUsername, username], (err, results) => {
    if (err) {
      console.error('Error updating user:', err);
      return res.status(500).send('Internal Server Error');
    }
    if (result.affectedRows === 0) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.status(200).json({ message: 'User updated successfully' });
  });
};
module.exports = { getUsers, getUser, addUser, deleteUser, updateUser };

