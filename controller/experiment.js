const path = require('path');
const connection = require(path.join(path.resolve(), 'config/db.js'));

const makeExperiment = (req, res) => {
    const { Inf, Eff, Blank } = req.body;
    const { TestID } = req.params;
    if (!Inf || !Eff || !Blank || !TestID) {
      return res.status(400).json({ error: 'Missing required fields' });
    }
    connection.query('INSERT INTO experiment  (Inf, Eff, Blank, TestID) VALUES (?, ?, ?, ?)', [Inf, Eff, Blank, TestID], (err) => {
      if (err) {
        console.error('Error adding experiment:', err);
        return res.status(500).send('Internal Server Error');
      }
      res.status(201).json({ message: 'New experiment added successfully' });
    });
};

let getAllExperiments = async(req, res) =>{
    connection.execute(`select *  from experiment`, (err, data) =>{
        if(data)
            res.json(200, {message : "Success", data})
        else
        res.json(500, {message : "Failed", err})
    })
}

const getExperimentsForToday = (req, res, reportData) => {
    const date = req.body.date
    if (!date) {
      return res.status(400).json({ error: 'Date is required' });
    }
    const query = `
        SELECT 
            e.Inf,
            e.Eff,
            e.Blank As 'Limit',
            t.TestName As 'Test Name',
            t.Duration As 'Test Duration'
        FROM 
            experiment e
        JOIN 
            test t ON e.TestID = t.TestID
        WHERE 
            e.date = ?;
    `;
    connection.query(query, [date], (err, experimentResults) => {
        if (err) {
            console.error('Error fetching experiment data:', err);
            return res.status(500).send('Internal Server Error');
        }
        if (experimentResults.length === 0) {
            return res.status(404).json({ error: 'Experiments not found' });
        }
        const responseData = {
            report: reportData,
            experiments: experimentResults
        };
        res.status(200).json(responseData);
    });
  };
let deleteExperimentByID = async (req, res) => {
    const ExpID = req.params.ExpID;

    connection.execute(`DELETE FROM experiment WHERE ExpID = ?`, [ExpID], (err, result) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ message: 'Failed to delete task', error: err });
        }

        if (result.affectedRows > 0) {
            res.status(200).json({ message: 'Task deleted successfully' });
        } else {
            res.status(404).json({ message: 'Task not found' });
        }
    });
};

module.exports = {
    makeExperiment,
    getAllExperiments,
    deleteExperimentByID,
    getExperimentsForToday
}