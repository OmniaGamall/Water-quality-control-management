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

///// ------------------ ------------------ ------------------ ------------------ /////
const addTest = (req, res) => {
  const { TestName, Instructions, Duration, Temp, Equipment } = req.body;
  if (!TestName || !Instructions || !Duration || !Temp || !Array.isArray(Equipment)) {
    return res.status(400).json({ error: 'Missing Required Fields or Equipment is not an array' });
  }

  // Step 1: Insert the new test record
  connection.query(
    'INSERT INTO test (TestName, Instructions, Duration, Temp) VALUES (?, ?, ?, ?)', 
    [TestName, Instructions, Duration, Temp], 
    (err, result) => {
      if (err) {
        console.error('Error adding test:', err);
        return res.status(500).send('Internal Server Error');
      }
      const testId = result.insertId;

      // Step 2: Check for existing equipment and insert new ones if necessary
      const equipmentNames = Equipment.map(e => e.Name_);
      const placeholders = equipmentNames.map(() => '?').join(',');
      connection.query(`SELECT EquID, Name_ FROM equipment WHERE Name_ IN (${placeholders})`, equipmentNames, (err, existingEquipment) => {
        if (err) {
          console.error('Error checking equipment:', err);
          return res.status(500).send('Internal Server Error');
        }

        const existingEquipmentMap = new Map(existingEquipment.map(eq => [eq.Name_, eq.EquID]));
        const newEquipment = Equipment.filter(e => !existingEquipmentMap.has(e.Name_));

        const insertNewEquipment = (callback) => {
          if (newEquipment.length > 0) {
            const newEquipmentValues = newEquipment.map(e => [e.Name_, e.Manufacture, e.Type_]);
            connection.query('INSERT INTO equipment (Name_, Manufacture, Type_) VALUES ?', [newEquipmentValues], (err, insertResult) => {
              if (err) {
                console.error('Error adding new equipment:', err);
                return res.status(500).send('Internal Server Error');
              }

              // Map new equipment names to their IDs
              newEquipment.forEach((e, index) => {
                existingEquipmentMap.set(e.Name_, insertResult.insertId + index);
              });
              callback();
            });
          } else {
            callback();
          }
        };

        insertNewEquipment(() => {
          // Step 3: Insert relationships into test_have_equipment table
          const testEquipmentValues = equipmentNames.map(name => [testId, existingEquipmentMap.get(name)]);
          connection.query('INSERT INTO test_have_equipment (TestID, EquID) VALUES ?', [testEquipmentValues], (err) => {
            if (err) {
              console.error('Error adding test-equipment relationships:', err);
              return res.status(500).send('Internal Server Error');
            }

            res.status(201).json({ message: 'Test and equipment added successfully' });
          });
        });
      });
    }
  );
};

///// ------------------ ------------------ ------------------ ------------------ /////


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
