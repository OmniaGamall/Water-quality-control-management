const path = require('path');
const connection = require(path.join(path.resolve(), 'config/db.js'));

const getTests = (req, res) => {
    connection.query('SELECT * FROM test', (err, result) => {
      if (err) {
        console.error('Error fetching test:', err);
        return res.status(500).send('Internal Server Error');
      }
      res.status(200).json(result);
    });
  };

  const getTest = (req, res) => {
    const { id } = req.params
    if (!id) {
      return res.status(400).json({ error: 'ID is required' });
    }
    connection.query('SELECT * FROM test WHERE TestID = ?', [id], (err, result) => {
      if (err) {
        console.error('Error fetching test:', err);
        return res.status(500).send('Internal Server Error');
      }
      if (result.length === 0) {
        return res.status(404).json({ error: 'Test not found' });
      }
  
      res.status(200).json(result[0]);
    });
  };

  const addTest = (req, res) => {
    const { TestName } = req.body
    const { Description } = req.body
    const { ApplicableParameters } = req.body
    const { Cost } = req.body
    if (!TestName || !Description || !ApplicableParameters || !Cost) {
      return res.status(400).json({ error: 'TestName, Description, ApplicableParameters and Cost are required' });
    }
    connection.query('INSERT INTO test(Cost, TestName, Description_, ApplicableParameters)  VALUES (?, ?, ?, ?)', [Cost, TestName, Description, ApplicableParameters], (err, result) => {
      if (err) {
        console.error('Error adding test:', err);
        return res.status(500).send('Internal Server Error');
      }
      console.log(result.insertId);
      res.status(201).json({ message: 'Test added successfully' });
    });
  };

  const deleteTest = (req, res) => {
    const { id } = req.params
    if (!id) {
      return res.status(400).json({ error: 'ID is required' });
    }
    connection.query('DELETE FROM test WHERE TestID = ?', [id], (err) => {
      if (err) {
        console.error('Error deleting test:', err);
        return res.status(500).send('Internal Server Error');
      }
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: 'Test not found' });
      }
      res.status(200).json({ message: 'Test deleted successfully' });
    });
  };
  
  const updateTest = (req, res) => {
    const { id } = req.params
    const { Cost } = req.body
    if (!Cost) {
      return res.status(400).json({ error: 'Cost are required' });
    }
    connection.query('UPDATE test SET Cost = ? WHERE username = ?', [Cost, id], (err, results) => {
      if (err) {
        console.error('Error updating test:', err);
        return res.status(500).send('Internal Server Error');
      }
      if (result.affectedRows === 0) {
        return res.status(404).json({ error: 'Test not found' });
      }
  
      res.status(200).json({ message: 'Test updated successfully' });
    });
  };

  module.exports = { getTests, getTest, addTest, deleteTest, updateTest };
