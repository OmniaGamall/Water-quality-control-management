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

///// ------------------------------------------------------------------------ /////
let getAllExperiments = async(req, res) =>{
    connection.execute(`select *  from experiment`, (err, data) =>{
        if(data)
            res.json(200, {message : "Success", data})
        else
        res.json(500, {message : "Failed", err})
    })
}

const getExperimentsForToday = (req, res, reportData) => {
    const date = req.body.date;

    if (!date) {
        return res.status(400).json({ error: 'Date is required' });
    }

    fetchExperimentData(date, res, reportData);
};

const fetchExperimentData = (date, res, reportData) => {
    const query = `
        SELECT 
            e.Inf,
            e.Eff,
            t.TestName AS 'Test Name',
            t.Duration AS 'Test Duration',
            t.Temp AS 'Test Temp'
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

        ExperimentResults(experimentResults, res, reportData);
    });
};

const ExperimentResults = (experimentResults, res, reportData) => {
    const numberOfExperiments = experimentResults.length;
    let totalEfficiency = 0;
    let totalDuration = 0;
    let maxTemp = -Infinity;

    experimentResults.forEach(exp => {
        totalEfficiency += (exp.Inf / exp.Eff) * 100;
        totalDuration += exp['Test Duration'];
        if (exp['Test Temp'] > maxTemp) {
            maxTemp = exp['Test Temp'];
        }
    });

    const efficiency = totalEfficiency / numberOfExperiments;

    updateReportTable(efficiency, totalDuration, maxTemp, res, reportData, experimentResults);
};

const updateReportTable = (efficiency, totalDuration, maxTemp, res, reportData, experimentResults) => {
    const updateQuery = `
        UPDATE report
        SET Efficiency = ?, TotalDuration = ?, Temp = ?
        WHERE RepID = 1;
    `;
    connection.query(updateQuery, [efficiency, totalDuration, maxTemp], (updateErr) => {
        if (updateErr) {
            console.error('Error updating report:', updateErr);
            return res.status(500).send('Internal Server Error');
        }

        updateReportData(efficiency, totalDuration, maxTemp, reportData, experimentResults, res);
    });
};

const updateReportData = (efficiency, totalDuration, maxTemp, reportData, experimentResults, res) => {
    reportData.Efficiency = efficiency;
    reportData.TotalDuration = totalDuration;
    reportData.Temp = maxTemp;

    const responseData = {
        report: reportData,
        experiments: experimentResults
    };

    res.status(200).json(responseData);
};
///// ------------------------------------------------------------------------ /////


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