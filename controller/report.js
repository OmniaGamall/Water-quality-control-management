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
        
    connection.query(query, [id], (err, result) => {
      if (err) {
        console.error('Error fetching report:', err);
        return res.status(500).send('Internal Server Error');
      }
      if (result.length === 0) {
        return res.status(404).json({ error: 'Report not found' });
      }
      res.status(200).json(result[0]);
    });
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

module.exports = {
    addReport,
    getReportByID,
    getAllReports,
    deleteReportByID,
    updateReport
}