const path = require('path');
const connection = require(path.join(path.resolve(), 'config/db.js'));

const makeExperiment = (req, res) => {
    const { Inf, Eff, Blank } = req.body;
    const TestID = res.params;
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
    addExperiment,
    getAllExperiments,
    deleteExperimentByID
}