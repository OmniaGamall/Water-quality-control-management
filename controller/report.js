const { Module } = require('module');
const path = require('path');
const { getAllExperiments } = require('./experiment');
const connection = require(path.join(path.resolve(), 'config/db.js'));

let addReport = async (req, res) => {
    const { Title, Author, Flow, Temp, TotalDuration, Date_, Day_ } = req.body;

    connection.execute(`INSERT INTO report (Title, Author, Flow, Temp, TotalDuration, Date_, Day_) VALUES (?, ?, ?, ?, ?, ?, ?)`, [Title, Author, Flow, Temp, TotalDuration, Date_, Day_ ], (err, result) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ message: 'Failed', err });
        }

        console.log(result.insertId);

        res.status(200).json({ message: "Success", insertId: result.insertId });
    });
}

const expController = require(path.join(path.resolve(), "controller/experiment.js"))
//** always id == 1 meaning we have one report edit in it every day (we will edit this feature soon)
const getReportByID = (req, res) => { 
    const { id } = req.params;
    if (!id) {
      return res.status(400).json({ error: 'ID is required' });
    }
    const query = `
      SELECT 
        e.Fname as Chemist_Fname,
        e.Lname as Chemist_Lname,
        r.Efficiency,
        r.Flow,
        r.RCI2 as R_Cl2,
        r.TotalDuration,
        r.Date_,
        r.Day_,
        r.Temp
      FROM 
        report r
      LEFT JOIN 
        chemist c ON r.ChID = c.ChID
      LEFT JOIN 
        employee e ON c.ChID = e.EmpID
      WHERE 
        r.RepID = ?`;
        
    connection.query(query, [id], (err, reportResult) => {
      if (err) {
        console.error('Error fetching report:', err);
        return res.status(500).send('Internal Server Error');
      }
      if (reportResult.length === 0) {
        return res.status(404).json({ error: 'Report not found' });
      }
      const date = reportResult[0].Date_;
      req.body.date = date;
      getExperimentsForToday(req, res, reportResult[0]);
    });
};

const getExperimentsForToday = (req, res, reportData) => {
    expController.getExperimentsForToday(req, res, reportData);
};

let getAllReports = async(req, res) =>{
    connection.execute(`select *  from report`, (err, data) =>{
        if(data)
            res.json(200, {message : "Success", data})
        else
        res.json(500, {message : "Failed", err})
    })
}
let deleteReportByID = async (req, res) => {
    const reportID = req.params.RepID;

    connection.execute(`DELETE FROM report WHERE RepID = ?`, [reportID], (err, result) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ message: 'Failed to delete Report', error: err });
        }

        if (result.affectedRows > 0) {
            res.status(200).json({ message: 'Report deleted successfully' });
        } else {
            res.status(404).json({ message: 'Report not found' });
        }
    });
};
  

let addNote = (req, res) => {
    const { content } = req.body;
    const { repID, EmpID } = req.params;

    if (!content || !repID || !EmpID) {
        return res.status(400).json({ message: 'content, repID, and EmpID are required fields' });
    }

    const notificationQuery = 'INSERT INTO notification (MessageContent, Sender) VALUES (?, ?)';
    connection.execute(notificationQuery, [content, EmpID], (err, notificationResult) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ message: 'Failed to add notification', error: err });
        }

        const notificationID = notificationResult.insertId;

        const addNoteQuery = 'INSERT INTO addNote (NotifiID, RepID) VALUES (?, ?)';
        connection.execute(addNoteQuery, [notificationID, repID], (err, addNoteResult) => {
            if (err) {
                console.error('Database error:', err);
                return res.status(500).json({ message: 'Failed to add note', error: err });
            }

            res.status(200).json({ message: 'Note added successfully' });
        });
    });
};


module.exports = {
    addReport,
    getReportByID,
    getAllReports,
    deleteReportByID,
    getExperimentsForToday,
    updateReport,
    addNote
}