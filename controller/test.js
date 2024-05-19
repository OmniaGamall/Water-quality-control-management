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




  const addTest = (req, res) => { /// -> edit to addEquipment
    const { TestName } = req.body
    const { Instructions } = req.body
    const { Duration } = req.body
    const { Temp } = req.body
    if (!TestName || !Instructions || !Duration || !Temp) {
      return res.status(400).json({ error: 'Missing Required Fields' });
    }
    connection.query('INSERT INTO test(Temp, TestName, Instructions, Duration)  VALUES (?, ?, ?, ?)', [Temp, TestName, Instructions, Duration], (err, result) => {
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
