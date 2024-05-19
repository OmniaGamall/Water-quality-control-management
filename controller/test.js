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


let getTestByID = (req, res) => {
    const testID = req.params.testID;

    const query = `
        SELECT t.TestName, t.Instructions, t.Duration, t.Temp, te.EquID, e.Name_ AS EquipmentName
        FROM test t
        JOIN test_have_equipment te ON t.TestID = te.TestID
        JOIN equipment e ON te.EquID = e.EquID
        WHERE t.TestID = ?;
    `;

    connection.execute(query, [testID], (err, results) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ message: 'Failed to fetch test details', error: err });
        }

        if (results.length === 0) {
            return res.status(404).json({ message: 'Test not found' });
        }

        const testDetails = {
            TestName: results[0].TestName,
            Instructions: results[0].Instructions,
            Duration: results[0].Duration,
            Temp: results[0].Temp,
            Equipments: results.map(row => row.EquipmentName)
        };

        res.status(200).json(testDetails);
    });
};
  module.exports = { 
    getTests,
    addTest, 
    deleteTest, 
    updateTest,
    getTestByID
  };
