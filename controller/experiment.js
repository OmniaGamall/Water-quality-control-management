const path = require('path');
const connection = require(path.join(path.resolve(), 'config/db.js'));


let addExperiment = async (req, res) => {
    const { name } = req.body;

    connection.execute(`INSERT INTO experiment (name) VALUES (?)`, [name], (err, result) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ message: 'Failed', err });
        }

        console.log(result.insertId);

        res.status(200).json({ message: "Success", insertId: result.insertId });
    });
}


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