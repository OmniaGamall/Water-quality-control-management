const { Module } = require('module');
const path = require('path');
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
let getReportByID = async(req, res) =>{
    const reportID = req.params.RepID;
    connection.execute(`select * from report where RepID = ?`, [reportID], (err, data) =>{
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ message: 'Error fetching report', error: err });
        }
        if (data && data.length > 0) {
            res.status(200).json({ message : "Success", data: data[0] });
        } else {
            res.status(404).json({ message : "Report not found" });
        }
    });
}

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
let updateReport = async (req, res) => {
    const { RepID, ...updateFields } = req.body;

    if (!RepID) {
        return res.status(400).json({ message: 'ID is required for updating the report' });
    }

    const allowedFields = ['Title', 'Author', 'Flow', 'Temp', 'TotalDuration', 'Date_', 'Day_'];
    const fields = Object.keys(updateFields).filter(field => allowedFields.includes(field));
    const values = fields.map(field => updateFields[field]);

    if (fields.length === 0) {
        return res.status(400).json({ message: 'No valid fields to update' });
    }

    const setClause = fields.map(field => `${field} = ?`).join(', ');

    const query = `UPDATE report SET ${setClause} WHERE RepID = ?`;
    values.push(RepID); 

    connection.execute(query, values, (err, result) => {
        if (err) {
            console.error('Database error:', err);
            return res.status(500).json({ message: 'Failed to update report', err });
        }

        res.status(200).json({ message: 'Success', affectedRows: result.affectedRows });
    });
}

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
    updateReport,
    addNote
}